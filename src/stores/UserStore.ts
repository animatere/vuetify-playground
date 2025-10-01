import { defineStore } from "pinia";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../../firebase";
import { UserData, UserSettings } from "@/interfaces/interfaces";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null as User | null,
    userData: {} as UserData,
    allUsers: [] as UserData[] | [],
    userSettings: {} as UserSettings,
    loading: false,
    error: "",
    initialized: false, // wichtig für einmalige Initialisierung
  }),

  actions: {
    /**
     * Initialisiere Auth Listener (einmal beim App-Start aufrufen!)
     */

    initAuthListener() {
      if (this.initialized) return;
      this.initialized = true;

      onAuthStateChanged(auth, async (user) => {
        console.log("AuthStateChanged ->", user?.email);
        this.currentUser = user;

        if (user?.email) {
          await this.getUserByEmail(user.email);
          await this.loadSettings();
        } else {
          this.userData = {} as UserData;
          this.userSettings = {} as UserSettings;
        }
      });
    },

    async getUserByEmail(email: string): Promise<UserData | null> {
      try {
        const response = await axios.post<UserData>(
          `http://localhost:4000/users/email?email=${encodeURIComponent(email)}`,
        );
        this.userData = response.data;
        return this.userData;
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
        return null;
      }
    },

    async getAllUsers(): Promise<UserData[] | []> {
      try {
        const response = await axios.get<UserData[]>(
          `http://localhost:4000/users/`,
        );
        this.allUsers = response.data;
        return this.allUsers;
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
        return [];
      }
    },

    async signup(email: string, password: string): Promise<boolean> {
      this.loading = true;
      this.error = "";
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.currentUser = userCredential.user;
        console.log("Benutzer erfolgreich registriert");

        const initialSettings: UserSettings = {
          id: this.currentUser.uid,
          userId: this.currentUser.uid,
          theme: "light",
          notifications: false,
          emailNotifications: false,
        };
        await this.saveSettings(initialSettings);
        return true;
      } catch (error: any) {
        this.error = error.message || "Registrierung fehlgeschlagen";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      this.loading = true;
      this.error = "";
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.currentUser = userCredential.user;
        console.log("Benutzer erfolgreich angemeldet");
        return true;
      } catch (error: any) {
        this.error = error.message || "Anmeldung fehlgeschlagen";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout(): Promise<void> {
      try {
        await signOut(auth);
        this.currentUser = null;
        this.userData = {} as UserData;
        this.userSettings = {} as UserSettings;
      } catch (error: any) {
        console.error("Fehler bei der Abmeldung:", error);
      }
    },

    async updateUserData(userData: UserData): Promise<boolean> {
      try {
        if (userData.userAddress) {
          const ref = `http://localhost:4000/users/${userData._id}`;
          await axios.patch(ref, userData);
          return true;
        }

        return false;
      } catch (err) {
        console.error("Fehler beim Speichern der Profiledaten:", err);
        return false;
      }
    },

    async setUserData(userData: UserData): Promise<boolean> {
      try {
        if (userData) {
          this.userData = JSON.parse(JSON.stringify(userData));
        }

        return true;
      } catch (err) {
        console.error("Fehler beim Speichern der Profiledaten:", err);
        return false;
      }
    },

    async saveSettings(settings: UserSettings): Promise<boolean> {
      try {
        if (!this.currentUser) return false;

        settings.userId = this.currentUser.uid;
        const ref = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${this.currentUser.uid}.json`;

        await axios.put(ref, settings);
        this.userSettings = settings;
        return true;
      } catch (err) {
        console.error("Fehler beim Speichern der Einstellungen:", err);
        return false;
      }
    },

    async loadSettings(): Promise<UserSettings> {
      if (!this.currentUser) return {} as UserSettings;

      try {
        const ref = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${this.currentUser.uid}.json`;
        const response = await axios.get(ref);

        if (response.data) {
          this.userSettings = response.data;
          return this.userSettings;
        }
      } catch (err) {
        console.error("Fehler beim Laden der Einstellungen:", err);
      }
      return {} as UserSettings;
    },

    async checkAuth(): Promise<boolean> {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          console.log("checkAuth");
          if (user) {
            this.currentUser = user;

            await this.loadSettings();
            return true; // ❌ Problem: return im Callback
          } else {
            this.currentUser = {} as User;
            console.log("Kein Benutzer eingeloggt.");
            return false; // ❌ Problem: return im Callback
          }
        });
      });
    },
  },
});
