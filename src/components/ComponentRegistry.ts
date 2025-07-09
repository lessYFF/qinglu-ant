/**
 * 组件注册表
 * 重新分类：基础组件为通用UI组件，业务组件为车辆租赁业务专用组件
 */
import React from 'react';

// 导入所有组件
import { 
  AlphaInput, MinuteDatePicker, MinuteRangePicker, CardCheckbox, MoneyInput,
  Modal, EditModal,
  Table,
  Loading,
  Roles,
  ChooseBrands,
  ChooseModels,
  ChooseStores,
  ChooseSerys,
  ChooseSubSerys,
  ChooseModelGroups,
  ChooseModelsByStore,
  ChooseModelsByStoreForStock,
  ChooseLicenseTypes,
  ChooseLicenseTypesByName,
  ChooseMobilePrefix,
  ChooseChannel,
  ChooseVehicles,
  EnumSelect,
  Preview,
  Export,
  NamesSelect,
  Search,
  Upload,
  AliyunVerifyModal,
  VerifyTrigger,
  LinkButton,
  MultipleSelect,
  MyProTable,
  MySearchForm,
  MyUpload,
  PriceInput,
  PageSection,
  PageFooter,
  ModuleSection
} from './index';

// 导入支付组件（默认导出）
import PayComponent from './pay';

// 组件配置接口
export interface ComponentConfig {
  name: string;
  displayName: string;
  category: 'basic' | 'business';
  component: React.ComponentType<any>;
  description: string;
  defaultProps?: Record<string, any>;
  requiredProps?: string[];
  mockDataDependencies?: string[];
  demoProps?: Record<string, any>;
  usage: string;
}

