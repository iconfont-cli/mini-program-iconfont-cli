#!/usr/bin/env node

import colors from 'colors';
import { getConfig } from '../libs/getConfig';
import { fetchXml } from '../libs/fetchXml';
import { generateWechatComponent } from '../libs/generateWechatComponent';

const config = getConfig();

fetchXml(config.symbol_url).then((result) => {
  generateWechatComponent(result, config);
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'));
  process.exit(1);
});
