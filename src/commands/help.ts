#!/usr/bin/env node

import colors from 'colors';

console.log([
  '',
  'Usage:',
  '',
  '    ' + colors.green.bold('npx iconfont-init [--output]') + '     : Generate configuration file, default file name is iconfont.json',
  '    ' + colors.green.bold('npx iconfont-wechat [--config]') + '   : Generate wechat icon component',
  '    ' + colors.green.bold('npx iconfont-alipay [--config]') + '   : Generate alipay icon component',
  '    ' + colors.green.bold('npx iconfont-baidu [--config]') + '    : Generate baidu icon component',
  '    ' + colors.green.bold('npx iconfont-toutiao [--config]') + '  : Generate toutiao icon component',
  '    ' + colors.green.bold('npx iconfont-qq [--config]') + '       : Generate qq icon component',
  '',
].join('\n'));
