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
