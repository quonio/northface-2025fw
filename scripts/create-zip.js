import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 日付をYYYYMMDD形式で取得
function getDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

async function createDeliveryZip() {
  console.log('📦 納品用ZIPファイルを作成します...\n')

  try {
    // 1. deliveryディレクトリの存在確認
    try {
      await fs.access('delivery')
    } catch {
      console.error(
        '❌ deliveryディレクトリが存在しません。先に「pnpm prepare-delivery」を実行してください。'
      )
      process.exit(1)
    }

    // 2. deliveriesディレクトリの作成
    const deliveriesDir = 'deliveries'
    await fs.mkdir(deliveriesDir, { recursive: true })

    // 3. 日付付きファイル名を生成
    const dateString = getDateString()
    const zipFileName = `tnf-maternity-${dateString}.zip`
    const zipFilePath = path.join(deliveriesDir, zipFileName)

    // 4. 既存のZIPファイルがある場合は確認
    try {
      await fs.access(zipFilePath)
      console.log(`⚠️  ${zipFileName} は既に存在します。`)

      // タイムスタンプを追加してユニークにする
      const timestamp =
        new Date().getHours().toString().padStart(2, '0') +
        new Date().getMinutes().toString().padStart(2, '0')
      const uniqueZipFileName = `tnf-maternity-${dateString}-${timestamp}.zip`
      const uniqueZipFilePath = path.join(deliveriesDir, uniqueZipFileName)

      console.log(`📝 代わりに ${uniqueZipFileName} として保存します。`)
      return await createZip(uniqueZipFilePath)
    } catch {
      // ファイルが存在しない場合は通常どおり作成
      return await createZip(zipFilePath)
    }
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

async function createZip(zipFilePath) {
  console.log(`\n🔄 ZIPファイルを作成中...`)

  // deliveryディレクトリをZIPに圧縮
  // -r: 再帰的に圧縮, -q: 静かに実行
  const { stdout, stderr } = await execAsync(
    `cd delivery && zip -r ../${zipFilePath} ./*`
  )

  if (stderr) {
    console.error('エラー:', stderr)
    throw new Error(stderr)
  }

  // ファイルサイズを取得
  const stats = await fs.stat(zipFilePath)
  const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2)

  console.log(`\n✅ ZIPファイルが作成されました！`)
  console.log(`📂 ファイル: ${path.resolve(zipFilePath)}`)
  console.log(`📊 サイズ: ${fileSizeMB} MB`)

  // 既存のZIPファイル一覧を表示
  console.log('\n📋 納品ファイル一覧:')
  const files = await fs.readdir('deliveries')
  const zipFiles = files
    .filter((f) => f.endsWith('.zip'))
    .sort()
    .reverse() // 最新のものを上に

  for (const file of zipFiles) {
    const filePath = path.join('deliveries', file)
    const fileStats = await fs.stat(filePath)
    const size = (fileStats.size / 1024 / 1024).toFixed(2)
    console.log(`   - ${file} (${size} MB)`)
  }

  return zipFilePath
}

// 実行
createDeliveryZip()
