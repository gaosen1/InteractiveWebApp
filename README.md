## 1．项目简介
计算器应用程序是一个方便的工具，用于执行基本的数学运算。它包括以下功能：
加法：将两个数字相加并显示结果。
减法：从一个数字中减去另一个数字并显示结果。
乘法：将两个数字相乘并显示结果。
除法：将一个数字除以另一个数字并显示结果。
取模运算：计算一个数字除以另一个数字的余数并显示结果。
清空：清除所有输入的数字和运算符，以便重新开始新的计算。
退出：关闭计算器应用程序。
当用户选择退出时，应用程序通常会显示一条消息，例如“谢谢使用我们的计算器！”或“再见！”来表示程序已经结束运行。
这个计算器应用程序可以通过html,css,JavaScrip编写代码来实现。在实现过程中，需要设计用户界面（UI）以便用户可以输入数字和选择运算符，以及显示计算结果。

## 2.功能实现
2.1输入两个数字做加法运算，如图所示
         

2.2输入两个数字做减法运算，如图所示
        

2.3输入两个数字做取模运算，如图所示
        

2.4输入两个数字做乘法运算，如图所示


## 测试计划

### 应用程序描述：

该网络计算器执行基本的数学运算，如加、减、乘、除。它接受数字作为输入并立即显示结果。用户界面在不同设备和平台上简单易用。
测试活动：
该应用程序经历了几个测试活动：
开发阶段：
单元测试：单独测试每个算术函数，以验证加法或除法等运算是否返回准确结果（确保 1 + 1 = 2）。
测试阶段：
集成测试：测试输入字段、后端逻辑和结果显示如何协同工作，以确保输入内容时能得到正确结果。
用户界面 / 用户体验测试：确保设计具有响应性，检查计算器在不同设备和屏幕尺寸上的工作情况。
跨平台测试：验证在多个浏览器（Chrome、Google、Safari）和设备（智能手机、台式机、平板电脑）上的兼容性。
生产阶段：
负载测试：确保网络计算器在高流量情况下不会出现性能下降。
安全测试：检测并防止潜在漏洞，如注入攻击或未经授权的访问。
持续监控：在发布后实时跟踪计算器的性能，以解决任何问题或错误。
跨平台测试以满足用户验收标准：
为了满足用户验收标准，跨平台测试至关重要。测试必须确认计算器在不同平台上的行为一致。这包括：
确保计算器的布局适应各种屏幕尺寸。
验证界面和操作在所有主要网络浏览器中都能正常工作。
检查在不同操作系统（Windows、Mac）上的性能和交互，以确保没有特定于平台的错误。
架构覆盖范围：
该架构涵盖了从本地开发到实时生产的整个测试生命周期。该图强调了三个阶段：
开发阶段：专注于单元测试。
测试阶段：进行集成、用户界面 / 用户体验和跨平台测试。
生产阶段：专注于性能和安全检查。
分析应用程序如何在多个平台 / 设备上进行测试以满足用户验收标准
为了达到用户可接受性标准，跨平台测试至关重要。为了确保我们应用程序的设计、功能和性能一致，我们将在流行的台式机、平板电脑、移动设备和其他平台上对其进行测试。此外，还在包括 Chrome、Firefox 和 Safari 在内的许多浏览器上进行验证，以保证用户在任何设备或任何浏览器上都有相同的体验。
描述从测试解决方案中可以获得的架构覆盖范围
从开发期间的功能验证到部署期间的性能和安全测试，该测试解决方案涵盖了整个应用程序生命周期的每个重要方面。测试除了基本功能外，还包括安全性和跨平台兼容性。

## 4. 测试计划与文档

### 4.1 测试策略概述
本测试计划旨在确保计算器应用程序的质量、可靠性和用户体验。测试将分为以下几个主要阶段：

#### 4.1.1 单元测试
- 测试工具：vitest
- 测试范围：
  - 所有数学运算函数（加、减、乘、除、取模）
  - 输入验证函数
  - 清除功能
- 预期完成时间：3天

