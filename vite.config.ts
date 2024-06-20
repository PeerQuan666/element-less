import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
		commonjsOptions:{
			esmExternals:true
		},
		copyPublicDir:false,
		outDir: "element-less", //输出文件名称
		lib: {
			// formats:['iife','es', 'umd','cjs'],
			formats:['iife'],
			entry: path.resolve(__dirname, "./packages/index.ts"), //指定组件编译入口文件
			name: "element-less",
			fileName: "element-less",
		}, //库编译模式配置
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: [
			"vue",
			'@vueuse/core',
			'axios',
			'consola',
			'element-plus',
			'escape-html',
			'file-saver',
			'lodash',
			'md-editor-v3',
			'nprogress',
			'path',
			'pinia',
			'prismjs',
			'sortablejs',
			'vue-fontawesome',
			'vue-router',
			'vue-ueditor-wrap',
			'vuedraggable',
			'vuex',
			'xlsx',
			'element-less',
			'vue-json-viewer',
			'ace-builds',
			'@icon-park/vue-next',
			'@wangeditor/editor',
			'json-editor-vue'
		],
			output: {
				name: 'ElementLess',
				exports: 'named',
				externalLiveBindings: false,
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
					'element-plus':'ElementPlus',
					'@vueuse/core':'VueUse',
					vuedraggable:'vuedraggable',
					sortablejs:'Sortable',
					'md-editor-v3':'MdEditorV3',
					pinia:'Pinia',
					axios:'axios',
					XLSX:'XLSX',
					lodash:'_',
					"ace-builds":'ace',
					'file-saver':'fileSave',
					'vue-json-viewer':'JsonView.default',
					'json-editor-vue':'JsonEditorVue.default',
					'prismjs':'Prism',
					'@wangeditor/editor':'wangEditor'
				},
			},
		}, 
		// rollup打包配置
		minify: 'terser',
		terserOptions: { // 在打包代码时移除 console、debugger 和 注释
			compress: {
			  /* (default: false) -- Pass true to discard calls to console.* functions.
				If you wish to drop a specific function call such as console.info and/or
				retain side effects from function arguments after dropping the function
				call then use pure_funcs instead
			  */
			  drop_console: true, // 生产环境时移除console
			  drop_debugger: true
			},
			format: {
			  comments: false // 删除注释comments
			}
		}
	},
	
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
	  'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
