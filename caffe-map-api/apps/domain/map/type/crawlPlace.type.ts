export interface CrawlPlaceType {
  status: {
    code: string;
    message: string;
  };
  result: CrawlPlaceResult[];
}

export interface CrawlPlaceResult {
  folderId: number;
  seq: number;
  favoriteType: string;
  color: string;
  memo: string;
  display1: string;
  display2: string;
  x: number;
  y: number;
  key: string;
  createdAt: typeof Date;
  updatedAt: typeof Date;
}

export interface CrawlMapType {
  status: {
    code: string;
    message: string;
  };
  result: CrawlMapResult;
}
export interface CrawlMapResult {
  folderId: number;
  mapUserId: string;
  title: string;
  icon: string;
  favoriteCount: number;
  status: string;
  subscribeCount: number;
  viewCount: number;
  nickName: string;
  profileStatus: string;
  profileImage: string;
  createdAt: Date;
  cp: boolean;
}

export interface ResponseCrawlData {
  mapInfo: CrawlMapResult;
  placeList: CrawlPlaceResult[];
}
