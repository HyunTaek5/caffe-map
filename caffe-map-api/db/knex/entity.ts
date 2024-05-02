export interface PlaceEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  latitude: number;
  longitude: number;
  placeMap: PlaceMapEntity[];
}

export interface MapEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date;
  name: string;
  placeMap: PlaceMapEntity[];
}

export interface PlaceMapEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
  place_id: number;
  place: PlaceEntity;
  map_id: number;
  map: MapEntity;
}
