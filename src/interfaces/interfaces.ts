import { QuestCategory, TaskCategory } from "@/Enums/enums";
import { User } from "firebase/auth";

export interface Item {
  _id: string;
  description: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
  brand: string;
  variants: Variant[];
  selectedVariant: number;
  hashTags: string[];
}

export interface PurchaseOrder {
  _id: string;
  items: Item[];
  user: User;
  invoice: Invoice;
  status: "pending" | "paid" | "shipped" | "cancelled";
  createdAt: string;
  updatedAt?: string;
  shippingAddress: UserAddress;
  billingAddress?: UserAddress;
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "cash";
  notes?: string;
}

export interface Invoice {
  _id: string;
  items: Item[];
  user: User;
  cart: User;
  totalNet: number;
  totalGross: number;
  taxRate: number;
  createdAt: string;
  dueDate: string;
  invoiceNumber: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  currency: "EUR" | "USD" | "GBP";
  paid: boolean;
  paidAt?: Date;
  notes?: string;
}

export interface UserAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Variant {
  id: number;
  color: string;
  image: string;
  quantity: number;
  itemProperties: string[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string; // hier später bitte enum
  brand: string;
  details: string[];
  link: string;
  description: string;
}

export interface Employee {
  username: number;
  status: string;
  work_area: string;
  roles: number;
}
export type Employees = Employee[];

export interface Tasks {
  id: number;
  userId: string;
  category: TaskCategory;
  title: string;
  priority: string;
  dueDate: string;
  assignee: string;
}

export interface ToDo {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  loggedIn: boolean;
  registered: boolean;
}

export interface Comment {
  id: number;
  text: string;
  userId: string;
}

export interface UserTokenData {
  id: number;
  userId: number;
  tokenValue: string;
  // status: "active" | "inactive";
  expires: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  theme: string;
  notifications: boolean;
  emailNotifications: boolean;
}

export interface UserEvent {
  id: string;
  userId: string;
  eventDescription: string;
  createdAt: Date;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: Item[];
  status: "open" | "completed";
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestCard {
  title: string;
  description: string;
  category: QuestCategory;
  addOn: string;
  path: string;
  activated: boolean;
}
