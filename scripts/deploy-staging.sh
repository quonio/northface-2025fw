#!/bin/bash

# 色付きメッセージ用の関数
print_success() {
    echo -e "\033[0;32m✓ $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m✗ $1\033[0m"
}

print_info() {
    echo -e "\033[0;36m→ $1\033[0m"
}

# 環境変数チェック
if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    print_error "環境変数が設定されていません"
    echo "以下のコマンドで環境変数を設定してください:"
    echo ""
    echo "export BUCKET_NAME=<your-bucket-name>"
    echo "export DISTRIBUTION_ID=<your-distribution-id>"
    echo ""
    echo "Terraformの出力から値を確認できます:"
    echo "cd terraform && terraform output"
    exit 1
fi

print_info "デプロイを開始します..."
echo "バケット: $BUCKET_NAME"
echo "CloudFront Distribution: $DISTRIBUTION_ID"
echo ""

DELIVERY_ROOT="delivery/www.thenorthface.jp/special/maternity"
ASSET_SOURCE="${DELIVERY_ROOT}/asset"
ASSET_TARGET="s3://${BUCKET_NAME}/special/maternity/asset"
HTML_SOURCE="${DELIVERY_ROOT}/index.html"
HTML_TARGET="s3://${BUCKET_NAME}/special/maternity/index.html"

# ビルドと納品ファイル作成
print_info "ビルドと納品ファイルの作成..."
if pnpm build:delivery; then
    print_success "ビルドが完了しました"
else
    print_error "ビルドに失敗しました"
    exit 1
fi

# アセットファイルをS3にアップロード
if [ ! -d "$ASSET_SOURCE" ]; then
    print_error "アセットディレクトリが見つかりません: $ASSET_SOURCE"
    exit 1
fi

print_info "アセットファイルをアップロード中..."
if aws s3 sync "${ASSET_SOURCE}/" \
    "${ASSET_TARGET}/" \
    --delete \
    --cache-control "public, max-age=31536000"; then
    print_success "アセットファイルのアップロードが完了しました"
else
    print_error "アセットファイルのアップロードに失敗しました"
    exit 1
fi

# HTMLファイルをS3にアップロード
if [ ! -f "$HTML_SOURCE" ]; then
    print_error "HTMLファイルが見つかりません: $HTML_SOURCE"
    exit 1
fi

print_info "HTMLファイルをアップロード中..."
if aws s3 cp "$HTML_SOURCE" \
    "$HTML_TARGET" \
    --cache-control "public, max-age=3600" \
    --content-type "text/html"; then
    print_success "HTMLファイルのアップロードが完了しました"
else
    print_error "HTMLファイルのアップロードに失敗しました"
    exit 1
fi

# CloudFrontのキャッシュを無効化
print_info "CloudFrontキャッシュを無効化中..."
if INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id ${DISTRIBUTION_ID} \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text); then
    print_success "キャッシュ無効化を開始しました (ID: $INVALIDATION_ID)"
else
    print_error "キャッシュ無効化に失敗しました"
    exit 1
fi

echo ""
print_success "デプロイが完了しました！"
echo ""
echo "CloudFront URL で確認できます:"
echo "https://$(aws cloudfront get-distribution --id ${DISTRIBUTION_ID} --query 'Distribution.DomainName' --output text)"
