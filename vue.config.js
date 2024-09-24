const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Jump Record',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#FFFFFF',
      icons: [
        {
          src: 'img/icons/jump-icon.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/jump-icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