1. 编写测试代码：
   ```js
   import { describe, it, expect, beforeEach, afterEach } from 'vitest'
   import { mount } from '@vue/test-utils'
   import Calculator from '../../src/Calculator.vue'
   
   describe('Calculator.vue', () => {
     let wrapper
     let display
   
     beforeEach(() => {
       document.body.innerHTML = `<div id="app"><input type="text" id="t" value="0" /></div>`
       display = document.getElementById('t')
       
       wrapper = mount(Calculator, {
         attachTo: document.getElementById('app')
       })
     })
   
     afterEach(() => {
       wrapper.unmount()
     })
   
     it('should render correctly', () => {
       expect(wrapper.exists()).toBe(true)
       expect(wrapper.vm.showMessage).toBe(false)
     })
   
     it('should handle number input', async () => {
       await wrapper.find('input[value="1"]').trigger('click')
       expect(display.value).toBe('1')
     })
   
     it('should perform addition', async () => {
       await wrapper.find('input[value="5"]').trigger('click')
       await wrapper.find('input[value="+"]').trigger('click')
       await wrapper.find('input[value="3"]').trigger('click')
       await wrapper.find('input[value="="]').trigger('click')
       expect(display.value).toBe('8')
     })
   
     it('should clear display', async () => {
       await wrapper.find('input[value="1"]').trigger('click')
       await wrapper.find('input[value="2"]').trigger('click')
       await wrapper.find('input[value="Clear"]').trigger('click')
       expect(display.value).toBe('0')
     })
   
     it('should delete last character', async () => {
       await wrapper.find('input[value="1"]').trigger('click')
       await wrapper.find('input[value="2"]').trigger('click')
       await wrapper.find('input[value="Del"]').trigger('click')
       expect(display.value).toBe('1')
     })
   }) 
   ```

2. 运行测试命令：

    ```bash
    # 启动测试在监视模式（watch mode）
    npm run test
    
    # 可视化展示测试结果
    npm run test:ui
    
    # 运行所有测试并生成测试报告
    npm run coverage
    
    ```
    
3. 预期测试结果：

   ```bash
    ✓ tests/unit/calculator.spec.js (5)
      ✓ Calculator.vue (5)
        ✓ should render correctly
        ✓ should handle number input
        ✓ should perform addition
        ✓ should clear display
        ✓ should delete last character
   
    Test Files  1 passed (1)
         Tests  5 passed (5)
      Start at  22:18:51
      Duration  17.52s (transform 342ms, setup 0ms, collect 674ms, tests 253ms, environment 14.63s, prepare 1.12s)
   
    PASS  Waiting for file changes...
          press h to show help, press q to quit
   ```

   

#### 4.1.2 集成测试

- 测试工具：Vue Test Utils
- 测试范围：
  - 组件间通信
  - 数据流
  - 状态管理
- 预期完成时间：2天

实际上在上一步测试中，已经包含了部分Vue Test Utils的内容，该工具专门用于测试Vue组件。在这一步测试中，我将编写利用Vue Test Utils进行测试的、更详细的测试代码，模拟计算器的按键点击，更贴近实际情况：
```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Calculator from '../../src/Calculator.vue'

describe('Calculator.vue', () => {
  let wrapper
  let display

  beforeEach(() => {
    document.body.innerHTML = `<div id="app"><input type="text" id="t" value="0" /></div>`
    display = document.getElementById('t')
    
    wrapper = mount(Calculator, {
      attachTo: document.getElementById('app')
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // 测试组件渲染
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.showMessage).toBe(false)
    // 测试是否渲染了所有按钮
    expect(wrapper.findAll('input[type="button"]')).toHaveLength(19)
  })

  // 测试数据属性
  it('should have correct initial data', () => {
    expect(wrapper.vm.flag).toBe(true)
    expect(wrapper.vm.showMessage).toBe(false)
    expect(wrapper.vm.message).toBe('Thank you for using this calculator application!')
    expect(wrapper.vm.fireworks).toEqual([])
    expect(wrapper.vm.colors).toEqual([])
  })

  // 测试方法调用
  it('should call correct methods on button click', async () => {
    const funcSpy = vi.spyOn(wrapper.vm, 'func')
    const equalsSpy = vi.spyOn(wrapper.vm, 'equals')
    
    await wrapper.find('input[value="1"]').trigger('click')
    expect(funcSpy).toHaveBeenCalledWith('1')
    
    await wrapper.find('input[value="="]').trigger('click')
    expect(equalsSpy).toHaveBeenCalled()
  })

  // 测试复杂计算
  it('should handle complex calculations', async () => {
    // 测试带括号的计算
    await wrapper.find('input[value="("]').trigger('click')
    await wrapper.find('input[value="2"]').trigger('click')
    await wrapper.find('input[value="+"]').trigger('click')
    await wrapper.find('input[value="3"]').trigger('click')
    await wrapper.find('input[value=")"]').trigger('click')
    await wrapper.find('input[value="*"]').trigger('click')
    await wrapper.find('input[value="4"]').trigger('click')
    await wrapper.find('input[value="="]').trigger('click')
    
    expect(display.value).toBe('20')
  })

  // 测试错误处理
  it('should handle division by zero', async () => {
    await wrapper.find('input[value="5"]').trigger('click')
    await wrapper.find('input[value="/"]').trigger('click')
    await wrapper.find('input[value="0"]').trigger('click')
    await wrapper.find('input[value="="]').trigger('click')
    
    expect(display.value).toBe('Error')
  })

  // 测试退出功能
  it('should show exit message', async () => {
    await wrapper.find('.exit-button').trigger('click')
    expect(wrapper.vm.showMessage).toBe(true)
    expect(wrapper.vm.fireworks.length).toBe(50)
    expect(wrapper.vm.colors.length).toBe(50)
  })

  // 测试组件事件
  it('should emit events correctly', async () => {
    await wrapper.find('input[value="1"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // 测试DOM更新
  it('should update DOM correctly', async () => {
    await wrapper.find('input[value="1"]').trigger('click')
    await wrapper.find('input[value="2"]').trigger('click')
    
    // 等待DOM更新
    await wrapper.vm.$nextTick()
    expect(display.value).toBe('12')
  })

  // 测试样式
  it('should have correct styles', () => {
    const numberButton = wrapper.find('.number')
    expect(numberButton.exists()).toBe(true)
    
    const exitButton = wrapper.find('.exit-button')
    expect(exitButton.exists()).toBe(true)
  })
}) 
```



