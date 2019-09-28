export const replaceSize = (content: string, size: number) => {
  return content.replace(/#size#/g, String(size));
};

export const replaceNames = (content: string, names: string[]) => {
  return content.replace(/#names#/g, names.join(' | '));
};

export const replaceHexToRgb = (hex) => {
  const rgb: number[] = [];

  //去除前缀 # 号
  hex = hex.substr(1);

  if (hex.length === 3) {
    // 处理 '#abc' 成 '#aabbcc'
    hex = hex.replace(/(.)/g, '$1$1');
  }

  hex.replace(/../g, (color: string) => {
    // 按16进制将字符串转换为数字
    rgb.push(parseInt(color, 0x10));

    return color;
  });

  return 'rgb(' + rgb.join(',') + ')';
};

export const replaceIsRpx = (content: string, useRpx: boolean) => {
  return content
    .replace(/#rpx-1:(.+?):#/g, useRpx ? '$1' : '')
    .replace(/#rpx-0:(.+?):#/g, useRpx ? '' : '$1');
};
