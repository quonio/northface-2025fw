import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 設定
const config = {
  source: {
    html: 'dist/index.html',
    assets: 'dist/_astro',
  },
  delivery: {
    base: 'delivery',
    pc: {
      html: 'web/template/ja/full/page/tnf',
      assets: 'web/template/ja/full/page/static/full/tnf',
    },
    sp: {
      html: 'web/template/ja/lite/page/tnf',
    },
  },
  assetPathMapping: {
    from: '/_astro/',
    to: '/static/full/tnf/',
  },
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

// HTMLファイル内のパスを置換
async function replacePathsInHtml(htmlPath, outputPath) {
  try {
    let htmlContent = await fs.readFile(htmlPath, 'utf-8')

    // アセットパスの置換（/_astro/）
    htmlContent = htmlContent.replace(
      new RegExp(config.assetPathMapping.from, 'g'),
      config.assetPathMapping.to
    )

    // imagesディレクトリのパスも置換（/images/decorations/）
    htmlContent = htmlContent.replace(
      /\/images\/decorations\//g,
      '/static/full/tnf/images/decorations/'
    )

    await fs.writeFile(outputPath, htmlContent)
    console.log(`✓ HTMLパス置換完了: ${outputPath}`)
  } catch (error) {
    console.error(`HTML処理エラー: ${htmlPath}`, error)
    throw error
  }
}

// メイン処理
async function prepareDelivery() {
  console.log('🚀 納品用ファイルの準備を開始します...\n')

  try {
    // 1. distディレクトリの存在確認
    try {
      await fs.access('dist')
    } catch {
      console.error(
        '❌ distディレクトリが存在しません。先に「pnpm build」を実行してください。'
      )
      process.exit(1)
    }

    // 2. deliveryディレクトリをクリーンアップ
    try {
      await fs.rm('delivery', { recursive: true, force: true })
      console.log('🧹 既存のdeliveryディレクトリをクリーンアップしました')
    } catch (error) {
      // ディレクトリが存在しない場合は無視
    }

    // 3. PC版のディレクトリ構造を作成
    const pcHtmlDir = path.join(config.delivery.base, config.delivery.pc.html)
    const pcAssetsDir = path.join(
      config.delivery.base,
      config.delivery.pc.assets
    )
    await ensureDir(pcHtmlDir)
    await ensureDir(pcAssetsDir)

    // 4. SP版のディレクトリ構造を作成
    const spHtmlDir = path.join(config.delivery.base, config.delivery.sp.html)
    await ensureDir(spHtmlDir)

    console.log('\n📁 ディレクトリ構造を作成しました')

    // 5. アセットファイルをコピー
    console.log('\n📦 アセットファイルをコピー中...')
    await copyDirectory(config.source.assets, pcAssetsDir)

    // 6. HTMLファイルを処理してコピー（PC版）
    console.log('\n📄 HTMLファイルを処理中...')
    const pcHtmlPath = path.join(pcHtmlDir, 'index.html')
    await replacePathsInHtml(config.source.html, pcHtmlPath)

    // 7. HTMLファイルをSP版にもコピー
    const spHtmlPath = path.join(spHtmlDir, 'index.html')
    await copyFile(pcHtmlPath, spHtmlPath)

    // 8. imagesディレクトリがある場合はコピー
    try {
      await fs.access('dist/images')
      const imagesDestDir = path.join(pcAssetsDir, 'images')
      await copyDirectory('dist/images', imagesDestDir)
      console.log('\n🖼️  画像ファイルをコピーしました')
    } catch {
      // imagesディレクトリが存在しない場合は無視
    }

    // 9. public/imagesディレクトリがある場合もコピー（decorations SVGなど）
    try {
      await fs.access('public/images')
      const publicImagesDestDir = path.join(pcAssetsDir, 'images')
      await copyDirectory('public/images', publicImagesDestDir)
      console.log('🎨 デコレーション画像をコピーしました')
    } catch {
      // public/imagesディレクトリが存在しない場合は無視
    }

    console.log('\n✅ 納品用ファイルの準備が完了しました！')
    console.log(`\n📂 納品用ファイルは以下に作成されました:`)
    console.log(`   ${path.resolve('delivery')}/`)
    console.log('\n📋 ディレクトリ構造:')
    console.log('   delivery/')
    console.log('   └── web/')
    console.log('       └── template/')
    console.log('           └── ja/')
    console.log('               ├── full/')
    console.log('               │   └── page/')
    console.log('               │       ├── tnf/')
    console.log('               │       │   └── index.html')
    console.log('               │       └── static/')
    console.log('               │           └── full/')
    console.log('               │               └── tnf/')
    console.log('               │                   └── (アセットファイル)')
    console.log('               └── lite/')
    console.log('                   └── page/')
    console.log('                       └── tnf/')
    console.log('                           └── index.html')
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

// 実行
prepareDelivery()
