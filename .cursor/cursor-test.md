基于React18.x+antd4.x+jest29.x生成覆盖率为100%的单元测试，要求：
1. 分析当前文件其依赖模块相关逻辑，保证生成正确的单测用例
2. 测试文件必须生成到项目根目录的__tests__/unit目录，保持与src目录相同的结构（如src/components/Pay/Form.jsx → __tests__/unit/components/Pay/Form.spec.jsx）
3. 使用以下antd4核心mock方案：
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Form: {
    ...jest.requireActual('antd').Form,
    useForm: () => [{ validateFields: jest.fn() }, jest.fn()],
    Item: ({ children, name }) => (
      <div data-testid={`form-${name}`}>{children}</div>
    )
  },
  Input: jest.fn(({ onChange, value }) => (
    <input 
      data-testid="antd-input"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )),
  Button: ({ onClick, children }) => (
    <button data-testid="antd-button" onClick={onClick}>
      {children}
    </button>
  )
}));

4. 必须覆盖的测试维度：
[1] 组件基础渲染快照
[2] 所有props传递与更新(rerender)
[3] 状态变更全路径（成功/失败/加载）
[4] 用户交互事件链（点击/输入/提交）
[5] 异步操作与副作用
[6] Antd组件方法调用验证

5. 测试模板：
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from '../src/Component';

describe('Component Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 重置antd组件mock状态
    require('antd').Input.mockClear();
  });

  test('渲染基线测试', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('完整交互流程', async () => {
    const mockSubmit = jest.fn();
    render(<Component onSubmit={mockSubmit} />);
    
    // 模拟用户输入序列
    await userEvent.type(
      screen.getByTestId('antd-input'),
      'test@example.com'
    );
    
    // 触发提交动作
    await userEvent.click(screen.getByTestId('antd-button'));
    
    // 验证异步响应
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com'
      });
      expect(screen.getByText('提交成功')).toBeVisible();
    });
  });

  test('异常分支覆盖', async () => {
    // 修改Form Hook返回错误状态
    require('antd').Form.useForm = () => [
      { validateFields: jest.fn().mockRejectedValue({ 
        errorFields: [{ name: 'email', errors: ['无效格式'] }] 
      }) },
      jest.fn()
    ];
    
    render(<Component />);
    await userEvent.click(screen.getByTestId('antd-button'));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('无效格式');
    });
  });
});
6. 文件引入路径统一采用@/别名方式，禁止使用相对路径
7. 已经测试通过的单测用例文件禁止改动；
