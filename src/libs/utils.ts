import {XmlData} from "./fetchXml";
import {replaceHexToRgb} from "./replace";

const ATTRIBUTE_FILL_MAP = ['path'];


export const generateCase = (data: XmlData['svg']['symbol'][number], config?: {
  hexToRgb?:boolean,
  encodeSvg?: boolean;
}) => {
  let template = `<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg' width='{{svgSize}}px' height='{{svgSize}}px'>`;

  for (const domName of Object.keys(data)) {
    if (domName === '$') {
      continue;
    }

    const counter = {
      colorIndex: 0,
    };

    if (data[domName].$) {
      template += `<${domName}${addAttribute(domName, data[domName], counter, config)} />`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `<${domName}${addAttribute(domName, sub, counter, config)} />`;
      });
    }
  }

  template += `</svg>`;
  if(config?.encodeSvg) {
    /** 将 '%7B%7Bx%7D%7D'格式的文件 还原为 {{ x }}, 并encode*/
    return encodeURIComponent(template).replace( /%7B%7B([\s\S]*?)%7D%7D/g,
      (_, p1) => {
        return `{{ encode.encode(${decodeURIComponent(p1)}) }}`;
      })
  }

  return template.replace(/<|>/g, (matched) => encodeURIComponent(matched));
};

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number },  config?: {
  hexToRgb?:boolean
}) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        let color :string | undefined;
        if(config?.hexToRgb){
          color = replaceHexToRgb(sub.$[attributeName]);
          template += `${attributeName}='{{(isStr ? colors : colors[${counter.colorIndex}]) || '${color}'}}'`;
          counter.colorIndex += 1;
        }else {
          color = sub.$[attributeName]
          template += ` ${attributeName}='{{color}}'`;
        }

      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`;
      }
    }
  }

  return template;
};
