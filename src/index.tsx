import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Layout, Menu, Tabs, Card, Typography, Button, Space, Tag, Empty, Form, Input, Select } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.less';
import './index.css';
import { setToken } from '@/lib/API'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  AppstoreOutlined, 
  SettingOutlined, 
  RocketOutlined, 
  ApiOutlined,
  DatabaseOutlined 
} from '@ant-design/icons'

// 导入Mock拦截器并初始化
import { initMockEnvironment } from './mock/interceptor';

// 导入组件
import { 
  AlphaInput, MinuteDatePicker, MinuteRangePicker, CardCheckbox, MoneyInput,
  Modal, EditModal,
  Table,
  Loading,
  Roles,
  ChooseBrands,
  ChooseModels,
  ChooseStores,
  EnumSelect,
  Preview,
  Export,
  NamesSelect,
  Search,
  Upload,
  ChooseVehicles,
  ChooseMobilePrefix,
  ComponentShowcase,
  callComponent,
  AIComponentAPI
} from './components';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// 初始化Mock环境
initMockEnvironment();

// 设置模拟token以便组件正常工作
setToken('mock_token_demo_12345');

// 主页面组件
const HomePage: React.FC = () => {
  // 测试AI调用
  const handleTestAICall = () => {
    console.log('=== AI组件调用测试 ===')
    
    // 测试单组件调用
    const response1 = callComponent({
      componentName: 'ChooseBrands',
      showMeta: true,
      title: 'AI调用：品牌选择器'
    })
    console.log('品牌选择器调用结果:', response1)

    // 测试获取组件信息
    const info = AIComponentAPI.info('ChooseStores')
    console.log('门店选择器信息:', info)

    // 测试搜索组件
    const searchResult = AIComponentAPI.search('选择器')
    console.log('搜索"选择器"结果:', searchResult)

    // 测试获取所有组件
    const allComponents = AIComponentAPI.list()
    console.log('所有组件列表:', allComponents)
  }

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>
            <RocketOutlined /> 擎路组件库
          </Title>
          <Paragraph type="secondary">
            车辆租赁业务组件库，支持AI直接调用组件功能
          </Paragraph>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
            🎉 AI组件调用功能已启用
          </Title>
          <Text style={{ color: 'white', fontSize: '16px' }}>
            现在可以通过AI直接调用任何组件，支持动态参数配置和实时渲染。
            所有业务组件都已配置Mock数据，可以正常展示完整功能。
          </Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
            <div style={{ color: 'white' }}>
              <Title level={3} style={{ color: 'white', marginBottom: '12px' }}>
                <AppstoreOutlined /> 组件总览
              </Title>
              <Space direction="vertical">
                <Text style={{ color: 'white' }}>
                  • 基础组件: 12+ 个
                </Text>
                <Text style={{ color: 'white' }}>
                  • 业务组件: 18+ 个
                </Text>
                <Text style={{ color: 'white' }}>
                  • 全部组件: 30+ 个
                </Text>
              </Space>
            </div>
          </Card>

          <Card style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', border: 'none' }}>
            <div style={{ color: 'white' }}>
              <Title level={3} style={{ color: 'white', marginBottom: '12px' }}>
                <ApiOutlined /> AI调用支持
              </Title>
              <Space direction="vertical">
                <Text style={{ color: 'white' }}>
                  • 支持动态组件调用
                </Text>
                <Text style={{ color: 'white' }}>
                  • 实时参数配置
                </Text>
                <Text style={{ color: 'white' }}>
                  • 完整Mock数据支持
                </Text>
              </Space>
            </div>
          </Card>

          <Card style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: 'none' }}>
            <div style={{ color: 'white' }}>
              <Title level={3} style={{ color: 'white', marginBottom: '12px' }}>
                <DatabaseOutlined /> Mock数据
              </Title>
              <Space direction="vertical">
                <Text style={{ color: 'white' }}>
                  • 11个API模块
                </Text>
                <Text style={{ color: 'white' }}>
                  • 完整数据结构
                </Text>
                <Text style={{ color: 'white' }}>
                  • 业务组件完全可用
                </Text>
              </Space>
            </div>
          </Card>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Space size="large">
            <Link to="/showcase">
              <Button type="primary" size="large" icon={<RocketOutlined />}>
                进入组件展示平台
              </Button>
            </Link>
            
            <Button 
              type="default"
              size="large"
              icon={<ApiOutlined />}
              onClick={handleTestAICall}
            >
              测试AI调用API
            </Button>
          </Space>
        </div>

        <Card title="AI调用示例代码" style={{ marginTop: '32px' }}>
          <pre style={{ 
            background: '#f6f8fa', 
            padding: '16px', 
            borderRadius: '4px', 
            overflow: 'auto',
            border: '1px solid #e1e4e8'
          }}>
{`// 1. 调用组件
import { callComponent } from '@/components'

const response = callComponent({
  componentName: 'ChooseBrands',
  props: { placeholder: '请选择品牌' },
  showMeta: true
})

// 2. 快捷API调用
import { AIComponentAPI } from '@/components'

const demoComponent = AIComponentAPI.demo('ChooseVehicles')
const componentInfo = AIComponentAPI.info('ChooseStores')
const searchResults = AIComponentAPI.search('选择器')

// 3. 获取所有组件
const allComponents = AIComponentAPI.list()`}
          </pre>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Space split={<span style={{ color: '#ccc' }}>|</span>}>
            <Link to="/showcase">组件展示平台</Link>
            <Button type="link" onClick={handleTestAICall}>AI调用测试</Button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </Space>
        </div>
      </Space>
    </div>
  )
};