// 组件注册表
export const ComponentRegistry: Record<string, ComponentConfig> = {
  // ============================================
  // 基础组件 - 通用UI组件，不依赖特定业务逻辑
  // ============================================
  
  'AlphaInput': {
    name: 'AlphaInput',
    displayName: '字母数字输入框',
    category: 'basic',
    component: AlphaInput,
    description: '只能输入数字和字母的文本框，并且会自动将字母大写',
    defaultProps: {
      placeholder: '请输入字母和数字'
    },
    demoProps: {
      placeholder: '输入 ab123@# 将转为 AB123'
    },
    usage: '<AlphaInput placeholder="请输入字母和数字" onChange={(value) => console.log(value)} />'
  },

  'MinuteDatePicker': {
    name: 'MinuteDatePicker',
    displayName: '分钟级日期选择器',
    category: 'basic',
    component: MinuteDatePicker,
    description: '精确到分钟的日期时间选择器',
    defaultProps: {
      placeholder: '请选择时间'
    },
    usage: '<MinuteDatePicker onChange={(value) => console.log(value)} />'
  },

  'MinuteRangePicker': {
    name: 'MinuteRangePicker',
    displayName: '分钟级日期范围选择器',
    category: 'basic',
    component: MinuteRangePicker,
    description: '精确到分钟的日期时间范围选择器',
    defaultProps: {
      placeholder: ['开始时间', '结束时间']
    },
    usage: '<MinuteRangePicker onChange={(values) => console.log(values)} />'
  },

  'CardCheckbox': {
    name: 'CardCheckbox',
    displayName: '卡片式多选框',
    category: 'basic',
    component: CardCheckbox,
    description: '卡片形式的多选框组件',
    defaultProps: {
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' }
      ]
    },
    demoProps: {
      options: [
        { label: '新能源车', value: 'electric' },
        { label: '燃油车', value: 'fuel' },
        { label: '混动车', value: 'hybrid' }
      ]
    },
    usage: '<CardCheckbox options={[{label: "选项1", value: "option1"}]} onChange={(values) => console.log(values)} />'
  },

  'MoneyInput': {
    name: 'MoneyInput',
    displayName: '金额输入框',
    category: 'basic',
    component: MoneyInput,
    description: '金额输入框，自动处理单位转换（元/分）',
    defaultProps: {
      placeholder: '请输入金额'
    },
    demoProps: {
      placeholder: '输入金额（元），内部存储为分'
    },
    usage: '<MoneyInput placeholder="请输入金额" onChange={(value) => console.log(value)} />'
  },

  'PriceInput': {
    name: 'PriceInput',
    displayName: '价格输入框',
    category: 'basic',
    component: PriceInput,
    description: '专门用于价格输入的组件，支持格式化显示',
    defaultProps: {
      placeholder: '请输入价格'
    },
    demoProps: {
      placeholder: '输入价格（元）',
      onChange: (value: number) => console.log('价格:', value)
    },
    usage: '<PriceInput placeholder="请输入价格" onChange={(value) => console.log(value)} />'
  },

  'Modal': {
    name: 'Modal',
    displayName: '基础对话框',
    category: 'basic',
    component: ({ title = '示例对话框', children = '这是对话框内容', ...props }: any) => {
      const [open, setOpen] = React.useState(false);
      return React.createElement('div', {}, [
        React.createElement('button', { 
          key: 'trigger',
          onClick: () => setOpen(true),
          style: { padding: '8px 16px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
        }, '打开对话框'),
        React.createElement(Modal, { 
          key: 'modal',
          title, 
          open, 
          onCancel: () => setOpen(false),
          onOk: () => setOpen(false),
          ...props 
        }, children)
      ]);
    },
    description: '基础对话框组件，预设了常用的配置和样式',
    defaultProps: {
      title: '示例对话框',
      children: '这是对话框内容'
    },
    demoProps: {
      title: '演示对话框',
      children: React.createElement('div', { style: { padding: '20px' } }, 
        '这是一个可交互的对话框演示。你可以点击按钮打开对话框，然后通过确定或取消按钮关闭它。'
      )
    },
    usage: '<Modal title="标题" open={visible} onCancel={() => setVisible(false)}>内容</Modal>'
  },

  'EditModal': {
    name: 'EditModal',
    displayName: '编辑对话框',
    category: 'basic',
    component: ({ title = '编辑对话框', children = '这是编辑表单内容', ...props }: any) => {
      const [open, setOpen] = React.useState(false);
      return React.createElement('div', {}, [
        React.createElement('button', { 
          key: 'trigger',
          onClick: () => setOpen(true),
          style: { padding: '8px 16px', background: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
        }, '编辑内容'),
        React.createElement(EditModal, { 
          key: 'modal',
          title, 
          open, 
          onCancel: () => setOpen(false),
          onOk: () => setOpen(false),
          ...props 
        }, children)
      ]);
    },
    description: '专为编辑表单设计的对话框，防止误关闭造成数据丢失',
    defaultProps: {
      title: '编辑对话框',
      children: '这是编辑表单内容'
    },
    demoProps: {
      title: '编辑车辆信息',
      children: React.createElement('div', { style: { padding: '20px' } }, [
        React.createElement('p', { key: 'desc' }, '这是一个编辑对话框演示，具有防误关闭保护功能。'),
        React.createElement('div', { key: 'form', style: { marginTop: '16px' } }, [
          React.createElement('label', { key: 'label' }, '车辆名称：'),
          React.createElement('input', { 
            key: 'input',
            type: 'text', 
            defaultValue: '大众朗逸',
            style: { marginLeft: '8px', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }
          })
        ])
      ])
    },
    usage: '<EditModal title="编辑" open={visible} onCancel={() => setVisible(false)}>表单内容</EditModal>'
  },

  'MyProTable': {
    name: 'MyProTable',
    displayName: '高级表格',
    category: 'basic',
    component: MyProTable,
    description: '功能增强的表格组件，集成搜索、筛选、分页等功能',
    defaultProps: {
      columns: [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '地址', dataIndex: 'address', key: 'address' }
      ],
      dataSource: [
        { key: '1', name: '张三', age: 32, address: '上海市' },
        { key: '2', name: '李四', age: 42, address: '北京市' }
      ]
    },
    usage: '<MyProTable columns={columns} dataSource={data} request={async () => data} />'
  },

  'MySearchForm': {
    name: 'MySearchForm',
    displayName: '搜索表单',
    category: 'basic',
    component: MySearchForm,
    description: '搜索表单组件，用于构建复杂的搜索条件',
    defaultProps: {
      onFinish: (values: any) => console.log('搜索条件:', values)
    },
    demoProps: {
      onFinish: (values: any) => console.log('搜索:', values),
      onReset: () => console.log('重置搜索')
    },
    usage: '<MySearchForm onFinish={(values) => console.log(values)} onReset={() => console.log("reset")} />'
  },

  'MyUpload': {
    name: 'MyUpload',
    displayName: '文件上传',
    category: 'basic',
    component: MyUpload,
    description: '自定义样式和功能的文件上传组件',
    defaultProps: {
      accept: 'image/*',
      maxCount: 1
    },
    demoProps: {
      accept: '.jpg,.png,.pdf',
      maxCount: 5,
      onChange: (fileList: any[]) => console.log('上传文件:', fileList)
    },
    usage: '<MyUpload accept="image/*" maxCount={1} onChange={(fileList) => console.log(fileList)} />'
  },

  'Loading': {
    name: 'Loading',
    displayName: '加载组件',
    category: 'basic',
    component: Loading,
    description: '加载状态展示组件',
    defaultProps: {
      tip: '正在加载数据...'
    },
    usage: '<Loading tip="加载中..." />'
  },

  'LinkButton': {
    name: 'LinkButton',
    displayName: '链接按钮',
    category: 'basic',
    component: LinkButton,
    description: '链接样式的按钮组件',
    defaultProps: {
      children: '链接按钮'
    },
    demoProps: {
      children: '查看详情',
      onClick: () => console.log('点击链接按钮')
    },
    usage: '<LinkButton onClick={() => console.log("click")}>链接文本</LinkButton>'
  },

  'MultipleSelect': {
    name: 'MultipleSelect',
    displayName: '多选组件',
    category: 'basic',
    component: MultipleSelect,
    description: '支持多选的选择器组件',
    defaultProps: {
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' }
      ],
      placeholder: '请选择'
    },
    demoProps: {
      options: [
        { label: '经济型', value: 'economy' },
        { label: '舒适型', value: 'comfort' },
        { label: '豪华型', value: 'luxury' }
      ],
      placeholder: '选择车型类别',
      onChange: (values: any[]) => console.log('选择的选项:', values)
    },
    usage: '<MultipleSelect options={options} placeholder="请选择" onChange={(values) => console.log(values)} />'
  },

  'PageSection': {
    name: 'PageSection',
    displayName: '页面区块',
    category: 'basic',
    component: PageSection,
    description: '页面布局区块组件，包含头部、内容、底部',
    defaultProps: {
      children: '这是页面内容区域',
      header: '页面头部',
      footer: '页面底部'
    },
    demoProps: {
      header: React.createElement('div', { style: { padding: '16px', background: '#f5f5f5' } }, '表单头部'),
      children: React.createElement('div', { style: { padding: '24px' } }, '表单内容区域'),
      footer: React.createElement('div', { style: { padding: '16px', textAlign: 'center' } }, '操作按钮区域')
    },
    usage: '<PageSection header="头部" footer="底部">内容</PageSection>'
  },

  'PageFooter': {
    name: 'PageFooter',
    displayName: '页面底部',
    category: 'basic',
    component: PageFooter,
    description: '页面底部组件，通常包含操作按钮',
    defaultProps: {
      onSubmit: () => console.log('提交'),
      onCancel: () => console.log('取消')
    },
    demoProps: {
      onSubmit: () => console.log('保存数据'),
      onCancel: () => console.log('取消操作'),
      confirmLoading: false
    },
    usage: '<PageFooter onSubmit={() => console.log("submit")} onCancel={() => console.log("cancel")} />'
  },

  'ModuleSection': {
    name: 'ModuleSection',
    displayName: '模块区块',
    category: 'basic',
    component: ModuleSection,
    description: '模块区块组件，用于组织页面内容模块',
    defaultProps: {
      title: '模块标题',
      children: '模块内容'
    },
    demoProps: {
      title: '车辆信息',
      tip: '请填写完整的车辆信息',
      children: React.createElement('div', { style: { padding: '16px' } }, '车辆详细信息表单')
    },
    usage: '<ModuleSection title="标题" tip="提示信息">内容</ModuleSection>'
  },

  'AliyunVerifyModal': {
    name: 'AliyunVerifyModal',
    displayName: '阿里云验证对话框',
    category: 'basic',
    component: AliyunVerifyModal,
    description: '阿里云人机验证对话框组件，用于安全验证',
    defaultProps: {
      open: false,
      onSuccess: (result: any) => console.log('验证成功:', result),
      onCancel: () => console.log('取消验证')
    },
    usage: '<AliyunVerifyModal open={true} onSuccess={(result) => console.log(result)} onCancel={() => setOpen(false)} />'
  },

  'VerifyTrigger': {
    name: 'VerifyTrigger',
    displayName: '验证触发按钮',
    category: 'basic',
    component: VerifyTrigger,
    description: '触发阿里云验证的按钮组件，支持倒计时功能',
    defaultProps: {
      children: '获取验证码',
      onVerified: async () => true
    },
    demoProps: {
      children: '发送验证码',
      onVerified: async (result: any) => {
        console.log('验证结果:', result);
        return true;
      }
    },
    usage: '<VerifyTrigger onVerified={async (result) => { console.log(result); return true; }}>获取验证码</VerifyTrigger>'
  },

  // ============================================
  // 业务组件 - 车辆租赁业务专用组件
  // ============================================

  'ChooseBrands': {
    name: 'ChooseBrands',
    displayName: '品牌选择器',
    category: 'business',
    component: ChooseBrands,
    description: '用于选择车型品牌，支持搜索、过滤和添加新品牌',
    mockDataDependencies: ['vehicle-model'],
    defaultProps: {
      placeholder: '请选择品牌'
    },
    demoProps: {
      placeholder: '搜索或选择品牌',
      onChange: (value: any) => console.log('选择的品牌:', value)
    },
    usage: '<ChooseBrands placeholder="请选择品牌" onChange={(value) => console.log(value)} />'
  },

  'ChooseModels': {
    name: 'ChooseModels',
    displayName: '车型选择器',
    category: 'business',
    component: ChooseModels,
    description: '用于选择车型，支持搜索和过滤功能',
    mockDataDependencies: ['vehicle-model'],
    defaultProps: {
      placeholder: '请选择车型'
    },
    demoProps: {
      placeholder: '搜索或选择车型',
      onChange: (value: any) => console.log('选择的车型:', value)
    },
    usage: '<ChooseModels placeholder="请选择车型" onChange={(value) => console.log(value)} />'
  },

  'ChooseSerys': {
    name: 'ChooseSerys',
    displayName: '车系选择器',
    category: 'business',
    component: ChooseSerys,
    description: '用于选择车系的组件，支持按品牌筛选',
    mockDataDependencies: ['vehicle-model'],
    requiredProps: ['brandId'],
    defaultProps: {
      placeholder: '请选择车系',
      brandId: 1
    },
    demoProps: {
      brandId: 1,
      placeholder: '选择车系',
      onChange: (value: any) => console.log('选择的车系:', value)
    },
    usage: '<ChooseSerys brandId={1} placeholder="请选择车系" onChange={(value) => console.log(value)} />'
  },

  'ChooseSubSerys': {
    name: 'ChooseSubSerys',
    displayName: '子车系选择器',
    category: 'business',
    component: ChooseSubSerys,
    description: '用于选择子车系的组件，依赖于已选择的车系',
    mockDataDependencies: ['vehicle-model'],
    requiredProps: ['brandId', 'seryId'],
    defaultProps: {
      placeholder: '请选择子车系',
      brandId: 1,
      seryId: 3001
    },
    demoProps: {
      brandId: 1,
      seryId: 3001,
      placeholder: '选择子车系',
      onChange: (value: any) => console.log('选择的子车系:', value)
    },
    usage: '<ChooseSubSerys brandId={1} seryId={3001} placeholder="请选择子车系" onChange={(value) => console.log(value)} />'
  },

  'ChooseModelGroups': {
    name: 'ChooseModelGroups',
    displayName: '车型分组选择器',
    category: 'business',
    component: ChooseModelGroups,
    description: '用于选择车型分组的组件，如经济型、舒适型、豪华型等',
    mockDataDependencies: ['vehicle-model'],
    defaultProps: {
      placeholder: '请选择车型分组'
    },
    demoProps: {
      placeholder: '选择车型分组',
      onChange: (value: any) => console.log('选择的车型分组:', value)
    },
    usage: '<ChooseModelGroups placeholder="请选择车型分组" onChange={(value) => console.log(value)} />'
  },

  'ChooseModelsByStore': {
    name: 'ChooseModelsByStore',
    displayName: '门店车型选择器',
    category: 'business',
    component: ChooseModelsByStore,
    description: '根据门店筛选车型的选择器组件',
    mockDataDependencies: ['vehicle-model', 'store'],
    requiredProps: ['storeId'],
    defaultProps: {
      placeholder: '请选择车型',
      storeId: 1001
    },
    demoProps: {
      storeId: 1001,
      placeholder: '选择门店车型',
      onChange: (value: any) => console.log('选择的车型:', value)
    },
    usage: '<ChooseModelsByStore storeId={1001} placeholder="请选择车型" onChange={(value) => console.log(value)} />'
  },

  'ChooseModelsByStoreForStock': {
    name: 'ChooseModelsByStoreForStock',
    displayName: '库存车型选择器',
    category: 'business',
    component: ChooseModelsByStoreForStock,
    description: '用于库存管理的门店车型选择器',
    mockDataDependencies: ['vehicle-model', 'store', 'stock'],
    requiredProps: ['storeId'],
    defaultProps: {
      placeholder: '请选择车型',
      storeId: 1001
    },
    demoProps: {
      storeId: 1001,
      placeholder: '选择库存车型',
      onChange: (value: any) => console.log('选择的库存车型:', value)
    },
    usage: '<ChooseModelsByStoreForStock storeId={1001} placeholder="请选择车型" onChange={(value) => console.log(value)} />'
  },

  'ChooseLicenseTypes': {
    name: 'ChooseLicenseTypes',
    displayName: '牌照类型选择器',
    category: 'business',
    component: ChooseLicenseTypes,
    description: '用于选择车牌类型的组件，如京牌、沪牌等',
    mockDataDependencies: ['vehicle-model'],
    defaultProps: {
      placeholder: '请选择牌照类型'
    },
    demoProps: {
      placeholder: '选择牌照类型',
      onChange: (value: any) => console.log('选择的牌照类型:', value)
    },
    usage: '<ChooseLicenseTypes placeholder="请选择牌照类型" onChange={(value) => console.log(value)} />'
  },

  'ChooseLicenseTypesByName': {
    name: 'ChooseLicenseTypesByName',
    displayName: '按名称选择牌照类型',
    category: 'business',
    component: ChooseLicenseTypesByName,
    description: '通过名称匹配选择牌照类型的组件',
    mockDataDependencies: ['vehicle-model'],
    defaultProps: {
      placeholder: '请输入牌照类型名称'
    },
    demoProps: {
      placeholder: '输入牌照名称搜索',
      onChange: (value: any) => console.log('选择的牌照类型:', value)
    },
    usage: '<ChooseLicenseTypesByName placeholder="请输入名称" onChange={(value) => console.log(value)} />'
  },

  'ChooseStores': {
    name: 'ChooseStores',
    displayName: '门店选择器',
    category: 'business',
    component: ChooseStores,
    description: '用于选择门店，支持搜索、过滤功能',
    mockDataDependencies: ['store'],
    defaultProps: {
      placeholder: '请选择门店'
    },
    demoProps: {
      placeholder: '搜索或选择门店',
      onChange: (value: any) => console.log('选择的门店:', value)
    },
    usage: '<ChooseStores placeholder="请选择门店" onChange={(value) => console.log(value)} />'
  },

  'ChooseVehicles': {
    name: 'ChooseVehicles',
    displayName: '车辆选择器',
    category: 'business',
    component: ChooseVehicles,
    description: '用于选择车辆的组件，支持搜索过滤和单/多选模式',
    mockDataDependencies: ['vehicle'],
    defaultProps: {
      placeholder: '请选择车辆'
    },
    demoProps: {
      placeholder: '搜索车牌号或车辆ID',
      onChange: (value: any) => console.log('选择的车辆:', value),
      onVehiclesChange: (vehicles: any[]) => console.log(`加载了${vehicles.length}辆车`)
    },
    usage: '<ChooseVehicles placeholder="请选择车辆" onChange={(value) => console.log(value)} />'
  },

  'ChooseChannel': {
    name: 'ChooseChannel',
    displayName: '渠道选择器',
    category: 'business',
    component: ChooseChannel,
    description: '用于选择业务渠道的组件',
    mockDataDependencies: ['channel'],
    defaultProps: {
      placeholder: '请选择渠道'
    },
    demoProps: {
      placeholder: '选择业务渠道',
      onChange: (value: any) => console.log('选择的渠道:', value)
    },
    usage: '<ChooseChannel placeholder="请选择渠道" onChange={(value) => console.log(value)} />'
  },

  'ChooseMobilePrefix': {
    name: 'ChooseMobilePrefix',
    displayName: '手机前缀选择器',
    category: 'business',
    component: ChooseMobilePrefix,
    description: '用于选择手机号码国际区号前缀的组件',
    defaultProps: {
      value: '+86'
    },
    demoProps: {
      onChange: (value: string) => console.log('选择的区号:', value)
    },
    usage: '<ChooseMobilePrefix onChange={(value) => console.log(value)} />'
  },

  'EnumSelect': {
    name: 'EnumSelect',
    displayName: '枚举选择器',
    category: 'business',
    component: EnumSelect,
    description: '用于对枚举类型的数据进行选择',
    defaultProps: {
      source: { '选项1': 1, '选项2': 2, '选项3': 3 },
      placeholder: '请选择'
    },
    demoProps: {
      source: { '进行中': 'processing', '已完成': 'done', '已取消': 'cancelled' },
      placeholder: '选择状态',
      onChange: (value: any) => console.log('选择的枚举值:', value)
    },
    usage: '<EnumSelect source={{key1: "value1"}} placeholder="请选择" onChange={(value) => console.log(value)} />'
  },

  'NamesSelect': {
    name: 'NamesSelect',
    displayName: '多名称选择器',
    category: 'business',
    component: NamesSelect,
    description: '用于从一系列名称中进行选择的组件',
    defaultProps: {
      source: ['张三', '李四', '王五'],
      placeholder: '请选择姓名'
    },
    demoProps: {
      source: ['超级管理员', '运营专员', '客服代表', '财务专员'],
      placeholder: '选择角色',
      onChange: (value: any) => console.log('选择的角色:', value)
    },
    usage: '<NamesSelect source={["option1", "option2"]} placeholder="请选择" onChange={(value) => console.log(value)} />'
  },

  'Search': {
    name: 'Search',
    displayName: '业务搜索',
    category: 'business',
    component: Search,
    description: '业务搜索组件，用于车辆、订单、客户等业务数据搜索',
    defaultProps: {
      placeholder: '请输入搜索关键词'
    },
    demoProps: {
      placeholder: '搜索车辆、订单、客户...',
      onSearch: (value: string) => console.log('搜索:', value)
    },
    usage: '<Search placeholder="请输入关键词" onSearch={(value) => console.log(value)} />'
  },

  'Export': {
    name: 'Export',
    displayName: '数据导出',
    category: 'business',
    component: Export,
    description: '用于导出业务数据为文件的组件',
    defaultProps: {
      text: '导出数据',
      filename: '导出文件.xlsx',
      execute: async () => ({ success: true, data: new Blob(['示例数据'], { type: 'text/plain' }) })
    },
    demoProps: {
      text: '导出订单数据',
      filename: '订单列表.xlsx',
      execute: async () => ({ success: true, data: new Blob(['订单ID,客户姓名,金额\n1,张三,100'], { type: 'text/csv' }) })
    },
    usage: '<Export text="导出" filename="data.xlsx" execute={async () => ({success: true, data: blob})} />'
  },

  'Preview': {
    name: 'Preview',
    displayName: '文件预览',
    category: 'business',
    component: Preview,
    description: '用于预览车辆图片和视频的组件',
    defaultProps: {
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      width: 200,
      height: 150
    },
    demoProps: {
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      width: 160,
      height: 120
    },
    usage: '<Preview src="image-url" width={200} height={150} />'
  },

  'PayComponent': {
    name: 'PayComponent',
    displayName: '支付组件',
    category: 'business',
    component: PayComponent,
    description: '支付宝扫码支付组件，支持订单支付流程',
    mockDataDependencies: ['bill'],
    defaultProps: {
      isShow: false,
      type: 'order' as any,
      orderId: '12345',
      onPayFinsh: () => console.log('支付完成'),
      onPayCancel: () => console.log('取消支付')
    },
    usage: '<PayComponent isShow={true} type="order" orderId="12345" onPayFinsh={() => {}} onPayCancel={() => {}} />'
  },

  'Roles': {
    name: 'Roles',
    displayName: '角色管理',
    category: 'business',
    component: Roles,
    description: '用户角色管理组件，用于权限控制',
    defaultProps: {},
    usage: '<Roles />'
  }
};

// 获取组件配置
export function getComponentConfig(name: string): ComponentConfig | undefined {
  return ComponentRegistry[name];
}

// 获取所有组件名称
export function getAllComponentNames(): string[] {
  return Object.keys(ComponentRegistry);
}

// 按分类获取组件
export function getComponentsByCategory(category: 'basic' | 'business'): ComponentConfig[] {
  return Object.values(ComponentRegistry).filter(config => config.category === category);
}

// 搜索组件
export function searchComponents(keyword: string): ComponentConfig[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.values(ComponentRegistry).filter(config => 
    config.name.toLowerCase().includes(lowerKeyword) ||
    config.displayName.toLowerCase().includes(lowerKeyword) ||
    config.description.toLowerCase().includes(lowerKeyword)
  );
} 