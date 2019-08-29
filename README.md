# mini-program-iconfont-cli

把iconfont图标批量转换成微信小程序的组件。不依赖字体，支持多色彩。

![](https://github.com/fwh1990/mini-program-iconfont-cli/blob/master/images/multi-color-icon.jpg?raw=true)


# 特性

1、纯组件
<br />
2、不依赖字体文件
<br />
3、支持px和rpx两种格式
<br />
4、原样渲染多色彩图标
<br />
4、图标颜色可定制

# Step 1
安装插件
```bash
# Yarn
yarn add mini-program-iconfont-cli --dev

# Npm
npm install mini-program-iconfont-cli --save-dev
```

# Step 2
生成配置文件
```bash
./node_modules/.bin/iconfont init
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
  "symbol_url": "请参考README.md，复制 http://iconfont.cn 官网提供的JS链接",
  "save_dir": "./iconfont",
  "use_rpx": false,
  "trim_icon_prefix": "icon-",
  "default_icon_size": 18
}
```
### 配置参数说明：
### symbol_url
请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_kk9y3jk2omq.js`

<br />

![](https://github.com/fwh1990/mini-program-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

### save_dir
根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

### use_rpx
是否使用微信提供的[尺寸单位rpx](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)还是普通的像素单位`px`。默认值为false，即使用`px`

### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

### default_icon_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入props的方式改变这个size值。

# Step 3
开始生成小程序组件
```bash
./node_modules/.bin/iconfont
```
生成后查看您设置的保存目录中是否含有所有的图标


# Step 4
在根目录 `app.json` 中引入全局图标组件
```json
{
    "usingComponents": {
        "iconfont": "./iconfont"
    }
}
```
如果你不想全局引入，也可以在各自的page页面分别引入（好麻烦呢）

# 使用
在page中使用图标
```jsx harmony
// 原色彩
<iconfont name="alipay" />

// 单色：红色
<iconfont name="alipay" color="red" />

// 多色：红色+橘色
<iconfont name="alipay" color="{{['red', 'orange']}}" size="300" />
```

# 更新图标
当您在iconfont.cn中的图标有变更时，只需更改配置`symbol_url`，然后再次执行`Step 3`即可生成最新的图标组件
```bash
# 修改 symbol_url 配置后执行：
./node_modules/.bin/iconfont
```
--------

欢迎使用，并给我一些反馈和建议，让这个库做的更好
