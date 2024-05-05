import { ConflictException } from '@nestjs/common';
import httpClient from 'apps/domain/common/client/http-client';
import puppeteer from 'puppeteer';
import {
  CrawlMapResult,
  CrawlMapType,
  CrawlPlaceResult,
  CrawlPlaceType,
  ResponseCrawlData,
} from 'apps/domain/map/type/crawlPlace.type';

/**
 * 카카오맵 접근 api 크롤링
 *
 * @param mapShareUrl
 *
 * @returns ResponseCrawlData
 */
export const crawlKakaoMap = async (
  mapShareUrl: string,
): Promise<ResponseCrawlData> => {
  let shareUrl: string;

  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: ['--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

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

  const responseMapData = (): Promise<CrawlMapResult[]> => {
    return new Promise((resolve: (value: CrawlMapResult[]) => void) => {
      page.on('response', async (response) => {
        if (
          response.request().method() === 'GET' &&
          response
            .url()
            .includes('folder/list.json?sort=CREATE_AT&mapUserId=') &&
          response.status() === 200
        ) {
          const favoriteMap: CrawlMapType = await response.json();

          resolve(favoriteMap.result);
        }
      });
    });
  };

  const responsePlaceData = (): Promise<CrawlPlaceResult[]> => {
    return new Promise((resolve: (value: CrawlPlaceResult[]) => void) => {
      page.on('response', async (response) => {
        if (
          response.request().method() === 'GET' &&
          response.url().includes('favorite/list.json') &&
          response.status() === 200
        ) {
          const favoritePlaceList: CrawlPlaceType = await response.json();

          resolve(favoritePlaceList.result);
        }
      });
    });
  };

  return {
    mapInfo: await responseMapData(),
    placeList: await responsePlaceData(),
  };

  // const fetchResult = await fetch(mapShareAddress).catch((err) => {
  //   console.log(err);
  // });
  //
  // console.log(fetchResult);
};
