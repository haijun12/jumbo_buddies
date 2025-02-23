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
  image: string; 
  rank: number;
  type: RatingList;
}
//db functions