<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav
      ref="navRef"
      @generate-report="generateReport"
      @generate-report-new="generateReportNew"
      @reset="reset"
      @publish-comment="publishComment"
    ></design-nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div ref="leftRef" class="left">
        <c-scrollbar trigger="hover">
          <Title show-collapse @unfold-or-collapse="unfoldOrCollapse"></Title>
          <model-list :key="refreshUuid" :left-show-status="leftShowStatus"></model-list>
        </c-scrollbar>
      </div>
      <!-- 预览区域 -->
      <div id="print" class="center">
        <!-- 放大缩小 -->
        <zoom-and-out @add-size="addSize" @reduce-size="reduceSize"></zoom-and-out>
        <component :is="resumeBackgroundName" :key="refreshUuid" ref="html2Pdf">
          <!-- 内容区域 -->
          <div ref="htmlContentPdf" :key="refreshUuid" class="design-content">
            <component :is="custom" ref="customRef" @content-height-change="contentHeightChange" />
          </div>
          <!-- 分页线 -->
          <template v-if="linesNumber > 0 && !isprinting">
            <div
              v-for="(item, index) in linesNumber"
              :ref="(el) => setLinesRef(el, index)"
              :key="index"
              class="lines"
              :style="{ top: `${1158 + 1160 * index}px` }"
            >
              <span class="page-tips-one">第{{ index + 1 }}页</span>
            </div>
          </template>
        </component>

        <!-- 评论组件 -->
        <div ref="commentRef">
          <comment-com
            v-config:open_comment
            :comment-type-id="id"
            comment-type="resumeOnline"
            width="820px"
          ></comment-com>
        </div>
        <!-- 回到顶部 -->
        <el-backtop :right="365" :bottom="50" target="#print">
          <div
            style="
              height: 100%;
              width: 100%;
              background-color: var(--el-bg-color-overlay);
              box-shadow: var(--el-box-shadow-lighter);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
              user-select: none;
              border-radius: 50%;
              font-size: 14px;
            "
          >
            UP
          </div>
        </el-backtop>
      </div>
      <!-- 属性设置面板 -->
      <div :key="refreshUuid" ref="configRef" class="config">
        <title-config :title="cptTitle" @unfold-or-collapse="unfoldOrCollapseConfig">
        </title-config>
        <c-scrollbar
          trigger="hover"
          :h-thumb-style="{
            'background-color': 'rgba(0,0,0,0.4)'
          }"
        >
          <component
            :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
            v-if="appStore.useSelectMaterialStore.cptName"
            :key="appStore.useSelectMaterialStore.cptKeyId"
          />
          <!-- 全局主题样式设置 -->
          <global-style-options-vue v-else></global-style-options-vue>
        </c-scrollbar>
      </div>
    </div>

    <!-- 导出pdf进度弹窗 -->
    <process-bar-dialog
      :dialog-visible="dialogVisible"
      :percentage-num="percentage"
      @cancle="cancleProgress"
    ></process-bar-dialog>
  </div>
</template>

