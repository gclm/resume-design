<template>
  <div class="add-article-box">
    <!-- 工具栏 -->
    <div class="add-article-toolbar-container">
      <Toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
      <publish-pop
        :title="title"
        :value-html="valueHtml"
        :editor="editorRef"
        :publish-info="publishInfo"
      ></publish-pop>
    </div>

    <div class="content-box">
      <!-- 文章目录 -->
      <catalog-card ref="catalogRef" container=".w-e-text-container"></catalog-card>

      <!-- 编辑器 -->
      <div class="add-article-editor-container">
        <div class="editor-box">
          <div class="title-container">
            <el-input
              v-model.trim="title"
              placeholder="请输入标题"
              :maxlength="40"
              show-word-limit
              size="large"
            ></el-input>
          </div>
          <Editor
            id="markdown-body"
            v-model="valueHtml"
            :default-config="editorConfig"
            :mode="mode"
            @on-created="handleCreated"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import PublishPop from './components/PublishPop.vue';
  import CONFIG from '@/config';
  import appStore from '@/store';
  import { getArticleInfoAsync } from '@/http/api/article';

  const route = useRoute();
  const { articleId } = route.query;
  console.log('articleId', route.query);

  // 模式
  const mode = ref<string>('default');
  // 标题
  const title = ref<string>('');

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref<string>('');
  const catalogRef = ref<any>(null);
  watch(
    () => valueHtml.value,
    () => {
      catalogRef.value.getTitles();
    },
    { deep: true }
  );

  // 模拟 ajax 异步获取内容
  const articleInfo = ref<any>('');
  const publishInfo = ref<any>(null);
  onMounted(async () => {
    // 编辑文章
    if (articleId) {
      const data = await getArticleInfoAsync(articleId);
      if (data.data.status === 200) {
        articleInfo.value = data.data.data;
        title.value = articleInfo.value.article_title;
        valueHtml.value = articleInfo.value.article_html_content;
        publishInfo.value = {
          id: articleInfo.value._id,
          category: articleInfo.value.article_category, // 分类
          abstract: articleInfo.value.article_abstract, // 摘要
          imageUrl: articleInfo.value.article_cover, // 封面图
          dynamicTags: articleInfo.value.article_tags, // 标签
          isNeedAuth: articleInfo.value.article_code_buy_code
        };
        await nextTick();
        catalogRef.value.getTitles();
      } else {
        ElMessage.error(data.data.message);
      }
    }
  });

  const toolbarConfig = {};

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  const customCheckVideoFn = (src: string): boolean | string | undefined => {
    if (!src) {
      return;
    }
    return true;

    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入视频
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
  };

  // 自定义转换视频
  const customParseVideoSrc = (src: string): string => {
    return src;
  };

  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容',
    scroll: false,
    MENU_CONF: {
      // 图片上传配置
      uploadImage: {
        server: CONFIG.serverAddress + '/huajian/upload/file/article',
        fieldName: 'file',
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],
        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,
        // 自定义增加 http  header
        headers: {
          Authorization: appStore.useTokenStore.token
        },
        timeout: 20 * 1000, // 20 秒
        maxFileSize: 1 * 1024 * 1024,
        // 自定义插入图片
        customInsert(res: any, insertFn: any) {
          console.log('服务端返回结果', res);
          let url = res.data.data.fileUrl;
          let alt = res.data.data.fileName;
          let href = res.data.data.fileUrl;
          insertFn(url, alt, href);
        },
        /*******回调函数********/
        // 上传之前触发
        onBeforeUpload(files: any) {
          console.log('上传之前触发', files);
          return files;
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          console.log(`${file.name} 上传失败`, res);
        }
      },
      // 视频配置
      insertVideo: {
        onInsertedVideo(videoNode: HTMLVideoElement | null) {
          if (videoNode == null) return;

          const { src } = videoNode;
          console.log('inserted video', src);
        },
        checkVideo: customCheckVideoFn, // 也支持 async 函数
        parseVideoSrc: customParseVideoSrc // 也支持 async 函数
      }
    }
  };
</script>
<style lang="scss" scoped>
  .add-article-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    .add-article-toolbar-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      position: sticky;
      top: -15px;
      z-index: 1000;
      border-bottom: 1px solid #eee;
      .toolbar-container {
        display: flex;
        align-items: center;
      }
    }

    .content-box {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 30px 20px;
      width: 100%;
      :deep(.catalog-card) {
        width: 200px;
        box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.54);
        position: sticky;
        top: 40px;
        margin-left: 0;
        flex: none;
      }
      // 编辑器
      .add-article-editor-container {
        display: flex;
        padding: 0 20px;
        justify-content: center;
        align-items: flex-start;
        .editor-box {
          background-color: #fff;
          width: 858px;
          min-height: 1000px;
          padding: 20px 50px 50px 50px;
          border: 1px solid #e8e8e8;
          box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
          .title-container {
            padding: 20px 0;
            border-bottom: 1px solid #e8e8e8;
            :deep(.el-input) {
              .el-input__wrapper {
                border: none;
                padding: 0;
                box-shadow: none;
                .el-input__inner {
                  font-size: 30px;
                  border: 0;
                  outline: none;
                  width: 100%;
                  line-height: 1;
                }
              }
            }
          }
          :deep(.w-e-scroll) {
            min-height: 1000px;
            #w-e-textarea-1 {
              min-height: 700px;
            }
          }
          :deep(.w-e-text-container) {
            min-height: 1000px;
          }
        }
      }
    }
  }
</style>
