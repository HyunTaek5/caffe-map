interface IKnex<T> {
  findOne(): Promise<T>;
  find(): Promise<T[]>;
  insert(): Promise<void>;
  update(): Promise<T | T[]>;
  delete(): Promise<void>;
}

interface KnexFindOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  select?: string[];
  where?: any;
}

interface WhereOptions {}
