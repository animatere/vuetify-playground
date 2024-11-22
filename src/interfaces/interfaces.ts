export interface Variant {
  id: number;
  color: string;
  image: string;
  quantity: number;
}
export interface Item {
  cart: number;
  product: string;
  brand: string;
  inStock: boolean;
  selectedVariant: number;
  details: string[];
  variants: Variant[];
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
  category: string;
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
  id: number;
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
  id: number;
  emailNotifications: boolean;
  notifications: boolean;
  theme: string;
  userId: number;
}
