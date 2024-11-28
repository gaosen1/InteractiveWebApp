import { TextEncoder, TextDecoder } from 'util';
import { config } from '@vue/test-utils';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 配置Vue Test Utils
config.global.stubs = {
  transition: false,
  'transition-group': false
};

config.global.mocks = {
  // 添加任何需要模拟的全局属性
} 