<script setup lang="ts">
  import Title from './components/Title.vue';
  import TitleConfig from './components/TitleConfig.vue';
  import ModelList from './components/ModelList.vue';
  import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
  import custom from '@/template/custom/index.vue';
  import ProcessBarDialog from '@/components/ProcessBarDialog/ProcessBarDialog.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { CScrollbar } from 'c-scrollbar'; // 滚动条
  import DesignNav from './components/DesignNav.vue';
  import { ElMessage } from 'element-plus';
  import optionsComponents from '@/utils/registerMaterialOptionsCom';
  import IDESIGNJSON from '@/interface/design';
  import { closeGlobalLoading } from '@/utils/common';
  import {
    getTemplateInfoAsync,
    getResetTemplateInfoAsync,
    addMakeResumeCountAsync
  } from '@/http/api/resume';
  import printHtml from '@/utils/print';
  import resumeBackgroundComponents from '@/utils/registerResumeBackgroundCom';
  import { exportPdf, exportPNG } from '@/utils/pdf';

  const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { setUuid } = appStore.useUuidStore;
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据
  const route = useRoute();
  const { id } = route.query; // 模板id和模板名称

  // 查询简历数据，有草稿返回草稿，没有草稿返回简历数据
  const resetStoreAndLocal = async (isReset = false, ID = id) => {
    let TEMPLATE_JSON: IDESIGNJSON;
    let data;
    if (isReset) {
      data = await getResetTemplateInfoAsync(ID); // 重置
    } else {
      data = await getTemplateInfoAsync(ID);
    }
    if (data.data.status === 200) {
      TEMPLATE_JSON = data.data.data as IDESIGNJSON;
    } else {
      ElMessage.error('查询模板失败！');
      return;
    }
    changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
    setUuid();
    console.log('简历JSON数据', resumeJsonNewStore.value);
  };
  resetStoreAndLocal();
  provide('resetStoreAndLocal', resetStoreAndLocal);

  const resumeBackgroundName = computed(() => {
    return resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom
      ? resumeBackgroundComponents[resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom]
      : resumeBackgroundComponents['RESUME_BACKGROUND_DEFAULT'];
  });

  // 生命周期函数
  onMounted(async () => {
    resizeDOM();
    initClickListen();

    await nextTick();
    closeGlobalLoading(); // 关闭全局等待层
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });
  onBeforeUpdate(() => {
    lineRefs = [];
  });

  // 属性设置
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  // 全局样式设置
  const globalStyleSetting = () => {
    // 重置store选中模块
    resetSelectModel();
  };

  // 导出pdf
  const html2Pdf = ref<any>(null); // 获取元素节点
  let lineRefs: Array<any> = []; // 分割线的ref
  const setLinesRef = (el: any, index: number) => {
    if (el) {
      if (linesNumber.value === index + 1) {
        el.style.top = linesNumber.value * 1160 + 'px'; // 最后一条分割线出现在底部
      }
      lineRefs.push(el);
    }
  };

  // 重置数据
  const reset = async () => {
    resetStoreAndLocal(true); // 重置store数据
    globalStyleSetting(); // 重置选中模块
    ElMessage({
      message: '重置成功!',
      type: 'success',
      center: true
    });
    setUuid(); // 重新渲染左侧列表和右侧属性面板设置
    await nextTick();
    resizeDOM();
  };

  // 生成pdf方法
  const dialogVisible = ref<boolean>(false);
  const percentage = ref<number>(10);
  let timer: any = null;
  const generateReport = async (type: string) => {
    dialogVisible.value = true;
    timer = setInterval(() => {
      percentage.value += 5;
      if (percentage.value > 95) {
        percentage.value = 98;
        clearInterval(timer);
      }
    }, 500);
    let height = htmlContentPdf.value.style.height;
    if (type === 'pdf') {
      await exportPdf(id as string, height);
    } else {
      await exportPNG(id as string, height);
    }

    clearInterval(timer);
    percentage.value = 100;
  };

  // 另存为PDF，新的方法
  const isprinting = ref<boolean>(false);
  const generateReportNew = async () => {
    addMakeResumeCountAsync(); // 增加pdf导出次数
    isprinting.value = true; // 去掉分割线
    // 重置store选中模块
    resetSelectModel();
    await nextTick();
    const target = document.getElementById('print');
    if (target) {
      printHtml(target.innerHTML);
    }
    // 打印取消和完成
    window.onbeforeprint = () => {
      isprinting.value = true;
    };
    window.onafterprint = () => {
      isprinting.value = false;
    };
  };

  // 关闭进度弹窗
  const cancleProgress = () => {
    dialogVisible.value = false;
    percentage.value = 10;
  };

  // 监听内容元素高度变化，绘制分割线
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  let linesNumber = ref<number>(0);
  const { pageCount } = storeToRefs(appStore.useCreateTemplateStore);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        pageCount.value = linesNumber.value;
        html2Pdf.value.$el.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
        htmlContentPdf.value.style.height = html2Pdf.value.$el.style.height;
      }
    });
    observer.observe(htmlContentPdf.value); // 监听元素
  };

  // 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
  const contentHeightChange = async (height: number) => {
    htmlContentPdf.value.style.height = height + 'px';
    await nextTick();
    resizeDOM();
    console.log('子组件内容高度发生变化---需要重新计算高度', htmlContentPdf.value.style.height);
  };

  // 点击其它区域，取消模块选择，即取消模块选中效果
  const initClickListen = () => {
    window.addEventListener('click', dealClick);
  };
  const dealClick = (e: MouseEvent) => {
    const bool = getTargetNode(htmlContentPdf.value, e.target);
    if (bool) {
      globalStyleSetting();
    }
  };
  const getTargetNode = (ele: any, target: any): boolean => {
    if (!ele || ele === document) return false;
    return ele === target ? true : getTargetNode(ele.parentNode, target);
  };
  onBeforeUnmount(() => {
    window.removeEventListener('click', dealClick);
  });

  // 展开或收起左侧栏
  const leftRef = ref<any>(null);
  const leftShowStatus = ref<boolean>(true);
  const unfoldOrCollapse = (status: boolean) => {
    if (status) {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = '300px';
    } else {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = '70px';
    }
  };

  // 展开或收起属性面板设置
  const configRef = ref<any>(null);
  const unfoldOrCollapseConfig = (status: boolean) => {
    if (status) {
      configRef.value.style.width = '355px';
      configRef.value.style.flex = 'inherit';
    } else {
      configRef.value.style.flex = 1;
    }
  };

  // 添加自定义模块时，左右布局单独处理
  const customRef = ref<any>(null);
  const addCustomModelLeftRight = (item: any) => {
    if (item.layout === 'left') {
      customRef.value.leftList.push(item);
    } else {
      customRef.value.rightList.push(item);
    }
  };
  provide('addCustomModelLeftRight', addCustomModelLeftRight);

  // 放大缩小center
  const sizeCenter = ref<number>(1);
  const addSize = (number: number) => {
    sizeCenter.value = number;
  };
  const reduceSize = (number: number) => {
    sizeCenter.value = number;
  };

  // 滚动到发表评论区域
  const commentRef = ref<any>(null);
  const publishComment = () => {
    commentRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  // 页面销毁
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    } // 关闭全局等待层
  });
