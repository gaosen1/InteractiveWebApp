import { TextEncoder, TextDecoder } from 'util';
import { config } from '@vue/test-utils';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 配置Vue Test Utils
config.global.stubs = {
  transition: false,
  'transition-group': false
}; 