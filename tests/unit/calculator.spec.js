import { mount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'

describe('Calculator.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Calculator)
  })

  // 测试基础渲染
  test('渲染计算器组件', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // 测试数字按钮点击
  test('点击数字按钮', async () => {
    const button = wrapper.find('button[data-number="1"]')
    await button.trigger('click')
    expect(wrapper.vm.currentNumber).toBe('1')
  })

  // 测试加法运算
  test('加法运算', async () => {
    // 输入第一个数字
    await wrapper.find('button[data-number="5"]').trigger('click')
    // 点击加号
    await wrapper.find('button[data-operator="+"]').trigger('click')
    // 输入第二个数字
    await wrapper.find('button[data-number="3"]').trigger('click')
    // 点击等号
    await wrapper.find('button[data-operator="="]').trigger('click')
    
    expect(wrapper.vm.result).toBe(8)
  })

  // 测试除零错误
  test('除零错误处理', async () => {
    // 输入数字
    await wrapper.find('button[data-number="6"]').trigger('click')
    // 点击除号
    await wrapper.find('button[data-operator="/"]').trigger('click')
    // 输入零
    await wrapper.find('button[data-number="0"]').trigger('click')
    // 点击等号
    await wrapper.find('button[data-operator="="]').trigger('click')
    
    expect(wrapper.vm.error).toBe('除数不能为零')
  })
}) 