import customCss from '../../customCss';

export default {
  id: 'ProjectExperience_11', // 组件唯一性id
  componentName: 'ProjectExperience_11', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '项目经验', // 组件中文名称
  description: '项目经验模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'ProjectExperience_11.png'
  }, // 组件快照
  keywords: '项目经验', // 组件关键词，用于搜索
  category: 'project_experience', // 组件分类
  props: {}, // 组件属性
  css: {
    position: 'relative',
    themeColor: '#254665',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 0,
      right: 40,
      bottom: 20,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['ProjectExperience_11'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_11'
  } // 自定义属性字段
};