#### 4.1.3 UI/UX测试

- 测试工具：
  - Browser Stack（跨浏览器测试）
- 测试范围：
  - 响应式布局
  - 按钮点击反馈
  - 键盘输入支持
  - 错误提示显示
- 预期完成时间：5天



使用 BrowserStack 进行跨浏览器测试。按照以下步骤进行设置：

1. 注册 BrowserStack 账号并获取认证信息
2. 创建 .env 文件并填入你的认证信息：   

    ```
    BROWSERSTACK_USERNAME=我的用户名
    BROWSERSTACK_ACCESS_KEY=我的访问密钥   
    ```

3. 安装依赖：

    ```bash
    npm install   
    ```

4. 运行测试：

    ```bash
    # 启动 BrowserStack Local（用于测试本地环境）
    npm run browserstack-local

    # 在新的终端窗口运行测试
    npm run test:browserstack   
    ```

测试将在以下浏览器环境中运行：
- Chrome (Windows 10)
- Firefox (Windows 10)
- Safari (macOS Big Sur)
- Edge (Windows 10)

测试结果可以在 BrowserStack 控制台查看。




### 4.2 测试用例示例

#### 4.2.1 基础运算测试

```javascript
describe('基础运算测试', () => {
  test('加法运算', () => {
    expect(calculator.add(1, 1)).toBe(2);
    expect(calculator.add(-1, 1)).toBe(0);
    expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
  });
  test('除法运算', () => {
    expect(calculator.divide(4, 2)).toBe(2);
    expect(() => calculator.divide(4, 0)).toThrow('除数不能为零');
  });
});
```

### 4.3 部署说明

#### 4.3.1 环境要求
- Node.js >= 14.x
- npm >= 6.x
- Vue CLI >= 5.x

#### 4.3.2 安装步骤
1. 克隆代码仓库

```bash
git clone [repository-url]
cd calculator-app
```

2. 安装依赖

```bash
npm install
```

3. 本地开发

```bash
npm run dev
```

4. 生产环境构建

```bash
npm run build
```

### 4.4 用户使用手册

#### 4.4.1 基本操作说明
1. 数字输入：
   - 点击数字按钮输入数值
   - 支持键盘输入数字
   - 小数点仅可输入一次

2. 运算操作：
   - 点击运算符按钮选择运算类型
   - 支持键盘快捷键：
     - + : 加法
     - - : 减法
     - * : 乘法
     - / : 除法
     - % : 取模
     - Enter : 计算结果
     - Esc : 清除

3. 错误处理：
   - 除数为零时会显示错误提示
   - 输入非法字符时会被自动过滤
   - 运算结果超出范围时会显示错误提示

### 4.5 测试覆盖要求
- 单元测试覆盖率 > 90%
- 集成测试覆盖率 > 80%
- E2E测试关键路径覆盖率 100%

### 4.6 安全测试
- XSS防护测试
- 输入验证测试
- 错误处理测试
- 内存泄漏测试

### 4.7 性能测试
- 页面加载时间 < 2s
- 运算响应时间 < 100ms
- 内存占用 < 50MB

## 跨浏览器测试

本项目使用 BrowserStack 进行跨浏览器测试。按照以下步骤进行设置：

1. 注册 BrowserStack 账号并获取认证信息
2. 创建 .env 文件并填入你的认证信息：   ```
   BROWSERSTACK_USERNAME=你的用户名
   BROWSERSTACK_ACCESS_KEY=你的访问密钥   ```
3. 安装依赖：   ```bash
   npm install   ```
4. 运行测试：   ```bash
   # 启动 BrowserStack Local（用于测试本地环境）
   npm run browserstack-local
   
   # 在新的终端窗口运行测试
   npm run test:browserstack   ```

测试将在以下浏览器环境中运行：
- Chrome (Windows 10)
- Firefox (Windows 10)
- Safari (macOS Big Sur)
- Edge (Windows 10)

测试结果可以在 BrowserStack 控制台查看。
```
