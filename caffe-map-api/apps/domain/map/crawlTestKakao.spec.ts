import { crawlTestKakao } from '../map/crawlTestKakao';

describe('crawlTestKakao', () => {
  it('정상적으로 진행된다면 fetch가 완료되고 해당 결과가 리턴되어야함', async () => {
    // Given
    const mapShareAddress = 'https://google.com';

    // When
    const result = await crawlTestKakao(mapShareAddress);

    // Then
    expect(result.status).toEqual(200);
  });
  it('SSL 에러가 발생', async () => {
    // Given
    const mapShareAddress = 'https://kko.to/2kwn5Ap-5r';

    try {
      // When
      const result = await crawlTestKakao(mapShareAddress);

      // Then
      expect(result).toBeInstanceOf(Response);
    } catch (err) {
      // Then
      console.log(err);
      expect(err).toContain('[TypeError: fetch failed]');
    }
  });
});
