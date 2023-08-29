import { defineClientConfig } from "@vuepress/client";
import { nextTick, onMounted, watch } from "vue";


export const setupTestCode = (): void => {
    onMounted(() => {
        console.info('pzq')
    });
  }

export default defineClientConfig({
  setup: () => {
    console.info('ppp222pzzzqq')
  },
});
