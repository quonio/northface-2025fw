import { promises as fs } from 'fs'
import path from 'path'

// 設定
const config = {
  source: {
    html: 'dist/index.html',
    astroAssets: 'dist/_astro',
    distImages: 'dist/images',
    publicImages: 'public/images',
  },
  delivery: {
    base: 'delivery',
    root: 'www.thenorthface.jp/special/maternity',
    publicPath: '/special/maternity',
    asset: {
      base: 'asset',
      css: 'css',
      js: 'js',
      img: 'img',
    },
  },
  pathPatterns: {
    astroPrefix: '/_astro/',
    imagePrefixes: ['/images/', './images/'],
  },
}

const extensionTypeMap = new Map([
  ['.css', 'css'],
  ['.js', 'js'],
  ['.mjs', 'js'],
  ['.cjs', 'js'],
  ['.ts', 'js'],
  ['.jsx', 'js'],
  ['.map', 'js'],
  ['.json', 'js'],
  ['.png', 'img'],
  ['.jpg', 'img'],
  ['.jpeg', 'img'],
  ['.gif', 'img'],
  ['.svg', 'img'],
  ['.webp', 'img'],
  ['.avif', 'img'],
  ['.ico', 'img'],
  ['.bmp', 'img'],
  ['.woff', 'img'],
  ['.woff2', 'img'],
  ['.ttf', 'img'],
  ['.otf', 'img'],
])

const warnedExtensions = new Set()

const posixJoin = (...segments) => path.posix.join(...segments)

const normalizeRelativePath = (filePath) =>
  filePath.split(path.sep).join('/').replace(/^\//, '')

const headGtmInclude =
  "<?php include $_SERVER['DOCUMENT_ROOT'] . '/assets/gtm/gtm.js'; ?>"

const bodyGtmInclude =
  "<?php include $_SERVER['DOCUMENT_ROOT'] . '/assets/gtm/gtm-noscript.html'; ?>"

function shouldSkipReplacement(content, offset) {
  const precedingSlice = content.slice(0, offset)
  const lastQuoteIndex = Math.max(
    precedingSlice.lastIndexOf('"'),
    precedingSlice.lastIndexOf("'")
  )
  const lastParenIndex = precedingSlice.lastIndexOf('(')
  const contextStart = Math.max(lastQuoteIndex, lastParenIndex)
  const lookbehindWindow = precedingSlice
    .slice(Math.max(0, contextStart))
    .toLowerCase()

  if (lookbehindWindow.includes('://')) {
    return true
  }

  if (lookbehindWindow.includes('data:')) {
    return true
  }

  return false
}

function rewriteContentPaths(content) {
  let rewritten = content

  const astroPattern = new RegExp(
    `${escapeRegExp(config.pathPatterns.astroPrefix)}([^"'\\s)]+)`,
    'g'
  )
  rewritten = rewritten.replace(
    astroPattern,
    (matched, assetPath, offset, original) => {
      if (shouldSkipReplacement(original, offset)) {
        return matched
      }

      return buildAssetReference(assetPath)
    }
  )

  for (const prefix of config.pathPatterns.imagePrefixes) {
    const imagePattern = new RegExp(
      `${escapeRegExp(prefix)}([^"'\\s)]+)`,
      'g'
    )

    rewritten = rewritten.replace(imagePattern, (matched, imagePath, offset, original) => {
      if (shouldSkipReplacement(original, offset)) {
        return matched
      }

      const normalizedImage = normalizeRelativePath(imagePath)
        .replace(/^\.\//, '')
        .replace(/^images\//, '')

      return buildAssetReference(normalizedImage, 'img')
    })
  }

  return rewritten
}

// ディレクトリを再帰的に作成
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    console.error(`ディレクトリ作成エラー: ${dirPath}`, error)
    throw error
  }
}

// ファイルをコピー
async function copyFile(src, dest) {
  try {
    await ensureDir(path.dirname(dest))
    await fs.copyFile(src, dest)
    console.log(`✓ ${src} → ${dest}`)
  } catch (error) {
    console.error(`ファイルコピーエラー: ${src} → ${dest}`, error)
    throw error
  }
}

// ディレクトリを再帰的にコピー
async function copyDirectory(src, dest) {
  try {
    await ensureDir(dest)
    const entries = await fs.readdir(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath)
      } else {
        await copyFile(srcPath, destPath)
      }
    }
  } catch (error) {
    console.error(`ディレクトリコピーエラー: ${src} → ${dest}`, error)
    throw error
  }
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getAssetType(relativePath) {
  const ext = path.extname(relativePath).toLowerCase()
  const type = extensionTypeMap.get(ext)

  if (!type && ext && !warnedExtensions.has(ext)) {
    console.warn(`⚠️ 未対応の拡張子を検出: ${ext} → asset/img に配置します`)
    warnedExtensions.add(ext)
  }

  return type ?? 'img'
}

function buildAssetReference(relativePath, forcedType) {
  const normalized = normalizeRelativePath(relativePath)
  const assetType = forcedType ?? getAssetType(normalized)
  const assetDir = config.delivery.asset[assetType]
  const basePath = assetDir
    ? posixJoin(config.delivery.asset.base, assetDir)
    : config.delivery.asset.base

  const publicRoot = config.delivery.publicPath.replace(/\/$/, '')
  return `${publicRoot}/${posixJoin(basePath, normalized)}`
}

