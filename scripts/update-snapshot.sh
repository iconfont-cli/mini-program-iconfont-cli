#!/usr/bin/env bash

npx ts-node src/commands/createQqIcon.ts --config ./scripts/config/qq.json
npx ts-node src/commands/createToutiaoIcon.ts --config ./scripts/config/toutiao.json
npx ts-node src/commands/createKuaishouIcon.ts --config ./scripts/config/kuaishou.json
npx ts-node src/commands/createBaiduIcon.ts --config ./scripts/config/baidu.json
npx ts-node src/commands/createAlipayIcon.ts --config ./scripts/config/alipay.json
npx ts-node src/commands/createWechatIcon.ts --config ./scripts/config/wechat.json
