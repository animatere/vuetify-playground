import { UserData, UserSettings, UserTokenData } from '@/interfaces/interfaces';
import { defineStore } from "pinia";
import { SignJWT } from "jose";
import axios from 'axios';
import { useTheme } from 'vuetify';

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
    loading: false,
    error: null,
    validAuthTokens: [] as UserTokenData[],
    isAuthenticated: false,
    dbUsers: [] as UserData[],
    userSettings: {
      id: 0,
      userId: 0,
      theme: "light",
      notifications: true,
      emailNotifications: false,
    } as UserSettings,
    theme: ref(useTheme()),
  }),

  actions: {
    async login (user: UserData) {
      const success = await this.fetchUsers();
      if (!success) {
        console.error("Login fehlgeschlagen: Benutzer konnten nicht geladen werden");
        return false;
      }

      const userExists = this.dbUsers.find(
        (dbUser) =>
          dbUser.username === user.username &&
          dbUser.password === user.password
      );

      if (userExists) {
        const token = await this.createToken(userExists);
        if (token) {
          localStorage.setItem("authToken", token);
          this.validAuthTokens.push({
            id: this.validAuthTokens.length + 1,
            userId: userExists.id,
            expires: "",
            tokenValue: token,
          });

          this.currentUser = {
            ...userExists,
            loggedIn: true,
          };
          this.isAuthenticated = true;

          localStorage.setItem("user", JSON.stringify(this.currentUser));
          await this.loadSettings();
          console.log("Login erfolgreich");
          return true;
        }
      }

      console.error("Login fehlgeschlagen: Benutzername oder Passwort falsch");
      return false;
    },

    async fetchUsers () {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://vue3-training-2f8fd-default-rtdb.firebaseio.com/Users.json');
        const users = response.data
          ? Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }))
          : [];
        this.dbUsers = users.map(u => u.users).flat();
        console.log("Benutzerdaten erfolgreich geladen");
        return true;
      } catch (err) {
        console.error("Fehler beim Laden der Benutzerdaten:", err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async signupUser(user: UserData) {
      if (!user.username || !user.email || !user.password) {
        console.error("Signup fehlgeschlagen: Ungültige Benutzerdaten");
        return false;
      }

      const userExists = this.dbUsers.find(
        (dbUser) => dbUser.username === user.username || dbUser.email === user.email
      );

      if (userExists) {
        console.error("Signup fehlgeschlagen: Benutzer existiert bereits");
        return false;
      }

      user.id = this.dbUsers.length + 1; // Setze die ID basierend auf der Benutzerliste
      user.registered = true;
      console.log("Registriere Benutzer:", user);

      try {
        await axios.post('https://vue3-training-2f8fd-default-rtdb.firebaseio.com/Users.json', { users: [...this.dbUsers, user] });

        // Erstelle Standard-Einstellungen mit korrektem userId
        const defaultSettings = {
          id: user.id,
          userId: user.id, // Verknüpfe die Settings mit der User-ID
          theme: "light",
          notifications: true,
          emailNotifications: false,
        } as UserSettings;

        await this.saveSettings(defaultSettings);
        return await this.login(user); // Login nach erfolgreicher Registrierung
      } catch (err) {
        console.error("Fehler beim Registrieren des Benutzers:", err);
        return false;
      }
    },
    async createToken (user: UserData) {
      try {
        const payload = {
          id: user.id,
          username: user.username
        };
        const secret = new TextEncoder().encode("my_secret_key");
        return await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(secret);
      } catch (err) {
        console.error("Fehler beim Generieren des Tokens:", err);
        return null;
      }
    },

    logout () {
      this.currentUser = {
        id: 0,
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        registered: false,
      };
      this.isAuthenticated = false;
      this.userSettings = {
        id: 0,
        userId: 0,
        theme: "light",
        notifications: true,
        emailNotifications: false,
      };
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      console.log("Logout erfolgreich");
    },

    async saveSettings(settings: UserSettings) {
      try {
        // Lade alle bestehenden Einstellungen
        const response = await axios.get(
          'https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings.json'
        );

        const existingSettings = response.data
          ? Object.keys(response.data).map(key => ({
            firebaseId: key,
            ...response.data[key],
          }))
          : [];

        // Prüfen, ob Einstellungen für den aktuellen Benutzer existieren
        const userSetting = existingSettings.find(
          (s: UserSettings) => s.userId === this.currentUser.id
        );

        if (userSetting) {
          // Aktualisiere bestehende Einstellungen
          await axios.put(
            `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${userSetting.firebaseId}.json`,
            { ...userSetting, ...settings }
          );
          console.log("Benutzereinstellungen aktualisiert:", settings);
        } else {
          // Speichere neue Einstellungen und nutze die generierte Firebase-ID als `id`
          const response = await axios.post(
            'https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings.json',
            settings
          );

          const firebaseId = response.data.name; // Firebase generiert eine eindeutige ID
          const newSettings = {
            ...settings,
            id: firebaseId, // Speichere die Firebase-ID als `id`
            userId: this.currentUser.id,
          };

          await axios.put(
            `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${firebaseId}.json`,
            newSettings
          );

          console.log("Neue Benutzereinstellungen gespeichert:", newSettings);
        }

        // Lokale Einstellungen aktualisieren
        this.userSettings = { ...this.userSettings, ...settings };
        return true;
      } catch (err) {
        console.error("Fehler beim Speichern der Benutzereinstellungen:", err);
        return false;
      }
    },

    async loadSettings() {
      try {
        const response = await axios.get(
          'https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings.json'
        );

        const settings = response.data
          ? Object.keys(response.data).map(key => ({
            id: key, // Verwende die Firebase-ID als `id`
            ...response.data[key],
          }))
          : [];

        // Filtere die Einstellungen des aktuellen Benutzers
        const userSettings = settings.find(
          (s: UserSettings) => s.userId === this.currentUser.id
        );

        if (userSettings) {
          this.userSettings = userSettings;
          console.log("Benutzereinstellungen geladen:", this.userSettings);
        } else {
          console.warn("Keine Benutzereinstellungen gefunden");
        }
      } catch (err) {
        console.error("Fehler beim Laden der Benutzereinstellungen:", err);
      }
    },
    loadUser() {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        this.currentUser = JSON.parse(localUser);
        this.isAuthenticated = true;
        console.log("Benutzer erfolgreich aus localStorage geladen:", this.currentUser);
      } else {
        console.warn("Kein Benutzer im localStorage gefunden.");
      }
    }
  },


});
