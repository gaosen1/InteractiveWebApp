import { mount } from '@vue/test-utils'
import Calculator from '../../src/Calculator.vue'

describe('Calculator.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Calculator, {
      attachTo: document.body
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // 测试基础渲染
  test('渲染计算器组件', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // 测试数字按钮点击
  test('点击数字按钮', async () => {
    const button = wrapper.find('input[value="1"]')
    await button.trigger('click')
    const display = wrapper.find('#t')
    await wrapper.vm.$nextTick()
    expect(display.element.value).toBe('1')
  })

  // 测试加法运算
  test('加法运算', async () => {
    // 输入第一个数字
    await wrapper.find('input[value="5"]').trigger('click')
    await wrapper.vm.$nextTick()
    // 点击加号
    await wrapper.find('input[value="+"]').trigger('click')
    await wrapper.vm.$nextTick()
    // 输入第二个数字
    await wrapper.find('input[value="3"]').trigger('click')
    await wrapper.vm.$nextTick()
    // 点击等号
    await wrapper.find('input[value="="]').trigger('click')
    await wrapper.vm.$nextTick()
    
    const display = wrapper.find('#t')
    expect(display.element.value).toBe('8')
  })

  // 测试清除功能
  test('清除功能', async () => {
    // 先输入一些数字
    await wrapper.find('input[value="1"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('input[value="2"]').trigger('click')
    await wrapper.vm.$nextTick()
    // 点击清除
    await wrapper.find('input[value="Clear"]').trigger('click')
    await wrapper.vm.$nextTick()
    
    const display = wrapper.find('#t')
    expect(display.element.value).toBe('0')
  })

  // 测试退格功能
  test('退格功能', async () => {
    // 输入数字
    await wrapper.find('input[value="1"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('input[value="2"]').trigger('click')
    await wrapper.vm.$nextTick()
    // 点击退格
    await wrapper.find('input[value="Del"]').trigger('click')
    await wrapper.vm.$nextTick()
    
    const display = wrapper.find('#t')
    expect(display.element.value).toBe('1')
  })
}) 