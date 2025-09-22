# TNF Maternity Staging環境

確認用のS3 + CloudFront環境を構築するTerraform設定です。

## セットアップ

### 1. AWS認証情報の設定

```bash
# AWS CLIの設定
aws configure
```

### 2. Terraformの初期化と実行

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 3. 環境変数の設定

Terraformの実行後、出力される値を環境変数に設定します：

```bash
# Terraform outputから値を確認
terraform output

# 環境変数を設定
export BUCKET_NAME=<出力されたバケット名>
export DISTRIBUTION_ID=<出力されたDistribution ID>
```

## デプロイ

```bash
# プロジェクトルートに戻る
cd ..

# デプロイ実行
pnpm deploy:staging
```

## URL構造

- **サイトURL**: `https://<CloudFront Domain>/`
- **HTMLパス**: `/special/maternity/index.html`
- **アセットパス**: `/static/full/tnf/*`

## 削除方法

```bash
cd terraform
terraform destroy
```