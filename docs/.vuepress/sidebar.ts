import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "演示页",
      icon: "laptop-code",
      prefix: "pages/",
      link: "pages/",
      children: "structure",
    },
    {
      text: "组件",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    }
  ],
});
