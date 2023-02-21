export interface Pizza {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating?: number;
  }

export  interface cartItem {
    id: number
    title: string
    price:number
    imageUrl: string
    type: string
    size: number
    count?: number
  }