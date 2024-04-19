
  
  <script lang="ts" setup>
    import { computed,useAttrs} from "vue";
    defineOptions({ name: "ElsStampBadge", inheritAttrs: false })
    interface Props{
        type:string,
        size:string,
        rotate?:number,
        content?:string
    }
    
    const props = withDefaults(defineProps<Props>(),{
        type:'primary',
        size:'middle',
        rotate:0,
        content:'Unknown'

    });  
const attrs=useAttrs()
    const getStampBadgeClass = computed(() => {
      return [
        {
          [`stamp-badge-${props.type}`]: !!props.type,
          [`stamp-badge-${props.size}`]: !!props.size,
        },
      ];
    });

  </script>
  <template>
    <div
      class="first-ring"
      v-bind="attrs"
      :class="getStampBadgeClass"
      :style="{ transform: `rotate(${rotate}deg)` }"
    >
      <div class="second-ring" :class="getStampBadgeClass">
        <div class="third-ring" :class="getStampBadgeClass">
          <div class="forth-ring" :class="getStampBadgeClass">
            <div class="content-rectangle ellipsis" :class="getStampBadgeClass">
              <span class=""><slot>{{ content }}</slot></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <style lang="less" scoped>
    .first-ring {
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .second-ring {
      background: #fff;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .third-ring {
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .forth-ring {
      background: #fff;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  
    .content-rectangle {
      background: #fff;
      font-weight: bold;
      text-align: center;
      position: absolute;
    }
  
    .ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    // primary
    .stamp-badge-primary.first-ring {
      background: var(--el-color-primary);
    }
    .stamp-badge-primary.third-ring {
      background: var(--el-color-primary);
    }
    .stamp-badge-primary.content-rectangle {
      border: 1px solid var(--el-color-primary);
      color: var(--el-color-primary);
    }
    // success
    .stamp-badge-success.first-ring {
      background: var(--el-color-success);
    }
    .stamp-badge-success.third-ring {
      background: var(--el-color-success);
    }
    .stamp-badge-success.content-rectangle {
      border: 1px solid var(--el-color-success);
      color: var(--el-color-success);
    }
    // error
    .stamp-badge-danger.first-ring {
      background: var(--el-color-danger);
    }
    .stamp-badge-danger.third-ring {
      background: var(--el-color-danger);
    }
    .stamp-badge-danger.content-rectangle {
      border: 1px solid var(--el-color-danger);
      color: var(--el-color-danger);
    }
    // warning
    .stamp-badge-warning.first-ring {
      background: var(--el-color-warning);
    }
    .stamp-badge-warning.third-ring {
      background: var(--el-color-warning);
    }
    .stamp-badge-warning.content-rectangle {
      border: 1px solid var(--el-color-warning);
      color: var(--el-color-warning);
    }
    // info
    .stamp-badge-info.first-ring {
      background: var(--el-color-info);
    }
    .stamp-badge-info.third-ring {
      background: var(--el-color-info);
    }
    .stamp-badge-info.content-rectangle {
      border: 1px solid var(--el-color-info);
      color: var(--el-color-info);
    }
    // large
    .stamp-badge-large.first-ring {
      width: 84px;
      height: 84px;
    }
    .stamp-badge-large.second-ring {
      width: 80px;
      height: 80px;
    }
    .stamp-badge-large.third-ring {
      width: 74px;
      height: 74px;
    }
    .stamp-badge-large.forth-ring {
      width: 64px;
      height: 64px;
    }
    .stamp-badge-large.content-rectangle {
      width: 90px;
      font-size: 1.2rem;
    }
    // middle
    .stamp-badge-middle.first-ring {
      width: 64px;
      height: 64px;
    }
    .stamp-badge-middle.second-ring {
      width: 60px;
      height: 60px;
    }
    .stamp-badge-middle.third-ring {
      width: 56px;
      height: 56px;
    }
    .stamp-badge-middle.forth-ring {
      width: 48px;
      height: 48px;
    }
    .stamp-badge-middle.content-rectangle {
      width: 70px;
      font-size: 1rem;
    }
    // small
    .stamp-badge-small.first-ring {
      width: 54px;
      height: 54px;
    }
    .stamp-badge-small.second-ring {
      width: 50px;
      height: 50px;
    }
    .stamp-badge-small.third-ring {
      width: 46px;
      height: 46px;
    }
    .stamp-badge-small.forth-ring {
      width: 38px;
      height: 38px;
    }
    .stamp-badge-small.content-rectangle {
      width: 60px;
      font-size: 0.8rem;
    }
  </style>
  