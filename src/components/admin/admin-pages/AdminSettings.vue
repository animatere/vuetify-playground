<template>
    <v-container>
      <v-row>
        <!-- System Settings -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-icon left>mdi-server</v-icon>
              System Settings
            </v-card-title>
            <v-card-text>
              <!-- Datenbank-Konfiguration -->
              <v-text-field
                v-model="settings.dbHost"
                label="Datenbank-Host"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="settings.dbPort"
                label="Datenbank-Port"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="settings.dbUser"
                label="Datenbank-Benutzername"
                outlined
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="settings.dbPassword"
                label="Datenbank-Passwort"
                type="password"
                outlined
                class="mb-4"
              ></v-text-field>
  
              <!-- API-Schlüssel -->
              <v-text-field
                v-model="settings.apiKey"
                label="API-Schlüssel"
                outlined
                class="mb-4"
              ></v-text-field>
  
              <!-- Benachrichtigungen für Admins -->
              <v-switch
                v-model="settings.errorNotifications"
                label="Benachrichtigungen bei Fehlern"
                class="mb-4"
              ></v-switch>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Benutzerverwaltung -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-icon left>mdi-account-cog</v-icon>
              Benutzerverwaltung
            </v-card-title>
            <v-card-text>
              <!-- Standardrolle für neue Benutzer -->
              <v-select
                v-model="settings.defaultRole"
                :items="roles"
                label="Standardrolle für neue Benutzer"
                outlined
                class="mb-4"
              ></v-select>
  
              <!-- Aktivierung von Benutzerkonten -->
              <v-switch
                v-model="settings.autoActivateUsers"
                label="Automatische Benutzeraktivierung"
                class="mb-4"
              ></v-switch>
  
              <!-- Sperren von Benutzerkonten -->
              <v-switch
                v-model="settings.blockFailedLogins"
                label="Konten nach fehlgeschlagenen Versuchen sperren"
                class="mb-4"
              ></v-switch>
  
              <!-- Zwei-Faktor-Authentifizierung -->
              <v-switch
                v-model="settings.enable2FA"
                label="Zwei-Faktor-Authentifizierung für Admins"
                class="mb-4"
              ></v-switch>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Sicherheits- und Logging-Einstellungen -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-icon left>mdi-security</v-icon>
              Sicherheits- & Logging-Einstellungen
            </v-card-title>
            <v-card-text>
              <!-- IP-Whitelist für Admins -->
              <v-text-field
                v-model="settings.adminIPs"
                label="IP-Whitelist für Admin-Zugang"
                hint="Kommagetrennte Liste"
                outlined
                class="mb-4"
              ></v-text-field>
  
              <!-- Logging-Ebene -->
              <v-select
                v-model="settings.logLevel"
                :items="['debug', 'info', 'warn', 'error']"
                label="Fehlerprotokollierungsebene"
                outlined
                class="mb-4"
              ></v-select>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Backup-Einstellungen -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-icon left>mdi-database</v-icon>
              Backup-Einstellungen
            </v-card-title>
            <v-card-text>
              <!-- Backup-Planung -->
              <v-select
                v-model="settings.backupSchedule"
                :items="['Täglich', 'Wöchentlich', 'Monatlich']"
                label="Backup-Planung"
                outlined
                class="mb-4"
              ></v-select>
  
              <!-- Wiederherstellung -->
              <v-btn @click="restoreBackup" color="secondary">Datenbank Wiederherstellen</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Speichern Button -->
      <v-btn @click="saveSettings" color="primary">Einstellungen speichern</v-btn>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';

  // Reactive state variables
  const settings = ref({
    dbHost: '',
    dbPort: '',
    dbUser: '',
    dbPassword: '',
    apiKey: '',
    errorNotifications: true,
    defaultRole: 'user',
    autoActivateUsers: true,
    blockFailedLogins: true,
    enable2FA: false,
    adminIPs: '',
    logLevel: 'info',
    backupSchedule: 'Täglich',
  });

  const roles = ref(['admin', 'user', 'moderator']); // Beispiel-Rollen

  // Methods
  function saveSettings() {
    // Speichern der Admin-Einstellungen
    console.log('Admin-Einstellungen gespeichert:', settings.value);
  }

  function restoreBackup() {
    // Hier könntest du eine Wiederherstellung der Datenbank implementieren
    console.log('Datenbankwiederherstellung wird durchgeführt...');
  }
</script>

  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  