</script>
<style lang="scss">
  @use '../../style/options';
</style>
<style lang="scss" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 1375px;
    .bottom {
      display: flex;
      width: 100%;

      .left {
        width: 270px;
        background-color: #fff;
        height: calc(100vh - 50px);
        overflow: auto;
        transition: all 0.3s;
      }

      .center {
        // display: flex;
        // justify-content: center;
        // align-items: flex-start;
        flex: 1;
        min-width: 840px;
        height: calc(100vh - 50px);
        overflow: auto;

        .design {
          // background: white;
          width: 820px;
          min-height: 1160px;
          margin: 40px auto;
          display: flex;
          position: relative;
          zoom: v-bind('sizeCenter');
          .lines {
            z-index: 10;
            width: 820px;
            height: 4px;
            background: #f3f3f3 url(@/assets/images/paging_bg.png) center top no-repeat;
            user-select: none;
            pointer-events: none;
            position: absolute;
            display: flex;
            align-items: center;
            .page-tips-one {
              position: absolute;
              top: -17px;
              right: 0px;
              font-size: 12px;
              background: #ff9971;
              color: #fff;
              padding: 2px 8px;
              border-radius: 8px 0 0 0;
            }
          }
          .design-content {
            font-family: v-bind(
              'resumeJsonNewStore.GLOBAL_STYLE.fontFamily ? resumeJsonNewStore.GLOBAL_STYLE.fontFamily : "微软雅黑"'
            );
          }
        }
      }

      .config {
        width: 355px;
        background-color: #fff;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
        transition: all 0.3s;
      }
    }
  }
</style>
