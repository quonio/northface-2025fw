# 納品要件ドキュメント

## 納品ファイル構造の変更

### 背景
ノースフェイスのドメイン変更に伴い、納品ファイルのディレクトリ構造が変更になりました。

### 新しい納品ファイル構造
```
www.thenorthface.jp/
└── special/
    └── maternity/
        ├── asset/
        │   ├── css/
        │   ├── img/
        │   └── js/
        └── index.html
```

### 重要な変更点
- すべてのファイルは `maternity` ディレクトリ内にまとめる
- アセットファイルは `asset` ディレクトリに格納
- CSS、画像、JavaScriptは各サブディレクトリに配置

### 納品期限
- **期限**: 月曜日午前中まで

## 解析タグの追加

### 1. headタグ内への追加
headタグの閉じタグの直前に以下を追記：
```php
<?php include $_SERVER['DOCUMENT_ROOT'] . '/assets/gtm/gtm.js'; ?>
</head>
```

### 2. bodyタグ内への追加
bodyタグの直後に以下を追記：
```php
<body>
  <?php include $_SERVER['DOCUMENT_ROOT'] . '/assets/gtm/gtm-noscript.html'; ?>
  <!-- 以下、既存のコンテンツ -->
```

## 対応チェックリスト
- [ ] 納品ファイルを新しいディレクトリ構造に変更
- [ ] index.htmlファイルをPHPファイルに変換（.php拡張子）
- [ ] headタグ内にGTMタグを追加
- [ ] bodyタグ直後にGTMノンスクリプトタグを追加
- [ ] すべてのアセットパスを新しい構造に合わせて更新
- [ ] 最終確認とテスト

## 注意事項
- ファイル拡張子を `.html` から `.php` に変更する必要がある可能性があります
- アセットへのパスは相対パスで記述することを推奨
- GTMタグの追加により、サーバー側でPHPが実行できる環境が必要です