async function distributeAstroAssets(srcDir, destRoots) {
  if (!(await pathExists(srcDir))) {
    console.warn(`⚠️ Astroアセットディレクトリが見つかりません: ${srcDir}`)
    return
  }

  const traverse = async (relativePath = '') => {
    const currentSrc = relativePath ? path.join(srcDir, relativePath) : srcDir
    const entries = await fs.readdir(currentSrc, { withFileTypes: true })

    for (const entry of entries) {
      const nextRelative = relativePath
        ? posixJoin(relativePath, entry.name)
        : entry.name

      if (entry.isDirectory()) {
        await traverse(nextRelative)
      } else {
        const normalizedRelative = normalizeRelativePath(nextRelative)
        const assetType = getAssetType(normalizedRelative)
        const targetRoot = destRoots[assetType] ?? destRoots.img
        const destPath = path.join(targetRoot, ...normalizedRelative.split('/'))
        const srcPath = path.join(currentSrc, entry.name)

        await copyFile(srcPath, destPath)
      }
    }
  }

  await traverse()
}

async function rewriteAssetFiles(assetDestinations) {
  const rewriteTargets = [
    assetDestinations.css,
    assetDestinations.js,
  ]

  const rewritableExtensions = new Set(['.css', '.js', '.mjs', '.cjs'])

  for (const targetDir of rewriteTargets) {
    await traverseAndRewrite(targetDir)
  }

  async function traverseAndRewrite(dirPath) {
    const exists = await pathExists(dirPath)
    if (!exists) return

    const entries = await fs.readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name)

      if (entry.isDirectory()) {
        await traverseAndRewrite(entryPath)
      } else {
        const ext = path.extname(entry.name).toLowerCase()
        if (!rewritableExtensions.has(ext)) continue

        const originalContent = await fs.readFile(entryPath, 'utf-8')
        const rewrittenContent = rewriteContentPaths(originalContent)

        if (originalContent !== rewrittenContent) {
          await fs.writeFile(entryPath, rewrittenContent)
          console.log(`🔁 パスを書き換えました: ${entryPath}`)
        }
      }
    }
  }
}

async function replacePathsInHtml(htmlPath, outputPath) {
  try {
    let htmlContent = await fs.readFile(htmlPath, 'utf-8')

    htmlContent = rewriteContentPaths(htmlContent)

    if (!htmlContent.includes(headGtmInclude)) {
      htmlContent = htmlContent.replace(
        '</head>',
        `${headGtmInclude}\n</head>`
      )
    }

    const bodyPattern = /<body([^>]*)>/i
    if (!htmlContent.includes(bodyGtmInclude) && bodyPattern.test(htmlContent)) {
      htmlContent = htmlContent.replace(
        bodyPattern,
        (match, attrs) => `<body${attrs}>\n  ${bodyGtmInclude}`
      )
    }

    await ensureDir(path.dirname(outputPath))
    await fs.writeFile(outputPath, htmlContent)
    console.log(`✓ HTMLパス置換完了: ${outputPath}`)
  } catch (error) {
    console.error(`HTML処理エラー: ${htmlPath}`, error)
    throw error
  }
}

async function prepareDelivery() {
  console.log('🚀 納品用ファイルの準備を開始します...\n')

  try {
    if (!(await pathExists('dist'))) {
      console.error(
        '❌ distディレクトリが存在しません。先に「pnpm build」を実行してください。'
      )
      process.exit(1)
    }

    await fs.rm(config.delivery.base, { recursive: true, force: true })
    console.log('🧹 既存のdeliveryディレクトリをクリーンアップしました')

    const deliveryRoot = path.join(config.delivery.base, config.delivery.root)
    const assetRoot = path.join(deliveryRoot, config.delivery.asset.base)
    const assetDestinations = {
      css: path.join(assetRoot, config.delivery.asset.css),
      js: path.join(assetRoot, config.delivery.asset.js),
      img: path.join(assetRoot, config.delivery.asset.img),
    }

    await ensureDir(assetDestinations.css)
    await ensureDir(assetDestinations.js)
    await ensureDir(assetDestinations.img)

    console.log('\n📁 ディレクトリ構造を作成しました')

    console.log('\n📦 Astroアセットをコピー中...')
    await distributeAstroAssets(config.source.astroAssets, assetDestinations)

    if (await pathExists(config.source.distImages)) {
      await copyDirectory(config.source.distImages, assetDestinations.img)
      console.log('🖼️ dist/images をコピーしました')
    }

    if (await pathExists(config.source.publicImages)) {
      await copyDirectory(config.source.publicImages, assetDestinations.img)
      console.log('🎨 public/images をコピーしました')
    }

    await rewriteAssetFiles(assetDestinations)

    console.log('\n📄 HTMLファイルを処理中...')
    const htmlOutputPath = path.join(deliveryRoot, 'index.html')
    await replacePathsInHtml(config.source.html, htmlOutputPath)

    console.log('\n✅ 納品用ファイルの準備が完了しました！')
    console.log('\n📂 納品用ファイルは以下に作成されました:')
    console.log(`   ${path.resolve(deliveryRoot)}`)
    console.log('\n📋 ディレクトリ構造:')
    console.log('   delivery/')
    console.log('   └── www.thenorthface.jp/')
    console.log('       └── special/')
    console.log('           └── maternity/')
    console.log('               ├── asset/')
    console.log('               │   ├── css/')
    console.log('               │   ├── img/')
    console.log('               │   └── js/')
    console.log('               └── index.html')
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

prepareDelivery()
