import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Layout, Menu, Tabs, Card, Typography, Button, Space, Tag, Empty, Form, Input, Select } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.less';
import './index.css';
import { setToken } from '@/lib/API'
import { loginByName } from '@/lib/data-source/auth'

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
  ChooseMobilePrefix
} from './components';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

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

  // 登录
  useEffect( () => {
    loginByName('sjz-admin', '123').then(res => {
      if (res.success) {
        setToken(res.data.token)
      }
    })
  }, [])

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
            <ChooseBrands />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取品牌数据，此组件可能显示为空
            </Text>
          </Card>
        );
      case 'chooseModels':
        return (
          <Card title="ChooseModels 车型选择器">
            <Paragraph>用于选择车型，支持搜索和过滤功能。</Paragraph>
            <ChooseModels />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取车型数据，此组件可能显示为空
            </Text>
          </Card>
        );
      case 'chooseStores':
        return (
          <Card title="ChooseStores 门店选择器">
            <Paragraph>用于选择门店，支持搜索、过滤功能，并可根据用户配置自动选择首个门店。</Paragraph>
            <ChooseStores />
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取门店数据，此组件可能显示为空
            </Text>
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
      case 'chooseSerys':
        return (
          <Card title="ChooseSerys 车系选择器">
            <Paragraph>用于选择车系的组件，支持按品牌筛选。</Paragraph>
            <div>
              <Button type="primary">选择车系</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取车系数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseSubSerys':
        return (
          <Card title="ChooseSubSerys 子车系选择器">
            <Paragraph>用于选择子车系的组件，依赖于已选择的车系。</Paragraph>
            <div>
              <Button type="primary">选择子车系</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取子车系数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseModelGroups':
        return (
          <Card title="ChooseModelGroups 车型分组选择器">
            <Paragraph>用于按分组选择车型的组件。</Paragraph>
            <div>
              <Button type="primary">选择车型分组</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取车型分组数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseModelsByStore':
        return (
          <Card title="ChooseModelsByStore 按门店选择车型">
            <Paragraph>根据门店筛选可选车型的组件。</Paragraph>
            <div>
              <Button type="primary">按门店选择车型</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取门店和车型数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseModelsByStoreForStock':
        return (
          <Card title="ChooseModelsByStoreForStock 按门店库存选择车型">
            <Paragraph>根据门店库存筛选可选车型的组件。</Paragraph>
            <div>
              <Button type="primary">按门店库存选择车型</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取门店库存数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseLicenseTypes':
        return (
          <Card title="ChooseLicenseTypes 牌照类型选择器">
            <Paragraph>用于选择牌照类型的组件。</Paragraph>
            <div>
              <Button type="primary">选择牌照类型</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取牌照类型数据，此组件仅作示意展示
            </Text>
          </Card>
        );
      case 'chooseLicenseTypesByName':
        return (
          <Card title="ChooseLicenseTypesByName 按名称选择牌照类型">
            <Paragraph>根据名称筛选牌照类型的组件。</Paragraph>
            <div>
              <Button type="primary">按名称选择牌照类型</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取牌照类型数据，此组件仅作示意展示
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
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  基础的车辆选择器，支持按ID或车牌号搜索
                </Text>
              </TabPane>
              <TabPane tab="多选模式" key="2">
                <ChooseVehicles 
                  multiple
                  placeholder="请选择多个车辆"
                />
                <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
                  多选模式，可同时选择多辆车
                </Text>
              </TabPane>
            </Tabs>
            <div style={{ marginTop: '10px' }}>
              <Text type="secondary">
                注意：由于当前环境无法获取车辆数据，此组件可能显示为空
              </Text>
            </div>
          </Card>
        );
      case 'chooseChannel':
        return (
          <Card title="ChooseChannel 渠道选择器">
            <Paragraph>用于选择业务渠道的组件。</Paragraph>
            <div>
              <Button type="primary">选择渠道</Button>
            </div>
            <Text type="secondary" style={{ marginTop: '10px', display: 'block' }}>
              注意：由于当前环境无法获取渠道数据，此组件仅作示意展示
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
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">擎路组件库</div>
        </Header>
        <Layout>
          <Sider width={240} className="site-layout-background">
            <div className="search-container">
              <input 
                className="component-search" 
                placeholder="搜索组件..." 
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <Menu
              mode="inline"
              selectedKeys={[selectedComponent]}
              defaultOpenKeys={[selectedCategory]}
              style={{ height: 'calc(100% - 50px)', borderRight: 0, overflowY: 'auto' }}
              onSelect={({ key }) => setSelectedComponent(key as string)}
            >
              {filteredComponents.map(category => (
                <Menu.SubMenu key={category.key} title={category.title}>
                  {category.components.map(component => (
                    <Menu.Item key={component.key}>{component.name}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content className="site-layout-content">
              <div className="component-header">
                <div>
                  <Title level={2}>{
                    componentCategories
                      .flatMap(category => category.components)
                      .find(comp => comp.key === selectedComponent)?.name || '组件预览'
                  }</Title>
                  <Paragraph>
                    {
                      componentCategories
                        .flatMap(category => category.components)
                        .find(comp => comp.key === selectedComponent)?.desc || '选择左侧菜单查看组件详情'
                    }
                  </Paragraph>
                </div>
                <Space>
                  <Button type="link" 
                    onClick={() => window.open(`https://github.com/yourusername/qinglu-ant/tree/main/src/components/${selectedComponent}`, '_blank')}
                  >
                    查看源码
                  </Button>
                  <Button type="link" 
                    onClick={() => window.open(`https://github.com/yourusername/qinglu-ant/tree/main/src/components/${selectedComponent}/README.md`, '_blank')}
                  >
                    查看文档
                  </Button>
                </Space>
              </div>
              {renderComponentDemo()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
