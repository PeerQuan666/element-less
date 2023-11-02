import { defineConfig } from 'vitepress'
import getSidebar from './slidebar'
import mdContainer from 'markdown-it-container'
import fs from 'fs'
import path from 'path'
import { highlight } from './utils/highlight'
const slidebar =  getSidebar(__dirname, '');

export default defineConfig({
    base: "/element-less/",
    themeConfig:{
        search:{provider: 'local'},
        siteTitle:'Element-Less',
        logo:'/logo.svg',
        socialLinks: [
            { icon: "github", link: "https://gitee.com/PeerQuan/element-less" }
            ],
        nav:[
            { text: "首页", link: "/" },
            { text: "使用指南", link: "/design/" },
            { text: "演示页", link: "/pages/" },
            { text: "组件", link: "/demo/" }
          ],
        sidebar:slidebar
    },
    markdown: {
      config:  (md) => {
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
    }}
  })