<div align="center">

# 總統即時開票全台地圖

![總統即時開票全台地圖](public/images/cover.png)

</div>

[Demo](https://timingjl.github.io/presidential-election-results-map-by-yuni/)

## 作品說明

這個網站是一個為台灣人提供歷史選舉和區域統計數據的資訊平台。透過直觀的圖表，使用者可以輕鬆檢視市、區、里的歷史數據分布，包括人口統計和總統歷史大選資訊。

## 系統說明

**版本**

本專案在 Node.js `v18.16.0` 環境下進行開發。

**專案運行**

您可以按照以下步驟運行專案：

```shell
npm install
npm run dev
```

或

```shell
yarn
yarn dev
```

這些命令將安裝所有必要的相依套件，並啟動開發伺服器，讓您能夠開始開發和預覽您的專案。

如果您需要更多詳細資訊，請參考專案的 `package.json`。

## 資料夾說明

```shell
├── public
│   └── images/       # 包含公共的圖像資源，這些圖像可以在網站上使用。
├── src               # 專案的主要原始碼資料夾，包含了應用程式的原始程式碼。
│   ├── assets/       # 包含應用程式的靜態資源，如圖像、字體等。
│   ├── components/   # 包含應用程式中的可重複使用元件。
│   ├── config/       # 包含應用程式的設定檔或設定。
│   ├── pages/        # 包含應用程式的頁面元件，用於建立不同的頁面。
│   ├── theme/        # 包含應用程式的樣式或主題相關的檔案。
│   ├── utils/        # 包含各種輔助工具或功能的實用工具函數。
│   ├── App.tsx       # 應用程式的主應用程式元件。
│   ├── main.tsx      # 應用程式的主入口檔案。
│   └── vite-env.d.ts # Vite的類型定義檔。
├── index.html        # 應用程式的主HTML文件，用於載入JavaScript檔案和渲染應用程式。
├── tsconfig.json     # TypeScript的設定文件，用於指定專案的編譯選項。
├── vite.config.ts    # Vite的設定文件，用於配置建置工具Vite的行為。
├── package.json      # 專案的npm套件設定文件，包含了專案依賴和腳本。
├── DESIGN.md         # 設計稿、設計規範等相關說明
└── README.md         # 包含項目的簡要描述和使用說明的自述文件。
```

## 使用技術

**前端框架與函式庫**

- React.js：前端開發框架，用於建立使用者介面和應用程式的元件。
- styled-components：用於建立和管理應用程式的樣式的 CSS-in-JS 函式庫。

**建置工具**

- Vite：用於加速前端開發和建置最佳化的建置工具。

**類型系統**

- Typescript：提供靜態型別檢查，提高程式碼品質和開發效率。

**動畫效果**

- AOS（Animation of Scroll）：用於實現頁面滾動時的動畫效果的函式庫。

**部署和託管**

- gh-pages：用於將應用程式部署到 GitHub Pages，以便在線上示範和分享專案。

## 相關連結

- [關卡資訊 | 第二關 - 總統即時開票全台地圖](https://chalk-freedom-ec6.notion.site/814fe6ddc85f47b2964aceec422ad4cb)
- [設計稿(Designed by yuni)](https://www.figma.com/file/Caoi6yMxwbeKMneS5tsCt6/開票地圖?type=design&node-id=66%3A3043&mode=design&t=5N4mw68gAfagODaM-1)
