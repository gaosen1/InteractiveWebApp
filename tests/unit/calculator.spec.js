import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Calculator from '../../src/Calculator.vue'

describe('Calculator.vue', () => {
  let wrapper
  let display

  beforeEach(() => {
    const div = document.createElement('div')
    div.id = 'app'
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 't'
    input.value = '0'
    div.appendChild(input)
    document.body.appendChild(div)
    
    display = document.getElementById('t')
    
    wrapper = mount(Calculator, {
      attachTo: document.getElementById('app')
    })
  })

  afterEach(() => {
    wrapper.unmount()
    document.body.innerHTML = ''
  })

  // 测试组件渲染
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.showMessage).toBe(false)
    // 测试是否渲染了所有按钮
    expect(wrapper.findAll('input[type="button"]')).toHaveLength(22)
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
    
    await wrapper.find('input[type="button"][value="1"]').trigger('click')
    expect(funcSpy).toHaveBeenCalledWith('1')
    
    await wrapper.find('input[type="button"][value="="]').trigger('click')
    expect(equalsSpy).toHaveBeenCalled()
  })

  // 测试复杂计算
  it('should handle complex calculations', async () => {
    // 测试带括号的计算
    await wrapper.find('input[type="button"][value="("]').trigger('click')
    await wrapper.find('input[type="button"][value="2"]').trigger('click')
    await wrapper.find('input[type="button"][value="+"]').trigger('click')
    await wrapper.find('input[type="button"][value="3"]').trigger('click')
    await wrapper.find('input[type="button"][value=")"]').trigger('click')
    await wrapper.find('input[type="button"][value="*"]').trigger('click')
    await wrapper.find('input[type="button"][value="4"]').trigger('click')
    await wrapper.find('input[type="button"][value="="]').trigger('click')
    
    expect(display.value).toBe('20')
  })

  // 测试错误处理
  it('should handle multiplication by zero', async () => {
    // 输入第一个数字
    const button5 = wrapper.find('input[type="button"][value="5"]')
    await button5.trigger('click')
    await wrapper.vm.$nextTick()
    console.log('After 5:', display.value)
    
    // 输入乘号
    const buttonMult = wrapper.find('input[type="button"][value="*"]')
    await buttonMult.trigger('click')
    await wrapper.vm.$nextTick()
    console.log('After *:', display.value)
    
    // 输入零
    const button0 = wrapper.find('input[type="button"][value="0"]')
    if (!button0.exists()) {
      console.error('Zero button not found!')
      return
    }
    await button0.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))  // 添加额外延迟
    console.log('After 0:', display.value)
    
    // 确认输入正确
    expect(display.value).toBe('5*0')
    
    // 点击等号
    const buttonEqual = wrapper.find('input[type="button"][value="="]')
    await buttonEqual.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))  // 添加额外延迟
    console.log('Final result:', display.value)
    
    // 验证结果
    expect(display.value).toBe('0')
  })

  // 添加一个新的测试用例来测试除法
  it('should handle division', async () => {
    await wrapper.find('input[type="button"][value="8"]').trigger('click')
    await wrapper.find('input[type="button"][value="/"]').trigger('click')
    await wrapper.find('input[type="button"][value="2"]').trigger('click')
    await wrapper.find('input[type="button"][value="="]').trigger('click')
    
    expect(display.value).toBe('4')
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
    await wrapper.find('input[type="button"][value="1"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // 测试DOM更新
  it('should update DOM correctly', async () => {
    await wrapper.find('input[type="button"][value="1"]').trigger('click')
    await wrapper.find('input[type="button"][value="2"]').trigger('click')
    
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