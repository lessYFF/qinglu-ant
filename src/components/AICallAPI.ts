/**
 * AI组件调用API
 * 提供给AI系统使用的组件调用接口
 */
import React from 'react';
import { createComponent } from './ComponentFactory';
import { ComponentRegistry, getAllComponentNames } from './ComponentRegistry';

// AI组件调用请求
export interface AIComponentRequest {
  componentName: string;
  props?: Record<string, any>;
  showMeta?: boolean;
  showUsage?: boolean;
  title?: string;
}

// AI组件调用响应
export interface AIComponentResponse {
  success: boolean;
  component?: React.ReactElement;
  error?: string;
  componentConfig?: any;
}

// AI组件调用接口
export function callComponent(request: AIComponentRequest): AIComponentResponse {
  try {
    const { componentName, props = {}, showMeta = true, showUsage = false, title } = request;
    
    // 验证组件是否存在
    if (!ComponentRegistry[componentName]) {
      return {
        success: false,
        error: `组件 "${componentName}" 不存在。可用组件: ${getAllComponentNames().join(', ')}`
      };
    }

    // 创建组件
    const component = createComponent(componentName, props, { showMeta, showUsage, title });
    const componentConfig = ComponentRegistry[componentName];

    return {
      success: true,
      component,
      componentConfig: {
        name: componentConfig.name,
        displayName: componentConfig.displayName,
        category: componentConfig.category,
        description: componentConfig.description,
        usage: componentConfig.usage
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

// 批量组件调用
export function callMultipleComponents(requests: AIComponentRequest[]): AIComponentResponse[] {
  return requests.map(request => callComponent(request));
}

// 获取组件信息（不渲染）
export function getComponentInfo(componentName: string) {
  const config = ComponentRegistry[componentName];
  if (!config) {
    return { success: false, error: `组件 "${componentName}" 不存在` };
  }

  return {
    success: true,
    info: {
      name: config.name,
      displayName: config.displayName,
      category: config.category,
      description: config.description,
      requiredProps: config.requiredProps || [],
      mockDataDependencies: config.mockDataDependencies || [],
      usage: config.usage,
      defaultProps: config.defaultProps,
      demoProps: config.demoProps
    }
  };
}

// 获取所有组件列表
export function getAllComponents() {
  return {
    success: true,
    components: Object.values(ComponentRegistry).map(config => ({
      name: config.name,
      displayName: config.displayName,
      category: config.category,
      description: config.description
    }))
  };
}

// 快捷AI调用方法
export const AIComponentAPI = {
  // 简单调用（仅渲染组件）
  simple: (componentName: string, props: Record<string, any> = {}) => 
    callComponent({ componentName, props, showMeta: false, showUsage: false }),

  // 详细调用（显示元数据和使用说明）
  detailed: (componentName: string, props: Record<string, any> = {}) => 
    callComponent({ componentName, props, showMeta: true, showUsage: true }),

  // 演示调用（使用演示属性）
  demo: (componentName: string, extraProps: Record<string, any> = {}) => {
    const config = ComponentRegistry[componentName];
    const demoProps = config?.demoProps || {};
    return callComponent({ 
      componentName, 
      props: { ...demoProps, ...extraProps }, 
      showMeta: true, 
      showUsage: false 
    });
  },

  // 获取组件信息
  info: getComponentInfo,

  // 获取所有组件
  list: getAllComponents,

  // 搜索组件
  search: (keyword: string) => {
    const results = Object.values(ComponentRegistry).filter(config => 
      config.name.toLowerCase().includes(keyword.toLowerCase()) ||
      config.displayName.toLowerCase().includes(keyword.toLowerCase()) ||
      config.description.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return {
      success: true,
      results: results.map(config => ({
        name: config.name,
        displayName: config.displayName,
        category: config.category,
        description: config.description
      }))
    };
  }
}; 