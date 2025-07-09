/**
 * 组件展示页面
 * 用于AI调用和演示所有组件
 */
import React, { useState, useMemo } from 'react';
import { Layout, Menu, Card, Input, Space, Button, Typography, Tabs, Alert, Divider } from 'antd';
import { ComponentFactory } from './ComponentFactory';
import { ComponentRegistry, getAllComponentNames, getComponentsByCategory, searchComponents } from './ComponentRegistry';
import { callComponent, type AIComponentResponse } from './AICallAPI';
import { SearchOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 主展示组件
export const ComponentShowcase: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('ChooseBrands');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('demo');

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!searchKeyword.trim()) return [];
    return searchComponents(searchKeyword);
  }, [searchKeyword]);

  // 分类组件
  const basicComponents = useMemo(() => getComponentsByCategory('basic'), []);
  const businessComponents = useMemo(() => getComponentsByCategory('business'), []);

  // 渲染组件菜单
  const renderComponentMenu = () => {
    const menuItems = [
      {
        key: 'basic',
        label: '基础组件',
        icon: <SettingOutlined />,
        children: basicComponents.map(config => ({
          key: config.name,
          label: config.displayName
        }))
      },
      {
        key: 'business',
        label: '业务组件',
        icon: <AppstoreOutlined />,
        children: businessComponents.map(config => ({
          key: config.name,
          label: config.displayName
        }))
      }
    ];

    return (
      <Menu
        mode="inline"
        selectedKeys={[selectedComponent]}
        style={{ height: '100%', borderRight: 0 }}
        onSelect={({ key }) => setSelectedComponent(key)}
        items={menuItems}
      />
    );
  };

  // 渲染搜索结果
  const renderSearchResults = () => {
    if (!searchKeyword.trim()) return null;

    return (
      <Card title={`搜索结果 (${searchResults.length})`} style={{ marginBottom: '16px' }}>
        {searchResults.length === 0 ? (
          <Text type="secondary">未找到匹配的组件</Text>
        ) : (
          <Space wrap>
            {searchResults.map(config => (
              <Button
                key={config.name}
                type={selectedComponent === config.name ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedComponent(config.name)}
              >
                {config.displayName}
              </Button>
            ))}
          </Space>
        )}
      </Card>
    );
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={4} style={{ margin: 0, marginRight: '24px' }}>
          🚀 AI组件展示平台
        </Title>
        <Search
          placeholder="搜索组件..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
      </Header>
      
      <Layout>
        <Sider width={280} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px' }}>
            <Text strong>组件列表 ({getAllComponentNames().length})</Text>
          </div>
          {renderComponentMenu()}
        </Sider>
        
        <Content style={{ padding: '24px', background: '#f5f5f5', overflow: 'auto' }}>
          {renderSearchResults()}
          
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="🎯 组件演示" key="demo">
                <ComponentFactory
                  componentName={selectedComponent}
                  showMeta={true}
                  showUsage={false}
                />
              </TabPane>
              
              <TabPane tab="📖 使用文档" key="docs">
                <ComponentFactory
                  componentName={selectedComponent}
                  showMeta={true}
                  showUsage={true}
                />
              </TabPane>
              
              <TabPane tab="🤖 AI调用示例" key="ai">
                <AICallExample componentName={selectedComponent} />
              </TabPane>
            </Tabs>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

// AI调用示例
const AICallExample: React.FC<{ componentName: string }> = ({ componentName }) => {
  const [result, setResult] = useState<AIComponentResponse | null>(null);

  const handleTestCall = () => {
    const response = callComponent({
      componentName,
      showMeta: true,
      showUsage: false,
      title: `AI调用: ${componentName}`
    });
    setResult(response);
  };

  const config = ComponentRegistry[componentName];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="AI组件调用API"
        description="通过编程方式调用组件，支持动态参数传递和属性配置"
        type="info"
        showIcon
      />
      
      <Card title="调用示例代码" size="small">
        <pre style={{ background: '#f6f8fa', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`// 基础调用
import { callComponent } from '@/components/ComponentShowcase';

const response = callComponent({
  componentName: '${componentName}',
  props: ${JSON.stringify(config?.demoProps || {}, null, 2)},
  showMeta: true,
  showUsage: false,
  title: '自定义标题'
});

// 获取组件信息
import { getComponentInfo } from '@/components/ComponentShowcase';

const info = getComponentInfo('${componentName}');
console.log(info);`}
        </pre>
      </Card>

      <Button type="primary" onClick={handleTestCall}>
        🧪 测试AI调用
      </Button>

      {result && (
        <Card title="调用结果" size="small">
          {result.success ? (
            <div>
              <Alert message="调用成功" type="success" showIcon style={{ marginBottom: '16px' }} />
              <Divider orientation="left">组件配置</Divider>
              <pre style={{ background: '#f6f8fa', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
                {JSON.stringify(result.componentConfig, null, 2)}
              </pre>
              <Divider orientation="left">渲染结果</Divider>
              {result.component}
            </div>
          ) : (
            <Alert message="调用失败" description={result.error} type="error" showIcon />
          )}
        </Card>
      )}
    </Space>
  );
};

export default ComponentShowcase; 