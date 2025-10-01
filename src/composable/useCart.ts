import { Cart, CartItem, Item } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";

export async function addToCart(
  product: Item | null,
  quantity: number,
  currentUserCart: Cart | null,
): Promise<CartItem[]> {
  if (!product) return [];

  const cartStore = useCartStore();

  console.log("Product: ", product);
  console.log("quantity: ", quantity);
  console.log("currentUserCart: ", currentUserCart);

  if (!currentUserCart) {
    console.log("usercart null → neuer Warenkorb wird erstellt");

    await cartStore.createCart([
      {
        ...product,
        quantity,
      },
    ]);

    const newCart = await cartStore.getCartByUserId();
    return newCart?.cartItems ?? [];
  }

  console.log("usercart is not null");
  const existingItem = currentUserCart.cartItems.find(
    (item) => item.itemId === product._id,
    // && item.selectedVariant === product.selectedVariant,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    currentUserCart.cartItems.push({
      ...product._id,
      quantity
    });
  }

  await cartStore.updateCart(currentUserCart);

  return currentUserCart.items;
}

export async function updateQuantity(
  productId: string,
  newQuantity: number,
): Promise<Item[]> {
  try {
    const cartStore = useCartStore();
    const currentUserCart = await cartStore.getCartByUserId();

    if (!currentUserCart || !currentUserCart.items) return [];

    const itemIndex = currentUserCart.items.findIndex(
      (item) => item._id === productId,
    );

    if (itemIndex !== -1) {
      currentUserCart.items[itemIndex].quantity = newQuantity;
      await cartStore.updateCart(currentUserCart);
    }

    return currentUserCart.items;
  } catch (error) {
    console.error("Error updating quantity:", error);
    return [];
  }
}

export async function removeFromCart(productId: string): Promise<Item[]> {
  const cartStore = useCartStore();
  const currentUserCart = await cartStore.getCartByUserId();
  if (!currentUserCart) return [];

  currentUserCart.items = currentUserCart.items.filter(
    (item) => item._id !== productId,
  );
  await cartStore.updateCart(currentUserCart);

  return currentUserCart.items;
}
