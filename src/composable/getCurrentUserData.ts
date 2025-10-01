import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { UserData } from "@/interfaces/interfaces";

export async function getCurrentUserData(): Promise<UserData | null> {
  const userStore = useUserStore();
  const { currentUser } = storeToRefs(userStore);

  if (!currentUser.value) {
    console.log("Kein Firebase-User angemeldet!");
    return null;
  }

  const userData = await userStore.getUserByEmail(
    currentUser.value.email ?? "",
  );

  if (userData) {
    console.log("Backend-User gefunden:", userData);
    return userData;
  } else {
    console.log("Kein Benutzer im Backend gefunden!");
    return null;
  }
}
