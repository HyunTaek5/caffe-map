import { ConflictException } from '@nestjs/common';
import httpClient from 'apps/domain/common/client/http-client';
import puppeteer from 'puppeteer';
import {
  CrawlPlaceResult,
  CrawlPlaceType,
} from 'apps/domain/map/type/crawlPlace.type';

/**
 * 카카오맵 접근 api 크롤링
 *
 * @param mapShareUrl
 *
 * @returns CrawlPlaceResult[]
 */
export const crawlKakaoMap = async (
  mapShareUrl: string,
): Promise<CrawlPlaceResult[]> => {
  let shareUrl = '';
  let responseResult: CrawlPlaceResult[] = null;

  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const isShareAddress = mapShareUrl.includes('map.kakao');

  // 카카오맵 공유 주소가 아닌 경우, 카카오 맵 주소 리다이렉트 주소 처리
  if (!isShareAddress) {
    const fetchResult = await httpClient.request
      .get(mapShareUrl)
      .catch((err) => {
        console.log(err);
        browser.close();
        throw new ConflictException('지도 크롤링 중 오류가 발생했습니다.');
      });

    shareUrl = fetchResult['request'].res.responseUrl;
  } else {
    shareUrl = mapShareUrl;
  }

  await page.goto(shareUrl);

  page.on('response', async (response) => {
    if (
      response.request().method() === 'GET' &&
      response.url().includes('favorite/list.json') &&
      response.status() === 200
    ) {
      const favoritePlaceList: CrawlPlaceType = await response.json();

      responseResult = favoritePlaceList.result;
    }
  });

  await browser.close();

  return responseResult;

  // const fetchResult = await fetch(mapShareAddress).catch((err) => {
  //   console.log(err);
  // });
  //
  // console.log(fetchResult);
};
