import { defineUserConfig } from "vuepress";
import { highlight } from '../.vuepress/utils/highlight'
import theme from "./theme.js";
import fs from 'fs'
import path from 'path'
import { searchProPlugin } from "vuepress-plugin-search-pro";
import mdContainer from 'markdown-it-container'



export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Element-Less",
  description: "Element Less",
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
  ],
  theme,
  extendsMarkdown: (md) => {
    md.use(mdContainer, 'vuefile-demo', {
      validate(params) {
        return !!params.trim().match(/^vuefile-demo\s*(.*)$/)
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^vuefile-demo\s*(.*)$/)
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : ''
          const sourceFileToken = tokens[idx + 2]
          let source = ''
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          if (sourceFileToken.type === 'inline') {
            source = fs.readFileSync(
              path.resolve(__dirname, '..', 'examples', `${sourceFile}.vue`),
              'utf-8'
            )
          }
          if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
          return `<VpDemo  source="${encodeURIComponent(highlight(source, 'ts'))}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(description)}">`
        } else {
          return '</VpDemo>'
        }
      },
    })
  }
});
