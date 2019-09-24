import colors from 'colors';
import { getConfig } from '../libs/getConfig';
import { fetchXml } from '../libs/fetchXml';
import { generateAlipayComponent } from '../libs/generateAlipayComponent';

const config = getConfig();

fetchXml(config.symbol_url).then((result) => {
  generateAlipayComponent(result, config);
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'));
  process.exit(1);
});
