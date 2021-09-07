import fs from 'fs';
import path, { basename } from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { Config } from './getConfig';
import { XmlData } from './fetchXml';
import { getTemplate } from './getTemplate';
import { generateCase } from "./utils"
import {
  replaceNames,
  replaceSize,
  replaceIsRpx,
} from './replace';


export const generateKuaishouComponent = (data: XmlData, config: Config) => {
  const names: string[] = [];
  const svgTemplates: string[] = [];

  const saveDir = path.resolve(config.save_dir);
  const fileName = basename(config.save_dir) || 'iconfont';

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  data.svg.symbol.forEach((item) => {
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(
        new RegExp(`^${config.trim_icon_prefix}(.+?)$`),
        (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1')
      )
      : iconId;

    names.push(iconIdAfterTrim);
    svgTemplates.push(
      `<!--${iconIdAfterTrim}-->\n<view ks:if="{{name === '${iconIdAfterTrim}'}}" style="background-image: url({{quot}}data:image/svg+xml, ${generateCase(item, {
        hexToRgb: true
      })}{{quot}});` +
      ' width: {{svgSize}}px; height: {{svgSize}}px;" class="icon" />'
    );

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  fs.writeFileSync(path.join(saveDir, fileName + '.ksml'), svgTemplates.join('\n\n'));
  fs.writeFileSync(path.join(saveDir, fileName + '.css'), getTemplate('kuaishou.css'));
  fs.writeFileSync(path.join(saveDir, fileName + '.json'), getTemplate('kuaishou.json'));

  let jsFile = getTemplate('kuaishou.js');
  jsFile = replaceNames(jsFile, names);
  jsFile = replaceSize(jsFile, config.default_icon_size);
  jsFile = replaceIsRpx(jsFile, config.use_rpx);
  fs.writeFileSync(path.join(saveDir, fileName + '.js'), jsFile);

  console.log(`\n${colors.green('√')} All icons have been putted into dir: ${colors.green(config.save_dir)}\n`);
};
