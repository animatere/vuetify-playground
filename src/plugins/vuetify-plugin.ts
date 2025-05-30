// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify-Framework-Komponenten
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
  icons: {
    defaultSet: "mdi", // Standard-Iconset
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#eaeaea",
          surface: "#eaeaea",
          primary: "#1E88E5",
          secondary: "#FFCDD2",
          accent: "#8E24AA",
          error: "#E53935",
          info: "#1E88E5",
          success: "#43A047",
          warning: "#FB8C00",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#001f3d",
          surface: "#001f3d",
          primary: "#1E88E5",
          secondary: "#FFCDD2",
          accent: "#8E24AA",
          error: "#E53935",
          info: "#1E88E5",
          success: "#43A047",
          warning: "#FB8C00",
        },
      },
    },
  },
});
