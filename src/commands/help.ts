#!/usr/bin/env node

import colors from 'colors';

console.log([
  '',
  'Usage:',
  '',
  '    ' + colors.green('npx iconfont-init') + '     : generate config file',
  '    ' + colors.green('npx iconfont-wechat') + '   : generate wechat icon component',
  '    ' + colors.green('npx iconfont-alipay') + '   : generate alipay icon component',
  '    ' + colors.green('npx iconfont-baidu') + '    : generate baidu icon component',
  '    ' + colors.green('npx iconfont-toutiao') + '  : generate toutiao icon component',
  '    ' + colors.green('npx iconfont-qq') + '       : generate qq icon component',
  '',
].join('\n'));
