<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <!-- 实习经验列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-internship-experience2
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-internship-experience2>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjInternshipExperience2 from '../components/hj-internship-experience-2.vue';

  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