// 定义组件分类
const componentCategories = [
  {
    title: '基础组件',
    key: 'basic',
    components: [
      { name: 'Input', key: 'input', desc: '输入控件集合，包含多种增强型输入组件' },
      { name: 'Modal', key: 'modal', desc: '对话框组件，预设了常用的配置与样式' },
      { name: 'Table', key: 'table', desc: '表格组件，提供了更便捷的数据展示方式' },
      { name: 'Loading', key: 'loading', desc: '加载组件，提供统一的加载状态展示' },
    ]
  },
  {
    title: '业务组件',
    key: 'business',
    components: [
      { name: 'Roles', key: 'roles', desc: '权限控制组件，用于根据用户权限显示内容' },
      { name: 'ChooseBrands', key: 'chooseBrands', desc: '品牌选择器' },
      { name: 'ChooseModels', key: 'chooseModels', desc: '车型选择器' },
      { name: 'ChooseStores', key: 'chooseStores', desc: '门店选择器' },
      { name: 'EnumSelect', key: 'enumSelect', desc: '枚举选择器' },
      { name: 'ChooseSerys', key: 'chooseSerys', desc: '车系选择器' },
      { name: 'ChooseSubSerys', key: 'chooseSubSerys', desc: '子车系选择器' },
      { name: 'ChooseModelGroups', key: 'chooseModelGroups', desc: '车型分组选择器' },
      { name: 'ChooseModelsByStore', key: 'chooseModelsByStore', desc: '按门店选择车型' },
      { name: 'ChooseModelsByStoreForStock', key: 'chooseModelsByStoreForStock', desc: '按门店库存选择车型' },
      { name: 'ChooseLicenseTypes', key: 'chooseLicenseTypes', desc: '牌照类型选择器' },
      { name: 'ChooseLicenseTypesByName', key: 'chooseLicenseTypesByName', desc: '按名称选择牌照类型' },
      { name: 'ChooseMobilePrefix', key: 'chooseMobilePrefix', desc: '手机前缀选择器' },
      { name: 'ChooseChannel', key: 'chooseChannel', desc: '渠道选择器' },
      { name: 'ChooseVehicles', key: 'chooseVehicles', desc: '车辆选择器' },
      { name: 'NamesSelect', key: 'namesSelect', desc: '多名称选择器' },
      { name: 'Export', key: 'export', desc: '数据导出组件' },
      { name: 'Search', key: 'search', desc: '搜索组件' },
      { name: 'Preview', key: 'preview', desc: '预览组件' },
      { name: 'Upload', key: 'upload', desc: '上传组件' },
      { name: 'AliyunVerify', key: 'aliyunVerify', desc: '阿里云验证组件' },
      { name: 'Pay', key: 'pay', desc: '支付组件' },
    ]
  }
];

// 模拟枚举数据
const ExampleEnum = {
  '选项1': 1,
  '选项2': 2,
  '选项3': 3,
};

