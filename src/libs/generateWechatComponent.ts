import fs from 'fs';
import path, { basename } from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { XmlData } from './fetchXml';
import { Config } from './getConfig';
import { getTemplate } from './getTemplate';
import {
  replaceHexToRgb,
  replaceNames,
  replaceSize,
} from './replace';
// import { whitespace } from './whitespace';

const ATTRIBUTE_FILL_MAP = ['path'];

export const generateWechatComponent = (data: XmlData, config: Config) => {
  const svgTemplates: string[] = [];
  const names: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const fileName = basename(config.save_dir) || 'iconfont';

  svgTemplates.push(`<wxs src="./${fileName}.wxs" module="helper" />\n`);
  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  data.svg.symbol.forEach((item) => {
    const iconId = item.$.id;
    const iconIdAfterTrim = (
      config.trim_icon_prefix
        ? iconId.replace(new RegExp(`^${config.trim_icon_prefix}(.+?)$`), '$1')
        : iconId
    ).replace(/^[-_]?(.+?)$/, '$1');

    names.push(iconIdAfterTrim);
    svgTemplates.push(
      `<!--${iconIdAfterTrim}-->\n<view wx:if="{{name === '${iconIdAfterTrim}'}}" style="background-image: url(\\"data:image/svg+xml, ${generateCase(item)}\\");` +
      ' width: {{size}}; height: {{size}}; background-repeat: no-repeat;" />'
    );

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  fs.writeFileSync(path.join(saveDir, fileName + '.wxss'), '');
  fs.writeFileSync(
    path.join(saveDir, fileName + '.wxml'),
    svgTemplates
      .join('\n\n')
      .replace(/{{size}}/g, (value) => value + (config.use_rpx ? 'rpx' : 'px')));

  let jsFile = getTemplate('wechat.js');

  jsFile = replaceSize(jsFile, config.default_icon_size);
  jsFile = replaceNames(jsFile, names);

  fs.writeFileSync(path.join(saveDir, fileName + '.js'), jsFile);
  fs.writeFileSync(path.join(saveDir, fileName + '.json'), getTemplate('wechat.json'));
  fs.writeFileSync(path.join(saveDir, fileName + '.wxs'), getTemplate('wechat.wxs'));

  console.log(`\n${colors.green('√')} All icons have been putted into dir: ${colors.green(config.save_dir)}\n`);
};

const generateCase = (data: XmlData['svg']['symbol'][number]) => {
  let template = `<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg' width='{{size}}' height='{{size}}'>`;

  for (const domName of Object.keys(data)) {
    if (domName === '$') {
      continue;
    }

    const counter = {
      colorIndex: 0,
    };

    if (data[domName].$) {
      template += `<${domName}${addAttribute(domName, data[domName], counter)} />`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `<${domName}${addAttribute(domName, sub, counter)} />`;
      });
    }
  }

  template += `</svg>`;

  return template.replace(/<|>/g, (matched) => encodeURI(matched));
};

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number }) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        const color = replaceHexToRgb(sub.$[attributeName]);

        template += ` ${attributeName}='{{helper.getColor(colors, ${counter.colorIndex}, '${color}')}}'`;
        counter.colorIndex += 1;
      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`;
      }
    }
  }

  return template;
};
