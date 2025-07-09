/**
 * 组件工厂
 * 用于动态创建和渲染组件，支持AI调用
 */
import React, { useState, useEffect } from 'react';
import { Card, Alert, Space, Spin, Typography, Tag } from 'antd';
import { ComponentRegistry, getComponentConfig, type ComponentConfig } from './ComponentRegistry';

const { Text, Paragraph } = Typography;

// 组件渲染器属性
export interface ComponentFactoryProps {
  componentName: string;
  props?: Record<string, any>;
  showMeta?: boolean;
  showUsage?: boolean;
  title?: string;
  onError?: (error: Error) => void;
}

// 组件工厂主类
export const ComponentFactory: React.FC<ComponentFactoryProps> = ({
  componentName,
  props = {},
  showMeta = true,
  showUsage = false,
  title,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [componentConfig, setComponentConfig] = useState<ComponentConfig | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const config = getComponentConfig(componentName);
      if (!config) {
        throw new Error(`组件 "${componentName}" 未找到`);
      }
      setComponentConfig(config);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '未知错误';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
    } finally {
      setLoading(false);
    }
  }, [componentName, onError]);

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '10px' }}>正在加载组件...</div>
        </div>
      </Card>
    );
  }

  if (error || !componentConfig) {
    return (
      <Card>
        <Alert
          message="组件加载失败"
          description={error || '组件配置未找到'}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  // 合并默认属性和传入属性
  const finalProps = {
    ...componentConfig.defaultProps,
    ...componentConfig.demoProps,
    ...props
  };

  // 渲染组件
  const renderComponent = () => {
    try {
      const Component = componentConfig.component;
      return React.createElement(Component, finalProps);
    } catch (err) {
      console.error('组件渲染错误:', err);
      return (
        <Alert
          message="组件渲染失败"
          description={err instanceof Error ? err.message : '渲染过程中发生未知错误'}
          type="error"
          showIcon
        />
      );
    }
  };

  return (
    <Card
      title={
        <Space>
          <span>{title || componentConfig.displayName}</span>
          <Tag color={componentConfig.category === 'basic' ? 'blue' : 'green'}>
            {componentConfig.category === 'basic' ? '基础组件' : '业务组件'}
          </Tag>
        </Space>
      }
      extra={
        showMeta && (
          <Space>
            <Text type="secondary">{componentConfig.name}</Text>
          </Space>
        )
      }
    >
      {/* 组件描述 */}
      {showMeta && (
        <div style={{ marginBottom: '16px' }}>
          <Paragraph type="secondary" style={{ marginBottom: '8px' }}>
            {componentConfig.description}
          </Paragraph>
          {componentConfig.mockDataDependencies && (
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                依赖Mock数据: {componentConfig.mockDataDependencies.join(', ')}
              </Text>
            </div>
          )}
        </div>
      )}

      {/* 渲染组件实例 */}
      <div style={{ padding: '16px', border: '1px solid #f0f0f0', borderRadius: '4px', backgroundColor: '#fafafa' }}>
        {renderComponent()}
      </div>

      {/* 使用示例 */}
      {showUsage && (
        <div style={{ marginTop: '16px' }}>
          <Text strong>使用方式:</Text>
          <pre style={{ 
            background: '#f6f8fa', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px',
            overflow: 'auto',
            marginTop: '8px'
          }}>
            {componentConfig.usage}
          </pre>
        </div>
      )}

      {/* 当前属性 */}
      {showMeta && Object.keys(finalProps).length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Text strong>当前属性:</Text>
          <pre style={{ 
            background: '#f6f8fa', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px',
            overflow: 'auto',
            marginTop: '8px'
          }}>
            {JSON.stringify(finalProps, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
};

// 批量组件渲染器
export interface BatchComponentFactoryProps {
  components: Array<{
    name: string;
    props?: Record<string, any>;
    title?: string;
  }>;
  showMeta?: boolean;
  showUsage?: boolean;
  onError?: (componentName: string, error: Error) => void;
}

export const BatchComponentFactory: React.FC<BatchComponentFactoryProps> = ({
  components,
  showMeta = false,
  showUsage = false,
  onError
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {components.map((comp, index) => (
        <ComponentFactory
          key={`${comp.name}-${index}`}
          componentName={comp.name}
          props={comp.props}
          title={comp.title}
          showMeta={showMeta}
          showUsage={showUsage}
          onError={(error) => onError?.(comp.name, error)}
        />
      ))}
    </div>
  );
};

// 简化的组件调用函数（用于AI直接调用）
export function createComponent(
  componentName: string, 
  props: Record<string, any> = {},
  options: {
    showMeta?: boolean;
    showUsage?: boolean;
    title?: string;
  } = {}
): React.ReactElement {
  return React.createElement(ComponentFactory, {
    componentName,
    props,
    showMeta: options.showMeta,
    showUsage: options.showUsage,
    title: options.title
  });
}

// 快捷组件创建器（预设常用配置）
export const QuickComponentFactory = {
  // 基础展示（不显示元数据）
  simple: (componentName: string, props: Record<string, any> = {}) => 
    createComponent(componentName, props, { showMeta: false }),

  // 详细展示（显示所有信息）
  detailed: (componentName: string, props: Record<string, any> = {}) => 
    createComponent(componentName, props, { showMeta: true, showUsage: true }),

  // 演示模式（使用演示属性）
  demo: (componentName: string, extraProps: Record<string, any> = {}) => {
    const config = getComponentConfig(componentName);
    const demoProps = config?.demoProps || {};
    return createComponent(componentName, { ...demoProps, ...extraProps }, { showMeta: true });
  }
}; 