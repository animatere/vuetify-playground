import { UserSettings } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../../firebase';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser : ref<User | null>(null), // Reaktiver Benutzerzustand
    userSettings : ref<UserSettings | null>(null),
    loading : ref(false),
    error : ref<string | null>(null),
  }),

  actions: {
    /**
     * Registriere einen neuen Benutzer
     */
    async signup(email: string, password: string): Promise<boolean> {
      this.loading = true;
      this.error = null;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.currentUser = userCredential.user;
        console.log('Benutzer erfolgreich registriert:', this.currentUser);

        // Initiale Benutzereinstellungen speichern
        const initialSettings: UserSettings = {
          id: this.currentUser.uid,
          userId: this.currentUser.uid,
          theme: 'light',
          notifications: true,
          emailNotifications: false,
        };
        await this.saveSettings(initialSettings);
        return true;
      } catch (error: any) {
        this.error = error.message || 'Registrierung fehlgeschlagen';
        console.error('Fehler bei der Registrierung:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Melde einen Benutzer an
     */
    async login(email: string, password: string): Promise<boolean> {
      this.loading = true;
      this.error = null;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.currentUser = userCredential.user;
        console.log('Benutzer erfolgreich angemeldet:', this.currentUser);

        // Benutzereinstellungen laden
        await this.loadSettings();
        return true;
      } catch (error: any) {
        this.error = error.message || 'Anmeldung fehlgeschlagen';
        console.error('Fehler bei der Anmeldung:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Melde den aktuellen Benutzer ab
     */
    async logout(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        await signOut(auth);
        this.currentUser = {} as User;
        this.userSettings = {} as UserSettings;
        console.log('Benutzer erfolgreich abgemeldet.');
      } catch (error: any) {
        this.error = error.message || 'Abmeldung fehlgeschlagen';
        console.error('Fehler bei der Abmeldung:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Überwache den aktuellen Benutzerstatus
     */
    watchCurrentUser(): void {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;

          // Benutzereinstellungen automatisch laden
          await this.loadSettings();
        } else {
          this.currentUser = {} as User;
          this.userSettings = {} as UserSettings;
        }
      });
    },

    async checkAuth(): Promise<boolean> {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.currentUser = user;
            console.log("Benutzerstatus wiederhergestellt:", user);

            // Lade Einstellungen
            await this.loadSettings();
            return true;
          } else {
            this.currentUser = {} as User;
            console.log("Kein Benutzer eingeloggt.");
            return false;
          }
        });
      });
    },

    /**
     * Speichere die Benutzereinstellungen in Firebase
     */
    async saveSettings(settings: UserSettings): Promise<boolean> {
      try {
        if (!this.currentUser || !settings.userId) {
          console.error('Kein Benutzer angemeldet. Kann Einstellungen nicht speichern.');
          return false;
        }

        if(!settings.emailNotifications)
          settings.emailNotifications = false;

        if(!settings.notifications)
          settings.notifications = false;

        settings.userId = this.currentUser.uid;

        const userSettingsRef = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${this.currentUser.uid}.json`;

        // Speichere die Einstellungen spezifisch für den Benutzer
        await axios.put(userSettingsRef, settings);
        console.log('Benutzereinstellungen gespeichert:', settings);

        this.userSettings = settings;
        return true;
      } catch (err) {
        console.error('Fehler beim Speichern der Benutzereinstellungen:', err);
        return false;
      }
    },

    /**
     * Lade die Benutzereinstellungen aus Firebase
     */
    async loadSettings(): Promise<UserSettings> {
      try {
        if (!this.currentUser) {
          console.error('Kein Benutzer angemeldet. Kann Einstellungen nicht laden.');
          return { 
            id: "",
            userId: "",
            theme: "light",
            notifications: false,
            emailNotifications: false
          } as UserSettings
        }

        const userSettingsRef = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserSettings/${this.currentUser.uid}.json`;

        const response = await axios.get(userSettingsRef);

        if (response.data) {
          this.userSettings = response.data;
          console.log('Benutzereinstellungen geladen:', this.userSettings);
          return this.userSettings as UserSettings;
        } else {
          console.warn('Keine Benutzereinstellungen für den aktuellen Benutzer gefunden');
          this.currentUser = {} as User;
          this.userSettings = {} as UserSettings; }

      } catch (err) {
        console.error('Fehler beim Laden der Benutzereinstellungen:', err);
      }
      return { 
        id: "",
        userId: "",
        theme: "light",
        notifications: false,
        emailNotifications: false
      } as UserSettings;

    },
  },
});
