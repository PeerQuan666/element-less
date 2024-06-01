// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/MyProjects/element-less/node_modules/vite/dist/node/index.js";
import path from "path";
import vue from "file:///D:/MyProjects/element-less/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\MyProjects\\element-less";
var __vite_injected_original_import_meta_url = "file:///D:/MyProjects/element-less/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue()],
  build: {
    commonjsOptions: {
      esmExternals: true
    },
    copyPublicDir: false,
    outDir: "element-less",
    //输出文件名称
    lib: {
      formats: ["iife", "es", "umd", "cjs"],
      entry: path.resolve(__vite_injected_original_dirname, "./packages/index.ts"),
      //指定组件编译入口文件
      name: "element-less",
      fileName: "element-less"
    },
    //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "@vueuse/core",
        "axios",
        "consola",
        "element-plus",
        "escape-html",
        "file-saver",
        "less",
        "lodash",
        "md-editor-v3",
        "nprogress",
        "path",
        "pinia",
        "prismjs",
        "sortablejs",
        "vue-fontawesome",
        "vue-router",
        "vue-ueditor-wrap",
        "vuedraggable",
        "vuex",
        "xlsx",
        "element-less",
        "vite-plugin-compression",
        "vue-json-viewer",
        "ace-builds"
      ],
      output: {
        name: "ElementLess",
        exports: "named",
        externalLiveBindings: false,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@vueuse/core": "VueUse",
          vuedraggable: "vuedraggable",
          sortablejs: "Sortable",
          "md-editor-v3": "MdEditorV3",
          pinia: "Pinia",
          axios: "axios",
          XLSX: "XLSX",
          lodash: "_",
          "ace-builds": "ace",
          "file-saver": "fileSave",
          "vue-json-viewer": "JsonView.default",
          "prismjs": "Prism"
        }
      }
    },
    // rollup打包配置
    minify: "terser",
    terserOptions: {
      // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
        If you wish to drop a specific function call such as console.info and/or
        retain side effects from function arguments after dropping the function
        call then use pure_funcs instead
         */
        drop_console: true,
        // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false
        // 删除注释comments
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeVByb2plY3RzXFxcXGVsZW1lbnQtbGVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTXlQcm9qZWN0c1xcXFxlbGVtZW50LWxlc3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L015UHJvamVjdHMvZWxlbWVudC1sZXNzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKV0sXHJcbiAgYnVpbGQ6IHtcclxuXHRcdGNvbW1vbmpzT3B0aW9uczp7XHJcblx0XHRcdGVzbUV4dGVybmFsczp0cnVlXHJcblx0XHR9LFxyXG5cdFx0Y29weVB1YmxpY0RpcjpmYWxzZSxcclxuXHRcdG91dERpcjogXCJlbGVtZW50LWxlc3NcIiwgLy9cdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcclxuXHRcdGxpYjoge1xyXG5cdFx0XHRmb3JtYXRzOlsnaWlmZScsJ2VzJywgJ3VtZCcsJ2NqcyddLFxyXG5cdFx0XHRlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3BhY2thZ2VzL2luZGV4LnRzXCIpLCAvL1x1NjMwN1x1NUI5QVx1N0VDNFx1NEVGNlx1N0YxNlx1OEJEMVx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlxyXG5cdFx0XHRuYW1lOiBcImVsZW1lbnQtbGVzc1wiLFxyXG5cdFx0XHRmaWxlTmFtZTogXCJlbGVtZW50LWxlc3NcIixcclxuXHRcdH0sIC8vXHU1RTkzXHU3RjE2XHU4QkQxXHU2QTIxXHU1RjBGXHU5MTREXHU3RjZFXHJcblx0XHRyb2xsdXBPcHRpb25zOiB7XHJcblx0XHRcdC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxyXG5cdFx0XHRleHRlcm5hbDogW1xyXG5cdFx0XHRcInZ1ZVwiLFxyXG5cdFx0XHQnQHZ1ZXVzZS9jb3JlJyxcclxuXHRcdFx0J2F4aW9zJyxcclxuXHRcdFx0J2NvbnNvbGEnLFxyXG5cdFx0XHQnZWxlbWVudC1wbHVzJyxcclxuXHRcdFx0J2VzY2FwZS1odG1sJyxcclxuXHRcdFx0J2ZpbGUtc2F2ZXInLFxyXG5cdFx0XHQnbGVzcycsXHJcblx0XHRcdCdsb2Rhc2gnLFxyXG5cdFx0XHQnbWQtZWRpdG9yLXYzJyxcclxuXHRcdFx0J25wcm9ncmVzcycsXHJcblx0XHRcdCdwYXRoJyxcclxuXHRcdFx0J3BpbmlhJyxcclxuXHRcdFx0J3ByaXNtanMnLFxyXG5cdFx0XHQnc29ydGFibGVqcycsXHJcblx0XHRcdCd2dWUtZm9udGF3ZXNvbWUnLFxyXG5cdFx0XHQndnVlLXJvdXRlcicsXHJcblx0XHRcdCd2dWUtdWVkaXRvci13cmFwJyxcclxuXHRcdFx0J3Z1ZWRyYWdnYWJsZScsXHJcblx0XHRcdCd2dWV4JyxcclxuXHRcdFx0J3hsc3gnLFxyXG5cdFx0XHQnZWxlbWVudC1sZXNzJyxcclxuXHRcdFx0J3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJyxcclxuXHRcdFx0J3Z1ZS1qc29uLXZpZXdlcicsXHJcblx0XHRcdCdhY2UtYnVpbGRzJ1xyXG5cdFx0XSxcclxuXHRcdFx0b3V0cHV0OiB7XHJcblx0XHRcdFx0bmFtZTogJ0VsZW1lbnRMZXNzJyxcclxuXHRcdFx0XHRleHBvcnRzOiAnbmFtZWQnLFxyXG5cdFx0XHRcdGV4dGVybmFsTGl2ZUJpbmRpbmdzOiBmYWxzZSxcclxuXHRcdFx0XHQvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG5cdFx0XHRcdGdsb2JhbHM6IHtcclxuXHRcdFx0XHRcdHZ1ZTogXCJWdWVcIixcclxuXHRcdFx0XHRcdCdlbGVtZW50LXBsdXMnOidFbGVtZW50UGx1cycsXHJcblx0XHRcdFx0XHQnQHZ1ZXVzZS9jb3JlJzonVnVlVXNlJyxcclxuXHRcdFx0XHRcdHZ1ZWRyYWdnYWJsZTondnVlZHJhZ2dhYmxlJyxcclxuXHRcdFx0XHRcdHNvcnRhYmxlanM6J1NvcnRhYmxlJyxcclxuXHRcdFx0XHRcdCdtZC1lZGl0b3ItdjMnOidNZEVkaXRvclYzJyxcclxuXHRcdFx0XHRcdHBpbmlhOidQaW5pYScsXHJcblx0XHRcdFx0XHRheGlvczonYXhpb3MnLFxyXG5cdFx0XHRcdFx0WExTWDonWExTWCcsXHJcblx0XHRcdFx0XHRsb2Rhc2g6J18nLFxyXG5cdFx0XHRcdFx0XCJhY2UtYnVpbGRzXCI6J2FjZScsXHJcblx0XHRcdFx0XHQnZmlsZS1zYXZlcic6J2ZpbGVTYXZlJyxcclxuXHRcdFx0XHRcdCd2dWUtanNvbi12aWV3ZXInOidKc29uVmlldy5kZWZhdWx0JyxcclxuXHRcdFx0XHRcdCdwcmlzbWpzJzonUHJpc20nXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sIFxyXG5cdFx0Ly8gcm9sbHVwXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXHJcblx0XHRtaW5pZnk6ICd0ZXJzZXInLFxyXG5cdFx0dGVyc2VyT3B0aW9uczogeyAvLyBcdTU3MjhcdTYyNTNcdTUzMDVcdTRFRTNcdTc4MDFcdTY1RjZcdTc5RkJcdTk2NjQgY29uc29sZVx1MzAwMWRlYnVnZ2VyIFx1NTQ4QyBcdTZDRThcdTkxQ0FcclxuXHRcdFx0Y29tcHJlc3M6IHtcclxuXHRcdFx0ICAvKiAoZGVmYXVsdDogZmFsc2UpIC0tIFBhc3MgdHJ1ZSB0byBkaXNjYXJkIGNhbGxzIHRvIGNvbnNvbGUuKiBmdW5jdGlvbnMuXHJcblx0XHRcdFx0SWYgeW91IHdpc2ggdG8gZHJvcCBhIHNwZWNpZmljIGZ1bmN0aW9uIGNhbGwgc3VjaCBhcyBjb25zb2xlLmluZm8gYW5kL29yXHJcblx0XHRcdFx0cmV0YWluIHNpZGUgZWZmZWN0cyBmcm9tIGZ1bmN0aW9uIGFyZ3VtZW50cyBhZnRlciBkcm9wcGluZyB0aGUgZnVuY3Rpb25cclxuXHRcdFx0XHRjYWxsIHRoZW4gdXNlIHB1cmVfZnVuY3MgaW5zdGVhZFxyXG5cdFx0XHQgICovXHJcblx0XHRcdCAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY1RjZcdTc5RkJcdTk2NjRjb25zb2xlXHJcblx0XHRcdCAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmb3JtYXQ6IHtcclxuXHRcdFx0ICBjb21tZW50czogZmFsc2UgLy8gXHU1MjIwXHU5NjY0XHU2Q0U4XHU5MUNBY29tbWVudHNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxlQUFlLFdBQVc7QUFDelMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQUF3SCxJQUFNLDJDQUEyQztBQUtsTixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixPQUFPO0FBQUEsSUFDUCxpQkFBZ0I7QUFBQSxNQUNmLGNBQWE7QUFBQSxJQUNkO0FBQUEsSUFDQSxlQUFjO0FBQUEsSUFDZCxRQUFRO0FBQUE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNKLFNBQVEsQ0FBQyxRQUFPLE1BQU0sT0FBTSxLQUFLO0FBQUEsTUFDakMsT0FBTyxLQUFLLFFBQVEsa0NBQVcscUJBQXFCO0FBQUE7QUFBQSxNQUNwRCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUVkLFVBQVU7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLE1BQ0MsUUFBUTtBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1Qsc0JBQXNCO0FBQUE7QUFBQSxRQUV0QixTQUFTO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxnQkFBZTtBQUFBLFVBQ2YsZ0JBQWU7QUFBQSxVQUNmLGNBQWE7QUFBQSxVQUNiLFlBQVc7QUFBQSxVQUNYLGdCQUFlO0FBQUEsVUFDZixPQUFNO0FBQUEsVUFDTixPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxRQUFPO0FBQUEsVUFDUCxjQUFhO0FBQUEsVUFDYixjQUFhO0FBQUEsVUFDYixtQkFBa0I7QUFBQSxVQUNsQixXQUFVO0FBQUEsUUFDWDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQTtBQUFBLE1BQ2QsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU1SLGNBQWM7QUFBQTtBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUE7QUFBQSxNQUNaO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUVDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
