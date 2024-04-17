import { ConflictException } from '@nestjs/common';
import httpClient from 'apps/domain/common/client/http-client';
import puppeteer from 'puppeteer';

export const crawlKakaoMap = async (mapShareUrl: string) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
  });

  const page = await browser.newPage();

  const isShareAddress = mapShareUrl.includes('map.kakao');

  // 카카오맵 공유 주소가 아닌 경우, 리다이렉트된 카카오 맵 주소로 크롤링
  if (!isShareAddress) {
    const fetchResult = await httpClient.request
      .get(mapShareUrl)
      .catch((err) => {
        console.log(err);
        browser.close();
        throw new ConflictException('지도 크롤링 중 오류가 발생했습니다.');
      });

    const redirectedMapUrl = fetchResult['request'].res.responseUrl;

    await page.goto(redirectedMapUrl);
  } else {
  }

  // const fetchResult = await fetch(mapShareAddress).catch((err) => {
  //   console.log(err);
  // });
  //
  // console.log(fetchResult);
};
