export interface Product {
  _id: string;
  id: string;
  isClearance: boolean;
  category: string;
  isNew: boolean;
  url: string;
  reviews: {
    reviewsUrl: string;
    reviewCount: number;
    averageRating: number;
  };
  nameWithoutBrand: string;
  name: string;
  images: {
    primarySmall: string;
    primaryMedium: string;
    primaryLarge: string;
    primaryExtraLarge: string;
    extraImages: {
      title: string;
      src: string;
    }[];
  };
  sizesAvailable: {
    zipper: string[];
  };
  colors: Color[];
  descriptionHtmlSimple: string;
  suggestedRetailPrice: number;
  brand: Brand;
  listPrice: number;
  finalPrice: number;
}

export interface Color {
  colorCode: string;
  colorName: string;
  colorChipImageSrc: string;
  colorPreviewImageSrc: string;
}

export interface Brand {
  id: string;
  url: string;
  productsUrl: string;
  logoSrc: string;
  name: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  cart?: Cart;
  createdAt: Date;
  modifiedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: ShippingAddress;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Alert {
  _id: string;
  title: string;
  type: "warning" | "info" | "promotion";
  status: "active" | "inactive";
  createdAt: Date;
  modifiedAt: Date;
}