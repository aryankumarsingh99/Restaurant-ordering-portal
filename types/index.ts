export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "main-course" | "dessert" | "beverage";
  image: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  popular: boolean;
  rating: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderDate: Date;
  estimatedDelivery: Date;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}
