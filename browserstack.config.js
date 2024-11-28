module.exports = {
  // BrowserStack 认证信息
  auth: {
    username: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    access_key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY'
  },

  // BrowserStack 测试配置
  browsers: [
    {
      browser: 'chrome',
      os: 'Windows',
      os_version: '10',
      browser_version: 'latest'
    },
    {
      browser: 'firefox',
      os: 'Windows',
      os_version: '10',
      browser_version: 'latest'
    },
    {
      browser: 'safari',
      os: 'OS X',
      os_version: 'Big Sur',
      browser_version: 'latest'
    },
    {
      browser: 'edge',
      os: 'Windows',
      os_version: '10',
      browser_version: 'latest'
    }
  ],

  // 测试设置
  test_framework: 'vitest',
  test_path: 'tests/unit/**/*.spec.js',
  timeout: 300,
  
  // 并行测试设置
  parallel_runs: 2,
  
  // 本地测试设置
  local: true,
  local_identifier: process.env.BROWSERSTACK_LOCAL_IDENTIFIER
} 