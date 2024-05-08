import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  place: PlaceTable;
  map: MapTable;
  place_map: PlaceMapTable;
}

export interface PlaceTable {
  id: Generated<number>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  kakao_id: string;
}

export type Place = Selectable<PlaceTable>;
export type NewPlace = Insertable<PlaceTable>;
export type PlaceUpdate = Updateable<PlaceTable>;

export interface MapTable {
  id: Generated<number>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  is_deleted: boolean;
  deleted_at: ColumnType<Date, undefined, string>;
  name: string;
  kakao_id: string;
}

export type Map = Selectable<MapTable>;
export type NewMap = Insertable<MapTable>;
export type MapUpdate = Updateable<MapTable>;

export interface PlaceMapTable {
  id: Generated<number>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  map_id: number;
  place_id: number;
}

export type PlaceMap = Selectable<PlaceMapTable>;
export type NewPlaceMap = Insertable<PlaceMapTable>;
export type PlaceMapUpdate = Updateable<PlaceMapTable>;
