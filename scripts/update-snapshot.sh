#!/usr/bin/env bash

cp -f ./scripts/config/wechat.json ./iconfont.json
ts-node src/commands/createWechatIcon.ts

cp -f ./scripts/config/alipay.json ./iconfont.json
ts-node src/commands/createAlipayIcon.ts

cp -f ./scripts/config/baidu.json ./iconfont.json
ts-node src/commands/createBaiduIcon.ts

cp -f ./scripts/config/toutiao.json ./iconfont.json
ts-node src/commands/createToutiaoIcon.ts

cp -f ./scripts/config/qq.json ./iconfont.json
ts-node src/commands/createQqIcon.ts
