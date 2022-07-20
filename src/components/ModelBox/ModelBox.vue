<template>
  <div
    class="model-box"
    v-if="item.show && item.style"
    :ref="(el) => setRefItem(el, item.model, item.id)"
    @click="selectModel(item.model, item.title, item.id)"
    @mouseover="modelHover(item.id)"
    @mouseleave="modelMouseleave"
  >
    <!-- 模块操作区域 -->
    <div class="edit-box" v-show="hoverCurrentId === item.id">
      <el-tooltip class="box-item" effect="dark" content="复制当前模块">
        <div class="copy" @click="useCopyModel(item)">
          <svg-icon iconName="icon-jia" className="icon" color="#fff" size="16px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="删除当前模块">
        <div class="delete" @click.stop="useDeleteModel(item)">
          <svg-icon
            iconName="icon-shanchu"
            className="icon icon-shanchu"
            color="#fff"
            size="18px"
          ></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <!-- 模块标题 -->
    <slot name="model-title"></slot>
    <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
  </div>
</template>
<script lang="ts" setup>
  import { useModelOptionsComName } from '@/hooks/useModelOptionsComName';
  import { useResumeModelStore } from '@/store/resume';
  import { ComponentPublicInstance, reactive, ref, watch } from 'vue';
  import { useCopyModel } from '@/hooks/useCopyModel';
  import { useDeleteModel } from '@/hooks/useDeleteModel';
  import { storeToRefs } from 'pinia';

  const props = defineProps<{
    item: any;
    components: any;
  }>();

  // 锚点定位
  const { id } = storeToRefs(useResumeModelStore());
  watch(
    id,
    (newVal, oldVal) => {
      // 判断是否选中复选框
      if (oldVal && modelObj[oldVal]) {
        modelObj[oldVal].el.style.borderColor = 'transparent';
      }
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
        modelObj[newVal].el.style.borderColor = '#7ec97e';
      }
    },
    {
      deep: true
    }
  );

  // 鼠标移入模块
  const hoverCurrentId = ref<string>('');
  const modelHover = (id: string) => {
    hoverCurrentId.value = id;
  };

  // 鼠标移出模块
  const modelMouseleave = () => {
    hoverCurrentId.value = '';
  };

  // 模块ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, model: string, id: string) => {
    if (el) {
      modelObj[id] = {
        id: id,
        el: el
      };
    }
  };

  // 点击模块
  const resumeModelStore = useResumeModelStore();
  const selectModel = (model: string, title: string, id: string) => {
    let optionsName: string = useModelOptionsComName(`template1-${model}`);
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
  };
</script>
<style lang="less" scoped>
  .model-box {
    border: 1px dashed transparent;
    transition: all 0.3s;
    position: relative;
    &:hover {
      border-color: #7ec97e !important;
      cursor: pointer;
    }
    .edit-box {
      position: absolute;
      right: 0px;
      top: -35px;
      display: flex;
      .copy,
      .delete {
        width: 35px;
        height: 35px;
        background-color: #00c091;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(#00c091, 0.8);
        }
      }
      .delete {
        margin-left: 6px;
      }
    }
  }
</style>