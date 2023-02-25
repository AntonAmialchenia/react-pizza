export interface Pizza {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating?: number;
  }

export  interface cartItem {
    id: string
    title: string
    price:number
    imageUrl: string
    type: string
    size: number
    count?: number
  }