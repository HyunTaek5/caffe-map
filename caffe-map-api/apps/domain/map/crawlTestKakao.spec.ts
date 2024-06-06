import { crawlTestKakao } from '../map/crawlTestKakao';

describe('crawlTestKakao', () => {
  it('정상적으로 진행된다면 fetch가 완료되고 console에 로그가 찍혀야됨', async () => {
    // Given
    const mapShareAddress = 'https://google.com';

    // When
    const result = await crawlTestKakao(mapShareAddress);

    // // Then
    // expect(result).toThrowError('지도 크롤링 중 오류가 발생했습니다.');
  });
  it('SSL 에러가 발생', async () => {
    // Given
    const mapShareAddress = 'https://kko.to/2kwn5Ap-5r';

    // When
    const result = await crawlTestKakao(mapShareAddress);

    // // Then
    // expect(result).toThrowError('지도 크롤링 중 오류가 발생했습니다.');
  });
});
