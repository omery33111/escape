import { ShoeImage } from "./ShoeImage";



export interface InstaRec {
  id: number | undefined;
  image: string;
}

  export interface InstaRecState {
    instarecs: InstaRec[];

    instarecAmount: number;
  }
