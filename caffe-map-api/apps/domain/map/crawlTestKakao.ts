export const crawlTestKakao = async (mapShareAddress: string) => {
  const fetchResult = await fetch(mapShareAddress).catch((err) => {
    console.log(err);
    throw err;
  });

  return fetchResult;
};
