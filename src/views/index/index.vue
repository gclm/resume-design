<template>
  <div ref="indexRef" class="index-box" @scroll="handleScroll">
    <!-- 导航栏 -->
    <nav-bar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce
        @free-make="freeMake"
        @see-more="seeMore"
        @lego-design="legoDesign"
        @webcode="webcode"
      ></project-introduce>
    </div>
    <!-- 更多功能 -->
    <more-function></more-function>
    <!-- 模板选择 -->
    <template-select ref="templeTef"></template-select>
    <!-- 根据用途挑选简历 -->
    <select-template-by-use></select-template-by-use>
    <!-- 职行AI产品介绍栏 -->
    <jobzx-product ref="jobzxRef" v-config:open_jobzx></jobzx-product>
    <!-- 简历优化服务 -->
    <resume-service></resume-service>
    <!-- 简历功能介绍 -->
    <resume-function-introduce></resume-function-introduce>
    <!-- 网站开源信息 -->
    <website-open-source></website-open-source>

    <!-- 积木创作 -->
    <!-- <lego-design-introduce-vue ref="legoDesignRef"></lego-design-introduce-vue> -->
    <!-- 自定义模板 -->
    <!-- <custom-template-vue ref="customTempleRef"></custom-template-vue> -->
    <!-- 成为赞助者 -->
    <!-- <sponsor-com-vue ref="sponsorRefs"></sponsor-com-vue> -->
    <!-- 网站相关数据 -->
    <web-data></web-data>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />

    <!-- 联系我 -->
    <!-- <call-me></call-me> -->

    <!-- GitHub卡片 -->
    <!-- <github-card></github-card> -->
  </div>
  <!-- footer -->
  <footer-com></footer-com>
  <!-- 公告弹窗 -->
  <notice-dialog
    :dialog-notice-visible="dialogNoticeVisible"
    @cancle="noticeCancle"
  ></notice-dialog>
  <!-- 签到弹窗 -->
  <attendance-dialog
    :dialog-attendance-visible="dialogAttendanceVisible"
    @close="closeAttendanceDialog"
  ></attendance-dialog>

  <!-- 客服组件 -->
  <customer-service></customer-service>
</template>
<script setup lang="ts">
  import NavBar from '@/components/NavBar/NavBar.vue';
  import ProjectIntroduce from './components/IndexProduct.vue';
  import TemplateSelect from './components/TemplateSelect.vue';
  import JobzxProduct from './components/JobzxProduct.vue';
  // import CustomTemplateVue from './components/CustomTemplate.vue';
  // import SponsorComVue from './components/SponsorCom.vue';
  import FooterCom from '@/components/FooterCom/FooterCom.vue';
  // import LegoDesignIntroduceVue from './components/LegoDesignIntroduce.vue';
  // import CallMe from './components/CallMe.vue';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { throttle } from 'lodash';
  // import GithubCard from '@/components/GihubCard/GithubCard.vue';
  import WebData from './components/WebData.vue';
  import NoticeDialog from '@/components/NoticeDialog/NoticeDialog.vue';
  import SelectTemplateByUse from './components/SelectTemplateByUse.vue';
  import ResumeFunctionIntroduce from './components/ResumeFunctionIntroduce.vue';
  import WebsiteOpenSource from './components/WebsiteOpenSource.vue';
  import ResumeService from './components/ResumeService.vue';
  import { useHead } from '@vueuse/head';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import { title } from '@/config/seo';
  import MoreFunction from './components/MoreFunction.vue';

  const { websiteConfig } = storeToRefs(appStore.useWebsiteConfigStore);

  useHead({
    title: websiteConfig.value.website_title || title
  });

  const dialogNoticeVisible = ref<boolean>(false);
  const readNotice = localStorage.getItem('readNotice');
  if (readNotice == '1') {
    dialogNoticeVisible.value = false;
  } else {
    dialogNoticeVisible.value = false;
  }

  const noticeCancle = () => {
    dialogNoticeVisible.value = false;
  };

  // 监听元素滚动
  onMounted(() => {
    window.addEventListener('scroll', throttleHandle);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttleHandle);
  });

  // 页面滚动改变导航栏样式
  const throttleHandle = throttle(() => {
    handleScroll();
  }, 300);
  const navColor = ref<string>('');
  const fontColor = ref<string>('green');
  const iconColor = ref<string>('green');
  const handleScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      navColor.value = 'rgba(255, 255, 255, 1)';
      fontColor.value = 'green';
      iconColor.value = 'green';
    } else {
      navColor.value = '';
      iconColor.value = 'green';
      fontColor.value = 'green';
    }
  };

  // 点击免费制作
  const freeMake = () => {
    router.push('/resume');
  };

  // 下滑
  const templeTef = ref<any>(null);
  const seeMore = () => {
    templeTef.value.scrollIntoView();
  };

  // 点击积木创作
  const legoDesignRef = ref<any>(null);
  const legoDesign = () => {
    legoDesignRef.value.scrollIntoView();
  };

  // 点击成为赞助者
  const router = useRouter();
  const webcode = () => {
    router.push('/webcode');
  };

  // 签到弹窗
  const dialogAttendanceVisible = ref<boolean>(false);
  const { token } = appStore.useTokenStore;

  // 每日弹窗控制
  const lastPopupDate = localStorage.getItem('lastPopupDate');
  const currentDate = new Date().toLocaleDateString();
  if (lastPopupDate !== currentDate && token) {
    dialogAttendanceVisible.value = true;
    localStorage.setItem('lastPopupDate', currentDate);
  }
  const closeAttendanceDialog = () => {
    dialogAttendanceVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .index-box {
    position: relative;
    z-index: 0;
  }
</style>
