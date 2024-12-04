import customCss from '../../customCss';

export default {
  id: 'JobIntention_2', // 组件唯一性id
  componentName: 'JobIntention_2', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '求职意向', // 组件中文名称
  description: '求职意向模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'JobIntention_2.png'
  }, // 组件快照
  keywords: '简历标题', // 组件关键词，用于搜索
  category: 'job_intention', // 组件分类
  props: {
    title: {
      chName: '求职意向',
      show: true,
      iconfont: 'icon-yixianggangwei',
      config: true // 是否支持配置
    }
  }, // 组件属性
  css: {
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
  customCss: customCss['JobIntention_2'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_4'
  } // 自定义属性字段
};