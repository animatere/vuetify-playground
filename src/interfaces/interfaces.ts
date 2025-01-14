import { TaskCategory } from "@/Enums/TaskCategory";

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

export interface Cart {
  /**
   * Die eindeutige ID des Warenkorbs.
   * Beispiel: 'cart12345'
   */
  cartId: string;

  /**
   * Die Benutzer-ID, die mit diesem Warenkorb verknüpft ist.
   * Beispiel: '603d2149f1e5c7b9b0e2f7d2'
   */
  userId: string;

  /**
   * Die Artikel, die im Warenkorb enthalten sind.
   */
  items: Item[];

  /**
   * Der Status des Warenkorbs.
   * Mögliche Werte: 'open', 'completed', 'cancelled'
   */
  status: 'open' | 'completed' | 'cancelled';

  /**
   * Der Gesamtpreis des Warenkorbs.
   * Beispiel: 199.99
   */
  totalPrice: number;

  /**
   * Das Erstellungsdatum des Warenkorbs.
   * Beispiel: '2024-12-27T12:00:00Z'
   */
  createdAt: Date;

  /**
   * Das Datum der letzten Aktualisierung des Warenkorbs.
   * Beispiel: '2024-12-27T12:00:00Z'
   */
  updatedAt: Date;
}
