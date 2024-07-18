export interface Product {
    id: number;
    title: string;
    desc: string;
    image: string;
    price: number;
    description: string;
    category: string;
    isShow: boolean;
  }
  export interface Category {
    id: string;
    name: string;
  }