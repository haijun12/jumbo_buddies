export type RatingList = "Good" | "Ok" | "Bad";

export type UserProfile = {
  firstName: string;
  lastName: string;
  age: number;
}

export type Event = {
  id: number;
  name: string; 
  description: string; 
  image?: string; 
  rank: number;
  type: string;
}
export type ListCollectionItem = {
  item_count: string;
  list_id: number;
  list_name: string
}

export type GetUserCollectionResponse = {
  exists: boolean;
  lists: ListCollectionItem[]
}