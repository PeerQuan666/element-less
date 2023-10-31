import { defineConfig } from 'vitepress'
import getSidebar from './slidebar'
const slidebar = await getSidebar(__dirname, '', ['README']);

export default defineConfig({
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

    }
  })