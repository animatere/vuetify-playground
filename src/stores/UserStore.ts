import { UserData } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import { SignJWT } from "jose";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: {
      id: 0,
      username: "",
      email: "",
      password: "",
      loggedIn: false,
      registered: false,
    } as UserData,
    validAuthTokens: [
      {
        id: 1,
        tokenValue:
          "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbGV4IiwiaWF0IjoxNzMxNjgxNzUxLCJleHAiOjE3MzE2ODUzNTF9.pgIorxJ7qFe-Cv-cgY5q5Vrxxf7ZTs1B5iy-fxXq9-Y",
      },
      {
        id: 2,
        tokenValue:
          "NTF9.pgIorxJ7qFe-Cv-cgY5q5Vrxxf7ZTs1B5iy-fxXq9-YJpZCI6MSwidXNlcm5hbWUiOiJBbGV4IiwiaWF0IjoxNzMxNjgxNzUxLCJleHAiOjE3MzE2ODUzeyJhbGciOiJIUzI1NiJ9.ey",
      },
    ],
    isAuthenticated: false,
    mockUsers: [
      {
        id: 1,
        username: "Alex",
        email: "alex.wolf@trizelos.com",
        password: "Test12345",
        loggedIn: false,
        registered: true,
      },
      {
        id: 2,
        username: "Test",
        email: "test@trizelos.com",
        password: "Test12345",
        loggedIn: false,
        registered: true,
      },
      {
        id: 3,
        username: "Admin",
        email: "admin@trizelos.com",
        password: "Test12345",
        loggedIn: false,
        registered: true,
      },
    ],
    theme: "light",
    settings: {
      notifications: true,
      emailNotifications: false,
    },
  }),

  actions: {
    // Login-Funktion
    async login(user: UserData) {
      const userExists = this.mockUsers.find(
        (mockuser) =>
          mockuser.username === user.username &&
          mockuser.password === user.password
          // ToDo: Zurücksetzen => Auskommentiert, da es das debuggen einfacher macht
          // &&
          // mockuser.email === user.email
      );
      if (userExists) {
        // Token erstellen
        const token = await this.createToken(user);

        if (token != null) {
          // Token im Browser speichern
          localStorage.setItem("authToken", token);
          this.validAuthTokens.push({
            id: this.validAuthTokens.length,
            tokenValue: token,
          });

          // Benutzer als eingeloggt markieren
          this.currentUser = { ...userExists, loggedIn: true };
          this.isAuthenticated = true; // Auth-Status setzen
          console.log("Login erfolgreich");

          return true;
        } else {
          console.log(
            "Token konnte nicht generiert werden, User wurde nicht gespeichert.",
          );
          return false;
        }
      } else {
        console.error("Login fehlgeschlagen: Benutzer nicht gefunden");
        return false;
      }
    },

    // Token erstellen
    async createToken(user: UserData) {
      const payload = { id: user.id, username: user.username };
      const secret = new TextEncoder().encode("my_secret_key");
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);

      return token;
    },

    // Logout-Funktion
    logout() {
      // Den aktuellen Benutzer zurücksetzen
      this.currentUser = {
        id: 0,
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        registered: false,
      };
      this.isAuthenticated = false; // Auth-Status auf false setzen

      // Entfernen des Tokens aus dem LocalStorage
      localStorage.removeItem("authToken");
      console.log("Logout erfolgreich");

      return true;
    },

    checkAuthStatus() {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },

    setTheme(theme: string) {
      this.theme = theme;
    },
    saveSettings(settings: Record<string, any>) {
      this.settings = { ...this.settings, ...settings };
      localStorage.setItem("userSettings", JSON.stringify(this.settings));
    },
    loadSettings() {
      const stored = localStorage.getItem("userSettings");
      if (stored) {
        this.settings = JSON.parse(stored);
      }
    },

    setUser(user: UserData) {
      this.currentUser = user;
    },
    loadUser(): UserData {
      return this.currentUser;
    }
  },
});