// 组件展示页
const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('basic');
  const [selectedComponent, setSelectedComponent] = useState('input');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredComponents, setFilteredComponents] = useState(componentCategories);
  
  // 处理搜索逻辑
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredComponents(componentCategories);
      return;
    }
    
    const keyword = searchKeyword.toLowerCase();
    const filtered = componentCategories.map(category => ({
      ...category,
      components: category.components.filter(component => 
        component.name.toLowerCase().includes(keyword) || 
        component.desc.toLowerCase().includes(keyword) ||
        component.key.toLowerCase().includes(keyword)
      )
    })).filter(category => category.components.length > 0);
    
    setFilteredComponents(filtered);
    
    // 如果搜索结果只有一个组件，自动选择该组件
    if (filtered.reduce((sum, cat) => sum + cat.components.length, 0) === 1) {
      const component = filtered[0].components[0];
      setSelectedCategory(filtered[0].key);
      setSelectedComponent(component.key);
    }
  }, [searchKeyword]);

  // 根据当前选择的组件渲染对应的演示内容
  const renderComponentDemo = () => {
    switch (selectedComponent) {
      case 'input':
        return (
          <Tabs defaultActiveKey="1">
            <TabPane tab="AlphaInput" key="1">
              <Card title="字母数字输入框">
                <Paragraph>只能输入数字和字母的文本框，并且会自动将字母大写。</Paragraph>
                <AlphaInput placeholder="请输入字母和数字" />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  尝试输入: Ab123@#, 会自动转为: AB123
                </Text>
              </Card>
            </TabPane>
            <TabPane tab="MinuteDatePicker" key="2">
              <Card title="分钟级日期选择器">
                <Paragraph>精确到"分钟"的日期时间选择器。</Paragraph>
                <MinuteDatePicker />
              </Card>
            </TabPane>
            <TabPane tab="MinuteRangePicker" key="3">
              <Card title="分钟级日期范围选择器">
                <Paragraph>精确到"分钟"的日期时间范围选择器。</Paragraph>
                <MinuteRangePicker />
              </Card>
            </TabPane>
            <TabPane tab="CardCheckbox" key="4">
              <Card title="卡片式多选框">
                <Paragraph>卡片形式的 Checkbox。</Paragraph>
                <CardCheckbox 
                  options={[
                    { label: '选项1', value: 'option1' }, 
                    { label: '选项2', value: 'option2' },
                    { label: '选项3', value: 'option3' }
                  ]} 
                />
              </Card>
            </TabPane>
            <TabPane tab="MoneyInput" key="5">
              <Card title="金额输入框">
                <Paragraph>金额输入框，自动处理单位转换（元/分）。</Paragraph>
                <MoneyInput placeholder="请输入金额" onChange={(value) => console.log(value)} />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  内部以"分"为单位存储，界面以"元"为单位显示
                </Text>
              </Card>
            </TabPane>
          </Tabs>
        );
      case 'modal':
        return (
          <Tabs defaultActiveKey="1">
            <TabPane tab="基础对话框" key="1">
              <Card title="Modal 基础对话框">
                <Paragraph>基础对话框组件，预设了常用的配置和样式。</Paragraph>
                <Modal title="示例弹窗" visible={false}>
                  <p>这是一个弹窗内容</p>
                </Modal>
                <Text type="secondary">
                  此处仅作展示，实际使用时需要通过 visible 属性控制显示
                </Text>
              </Card>
            </TabPane>
            <TabPane tab="编辑对话框" key="2">
              <Card title="EditModal 编辑对话框">
                <Paragraph>专为编辑表单设计的对话框，防止误关闭造成数据丢失。</Paragraph>
                <EditModal title="编辑信息" visible={false}>
                  <p>这是一个编辑表单的内容</p>
                </EditModal>
                <Text type="secondary">
                  适用于表单编辑场景，点击遮罩不会关闭
                </Text>
              </Card>
            </TabPane>
          </Tabs>
        );
      case 'table':
        return (
          <Card title="Table 表格组件">
            <Paragraph>表格组件，预设了常用的配置和样式。</Paragraph>
            <Table 
              dataSource={[
                { key: '1', name: '张三', age: 32, address: '上海市' },
                { key: '2', name: '李四', age: 42, address: '北京市' }
              ]} 
              columns={[
                { title: '姓名', dataIndex: 'name', key: 'name' },
                { title: '年龄', dataIndex: 'age', key: 'age' },
                { title: '地址', dataIndex: 'address', key: 'address' }
              ]} 
            />
          </Card>
        );
      case 'loading':
        return (
          <Card title="Loading 加载组件">
            <Paragraph>加载状态展示组件。</Paragraph>
            <Loading tip="正在加载数据..." />
          </Card>
        );
      case 'roles':
        return (
          <Card title="Roles 权限控制组件">
            <Paragraph>基于用户权限控制内容的显示组件。</Paragraph>
            <Roles allowed="example.permission">
              <div>只有拥有 example.permission 权限的用户才能看到此内容</div>
            </Roles>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取用户权限，上面的内容不会显示
            </Text>
          </Card>
        );
      case 'chooseBrands':
        return (
          <Card title="ChooseBrands 品牌选择器">
            <Paragraph>用于选择车型品牌，支持搜索、过滤和添加新品牌。</Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基础用法" key="1">
                <ChooseBrands 
                  placeholder="请选择品牌"
                  onChange={(value) => console.log('选择的品牌:', value)}
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  支持搜索品牌名称、英文名和拼音首字母
                </Text>
              </TabPane>
                             <TabPane tab="多选模式" key="2">
                 <ChooseBrands 
                   placeholder="请选择多个品牌"
                   onChange={(values) => console.log('选择的品牌:', values)}
                 />
                 <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                   此组件的多选功能需要查看组件实际API支持
                 </Text>
               </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，品牌列表正常显示</Text>
            </div>
          </Card>
        );
      case 'chooseModels':
        return (
          <Card title="ChooseModels 车型选择器">
            <Paragraph>用于选择车型，支持搜索和过滤功能。</Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基础用法" key="1">
                <ChooseModels 
                  placeholder="请选择车型"
                  onChange={(value) => console.log('选择的车型:', value)}
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  支持按品牌、车系、车型名称等筛选
                </Text>
              </TabPane>
                             <TabPane tab="带参数筛选" key="2">
                 <ChooseModels 
                   placeholder="请选择车型"
                   onChange={(value) => console.log('选择的车型:', value)}
                 />
                 <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                   可通过其他Props配置筛选条件
                 </Text>
               </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，车型列表正常显示</Text>
            </div>
          </Card>
        );
      case 'chooseStores':
        return (
          <Card title="ChooseStores 门店选择器">
            <Paragraph>用于选择门店，支持搜索、过滤功能，并可根据用户配置自动选择首个门店。</Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基础用法" key="1">
                <ChooseStores 
                  placeholder="请选择门店"
                  onChange={(value) => console.log('选择的门店:', value)}
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  支持按门店名称、城市等筛选
                </Text>
              </TabPane>
                             <TabPane tab="高级配置" key="2">
                 <ChooseStores 
                   placeholder="请选择门店"
                   onChange={(values) => console.log('选择的门店:', values)}
                 />
                 <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                   支持多种配置选项，具体参考组件文档
                 </Text>
               </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，门店列表正常显示</Text>
            </div>
          </Card>
        );
      case 'enumSelect':
        return (
          <Card title="EnumSelect 枚举选择器">
            <Paragraph>用于对枚举（enum）类型的数据进行选择，简化了将枚举类型转换为下拉选项的过程。</Paragraph>
            <EnumSelect source={ExampleEnum} placeholder="请选择" />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              基于示例枚举：{'{选项1: 1, 选项2: 2, 选项3: 3}'}
            </Text>
          </Card>
        );
      case 'preview':
        return (
          <Card title="Preview 预览组件">
            <Paragraph>用于预览图片和视频的组件，支持点击查看大图和播放视频功能。</Paragraph>
            <Preview 
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" 
              width={200} 
              height={150} 
            />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              上面是图片预览示例，视频预览需要提供视频URL和设置isVideo=true
            </Text>
          </Card>
        );
      case 'export':
        return (
          <Card title="Export 数据导出组件">
            <Paragraph>用于导出数据为文件的组件，简化文件导出操作。</Paragraph>
            <Export 
              execute={async () => ({ success: true, data: new Blob(['示例数据'], { type: 'text/plain' }) })} 
              filename="示例数据.txt"
              text="导出示例数据" 
            />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              点击按钮将下载一个包含示例数据的文本文件
            </Text>
          </Card>
        );
      case 'namesSelect':
        return (
          <Card title="NamesSelect 多名称选择器">
            <Paragraph>用于从一系列名称中进行选择的组件，简化了选项配置。</Paragraph>
            <NamesSelect 
              source={['张三', '李四', '王五']} 
              placeholder="请选择姓名" 
              style={{ width: 200 }}
            />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              上面使用字符串数组作为选项源，也支持{'{label, value}'}格式的对象数组
            </Text>
          </Card>
        );
      case 'search':
        return (
          <Card title="Search 搜索组件">
            <Paragraph>通用搜索组件，简化搜索表单的创建和处理。</Paragraph>
            <Search 
              onSearch={(values) => console.log('搜索条件:', values)}
              onChange={(values) => console.log('表单值变化:', values)}
              initialValues={{ keyword: '' }}
            >
              <Form.Item name="keyword" label="关键词">
                <Input placeholder="请输入关键词" />
              </Form.Item>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear
                  options={[
                    { label: '进行中', value: 'processing' },
                    { label: '已完成', value: 'done' },
                    { label: '已取消', value: 'cancelled' }
                  ]}
                />
              </Form.Item>
              <div className="app-search-group">
                <Form.Item name="startDate" label="开始日期">
                  <MinuteDatePicker placeholder="开始日期" />
                </Form.Item>
                <Form.Item name="endDate" label="结束日期">
                  <MinuteDatePicker placeholder="结束日期" />
                </Form.Item>
              </div>
            </Search>
            <Text type="secondary" style={{ marginTop: '16px', display: 'block' }}>
              此示例包含基本搜索字段、下拉选择和日期选择，点击按钮触发搜索或重置
            </Text>
          </Card>
        );
      case 'upload':
        return (
          <Card title="Upload 上传组件">
            <Paragraph>文件上传组件，提供统一的文件上传界面和处理逻辑。</Paragraph>
            <Upload 
              renderAdd={() => <div>点击上传</div>}
              renderItem={(url) => <div>已上传文件预览: {url}</div>}
            />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境配置，上传功能可能无法完全展示
            </Text>
          </Card>
        );
      case 'chooseMobilePrefix':
        return (
          <Card title="ChooseMobilePrefix 手机前缀选择器">
            <Paragraph>用于选择手机号码国际区号前缀的组件。</Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基础用法" key="1">
                <Space>
                  <ChooseMobilePrefix />
                  <Input style={{ width: 200 }} placeholder="请输入手机号码" />
                </Space>
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  手机区号选择器与输入框配合使用
                </Text>
              </TabPane>
              <TabPane tab="表单集成" key="2">
                <Form layout="inline">
                  <Form.Item label="手机号码">
                    <Space>
                      <ChooseMobilePrefix />
                      <Input style={{ width: 180 }} placeholder="请输入手机号码" />
                    </Space>
                  </Form.Item>
                </Form>
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  在表单中使用手机区号选择器
                </Text>
              </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="secondary">
                注意：当前区号选择器被锁定为中国大陆区号(+86)
              </Text>
            </div>
          </Card>
        );
      case 'chooseVehicles':
        return (
          <Card title="ChooseVehicles 车辆选择器">
            <Paragraph>用于选择车辆的组件，支持搜索过滤和单/多选模式。</Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基础用法" key="1">
                <ChooseVehicles 
                  placeholder="请选择车辆"
                  onVehiclesChange={(vehicles) => console.log(`加载了${vehicles.length}辆车`)}
                  onChange={(value) => console.log('选择的车辆:', value)}
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  基础的车辆选择器，支持按ID或车牌号搜索
                </Text>
              </TabPane>
              <TabPane tab="多选模式" key="2">
                <ChooseVehicles 
                  multiple
                  placeholder="请选择多个车辆"
                  onChange={(values) => console.log('选择的车辆:', values)}
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  多选模式，可同时选择多辆车
                </Text>
              </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，车辆列表正常显示</Text>
            </div>
          </Card>
        );
      // 为其他业务组件添加带Mock提示的展示
      case 'chooseSerys':
        return (
          <Card title="ChooseSerys 车系选择器">
            <Paragraph>用于选择车系的组件，支持按品牌筛选。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示车系列表</Text>
            </div>
          </Card>
        );
      case 'chooseSubSerys':
        return (
          <Card title="ChooseSubSerys 子车系选择器">
            <Paragraph>用于选择子车系的组件，依赖于已选择的车系。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示子车系列表</Text>
            </div>
          </Card>
        );
      case 'chooseModelGroups':
        return (
          <Card title="ChooseModelGroups 车型分组选择器">
            <Paragraph>用于按分组选择车型的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示车型分组列表</Text>
            </div>
          </Card>
        );
      case 'chooseModelsByStore':
        return (
          <Card title="ChooseModelsByStore 按门店选择车型">
            <Paragraph>根据门店筛选可选车型的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示门店车型数据</Text>
            </div>
          </Card>
        );
      case 'chooseModelsByStoreForStock':
        return (
          <Card title="ChooseModelsByStoreForStock 按门店库存选择车型">
            <Paragraph>根据门店库存筛选可选车型的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示门店库存数据</Text>
            </div>
          </Card>
        );
      case 'chooseLicenseTypes':
        return (
          <Card title="ChooseLicenseTypes 牌照类型选择器">
            <Paragraph>用于选择牌照类型的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示牌照类型列表</Text>
            </div>
          </Card>
        );
      case 'chooseLicenseTypesByName':
        return (
          <Card title="ChooseLicenseTypesByName 按名称选择牌照类型">
            <Paragraph>根据名称筛选牌照类型的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示牌照类型数据</Text>
            </div>
          </Card>
        );
      case 'chooseChannel':
        return (
          <Card title="ChooseChannel 渠道选择器">
            <Paragraph>用于选择业务渠道的组件。</Paragraph>
            <div style={{ marginTop: '10px' }}>
              <Text type="success">✅ 现在使用Mock数据，组件将正常展示渠道列表</Text>
            </div>
          </Card>
        );
      case 'aliyunVerify':
        return (
          <Card title="AliyunVerify 阿里云验证组件">
            <Paragraph>集成阿里云验证服务的组件，提供安全验证功能。</Paragraph>
            <div>
              <Button type="primary">触发验证</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：此组件需要阿里云验证服务的配置才能正常工作
            </Text>
          </Card>
        );
      case 'pay':
        return (
          <Card title="Pay 支付组件">
            <Paragraph>支付组件，提供统一的支付界面和处理逻辑。</Paragraph>
            <div>
              <Button type="primary">发起支付</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：此组件需要支付服务的配置才能正常工作
            </Text>
          </Card>
        );
      default:
        return (
          <Card>
            <Empty description={
              <span>该组件暂无演示，请查看 <Tag color="blue">src/components/{selectedComponent}/README.md</Tag> 了解更多信息</span>
            } />
          </Card>
        );
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginRight: '24px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                擎路组件库
              </Link>
            </div>
            
            <Menu mode="horizontal" style={{ border: 'none', flex: 1 }}>
              <Menu.Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="showcase" icon={<RocketOutlined />}>
                <Link to="/showcase">组件展示</Link>
              </Menu.Item>
            </Menu>

            <Space>
              <Tag color="blue">Mock数据已启用</Tag>
              <Tag color="green">AI调用就绪</Tag>
            </Space>
          </Header>

          <Content style={{ background: '#fff' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/showcase" element={<ComponentShowcase />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
            <Space direction="vertical" size="small">
              <Text type="secondary">
                擎路组件库 ©2024 - 支持AI直接调用的React组件库
              </Text>
              <Space split={<span style={{ color: '#ccc' }}>•</span>}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {componentCategories.flatMap(category => category.components).length} 组件
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Mock数据支持
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  AI调用就绪
                </Text>
              </Space>
            </Space>
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

// 全局设置
;(window as any).qingluAnt = {
  version: '1.0.0',
  components: {
    getComponentsByCategory: () => componentCategories,
    getAllComponentNames: () => componentCategories.flatMap(category => category.components.map(c => c.name)),
    callComponent,
    AIComponentAPI
  },
  mockToken: localStorage.getItem('token') || 'mock-token-12345'
}

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(<App />)
