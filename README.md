# cfn-visualizer

AWS CloudFormation のデプロイ結果をビジュアライズするデスクトップアプリケーション

## ロードマップ

### 機能

- [ ] AWS CloudFormation のデプロイ結果を Fetch する
  - [x] aws_access_key_id を使って Fetch する(起動時)
  - [x] パースして依存関係をツリー状のデータ構造に変換 ... (A)
  - [ ] 定期的にポーリングする
- [ ] AWS CloudFormation のデプロイ結果をビジュアライズする
  - [x] WebCoca を使ったノードグラフの描画
  - [ ] (A) の結果をグラフに注入する
- [ ] 認証情報の設定
  - [x] 環境変数から読む(開発時)
  - [ ] ユーザが設定できるUIを作る
- [x] デスクトップアプリケーションとして動作する
  - [x] `npm run build` によるビルド

### 開発環境やメタデータ

OSS 化を見据えたロードマップです

- [ ] GtiHub Actions による PR のチェック
  - [ ] `npm run build` が通る
  - [ ] `sample/` 内の yaml を正しく解釈し表示する
- [ ] LICENSE の検討(現在は仮です)
- [ ] アイコン( `resource/` )の作成と設定
- [ ] `electron-builder.yml` にある確認(現在は仮です)
- [ ] lint の導入( npm script の登録とルールの検討)

## 開発

```zsh
# AWS上で認証情報を発行し，環境変数に設定
export aws_access_key_id=XXXXXXXXXXXXXXXXXX
export aws_secret_access_key=YYYYYYYYYYYYYYYYYYYYYYYYYY

# 依存パッケージのインストール
$ npm i

# 開発モード
$ npm run dev

# production のビルド
$ npm run build
```

## 開発に関する説明

### 挙動

- `renderer/` 内の `Next.js` アプリケーションが起動します ... (A)
- `background.js` が (A) を Electron によって開きます

### 開発に関する手順

1. AWS の認証情報を発行し，環境変数に設定します．
2. `sample/` 内の AWS CloudFormation Template をデプロイします．
3. 手元で `npm run dev` し，アプリケーションを立ち上げます．
4. 正しく動くことを確認し，開発に取り掛かります．
