import customCss from '../../customCss';

export default {
  id: 'EduBackground_9', // 组件唯一性id
  componentName: 'EduBackground_9', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '教育背景', // 组件中文名称
  description: '教育背景模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'EduBackground_9.png'
  }, // 组件快照
  keywords: '教育背景', // 组件关键词，用于搜索
  category: 'edu_background', // 组件分类
  props: {
    title: {
      chName: '教育背景',
      show: true,
      iconfont: 'icon-education-1-copy',
      config: true // 是否支持配置
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 13,
      right: 40,
      bottom: 20,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['EduBackground_9'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_9'
  } // 自定义属性字段
};