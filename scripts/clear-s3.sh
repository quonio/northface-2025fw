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

print_warning() {
    echo -e "\033[0;33m⚠ $1\033[0m"
}

# 環境変数チェック
if [ -z "$BUCKET_NAME" ]; then
    print_error "環境変数が設定されていません"
    echo "以下のコマンドで環境変数を設定してください:"
    echo ""
    echo "export BUCKET_NAME=<your-bucket-name>"
    echo ""
    echo "Terraformの出力から値を確認できます:"
    echo "cd terraform && terraform output"
    exit 1
fi

print_warning "S3バケット内のファイルを削除します"
echo "バケット: $BUCKET_NAME"
echo ""

# 確認プロンプト
read -p "本当に削除しますか？ (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "キャンセルしました"
    exit 0
fi

print_info "S3バケット内のファイルを削除中..."

# /static/full/tnf/ 配下のファイルを削除
print_info "アセットファイルを削除中..."
if aws s3 rm s3://${BUCKET_NAME}/static/full/tnf/ --recursive; then
    print_success "アセットファイルの削除が完了しました"
else
    print_warning "アセットファイルの削除に失敗しました（ファイルが存在しない可能性があります）"
fi

# /special/maternity/ 配下のファイルを削除
print_info "HTMLファイルを削除中..."
if aws s3 rm s3://${BUCKET_NAME}/special/maternity/ --recursive; then
    print_success "HTMLファイルの削除が完了しました"
else
    print_warning "HTMLファイルの削除に失敗しました（ファイルが存在しない可能性があります）"
fi

# バケット内の残りファイル数を確認
REMAINING_FILES=$(aws s3 ls s3://${BUCKET_NAME}/ --recursive | wc -l)

if [ "$REMAINING_FILES" -eq "0" ]; then
    print_success "S3バケット内のすべてのファイルが削除されました"
else
    print_warning "S3バケット内に${REMAINING_FILES}個のファイルが残っています"
fi

# CloudFrontのキャッシュを無効化するか確認
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo ""
    read -p "CloudFrontのキャッシュも無効化しますか？ (y/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "CloudFrontキャッシュを無効化中..."
        if INVALIDATION_ID=$(aws cloudfront create-invalidation \
            --distribution-id ${DISTRIBUTION_ID} \
            --paths "/*" \
            --query 'Invalidation.Id' \
            --output text); then
            print_success "キャッシュ無効化を開始しました (ID: $INVALIDATION_ID)"
        else
            print_error "キャッシュ無効化に失敗しました"
        fi
    fi
fi

echo ""
print_success "削除処理が完了しました"