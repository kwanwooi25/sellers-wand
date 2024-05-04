import axios, { AxiosProxyConfig } from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import {
  COUPANG_HOST,
  WEB_UNLOCKER_HOST,
  WEB_UNLOCKER_PASSWORD,
  WEB_UNLOCKER_PORT,
  WEB_UNLOCKER_USERNAME,
} from './const';
import { CoupangDeliveryType } from './types';

const proxy: AxiosProxyConfig = {
  host: WEB_UNLOCKER_HOST,
  port: WEB_UNLOCKER_PORT,
  auth: {
    username: WEB_UNLOCKER_USERNAME,
    password: WEB_UNLOCKER_PASSWORD,
  },
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getKeywordSearchResult(keyword: string) {
  const url = `${COUPANG_HOST}/np/search?component=&q=${keyword}`;

  const res = await axios.get(url, {
    proxy,
    httpsAgent,
  });

  const $ = cheerio.load(res.data);

  let rocketCount = 0;
  let growthCount = 0;
  let wingCount = 0;
  let globalCount = 0;

  for (let i = 1; i <= 10; i++) {
    const badgeClassName = `.number.no-${i}`;
    const anchorElement = $(badgeClassName).parent();
    const badgeImageUrl = anchorElement.find('.badge img').prop('src');
    const deliveryType: CoupangDeliveryType = badgeImageUrl?.includes('logo_rocket')
      ? 'ROCKET'
      : badgeImageUrl?.includes('logoRocketMerchant')
      ? 'GROWTH'
      : badgeImageUrl?.includes('global_b')
      ? 'GLOBAL'
      : 'WING';

    switch (deliveryType) {
      case 'ROCKET':
        rocketCount += 1;
        break;
      case 'GROWTH':
        growthCount += 1;
        break;
      case 'GLOBAL':
        globalCount += 1;
        break;
      case 'WING':
      default:
        wingCount += 1;
        break;
    }
  }

  return {
    keyword,
    rocket: rocketCount,
    growth: growthCount,
    wing: wingCount,
    global: globalCount,
  };
}
