import { UserData } from "@/interfaces/interfaces";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";

export async function getCurrentUserData(): Promise<UserData> {
  const userStore = useUserStore();
  const { currentUser } = storeToRefs(userStore);

  let defaultUser = ref<UserData>({
    id: "",
    username: "",
    email: "",
    password: "",
    loggedIn: false,
    registered: false,
  });

  try {
    userStore.checkAuth();
    if (currentUser.value.uid) {
      defaultUser.value = {
        id: currentUser.value.uid.toString(),
        username: currentUser.value.email?.split("@")[0],
        email: currentUser.value.email as string,
        password: "Test12345",
        loggedIn: !!currentUser.value, // placeholder
        registered: !currentUser.value.emailVerified, // placeholder
      } as UserData;
    } else {
      console.log("Currentuser nicht vorhanden!");
    }
    return defaultUser.value;
  } catch (error: any) {
    console.error("Fehler bei userStore.checkAuth():", error);
    return defaultUser.value;
  }
}
