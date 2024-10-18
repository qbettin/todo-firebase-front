// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', // or 'dark' based on default preference
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#E8E9EB',
          surface: '#E1E1E1',
          primary: '#1976D2',
          secondary: '#424242',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#333333',
          primary: '#BB86FC',
          secondary: '#03DAC6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
});

export default vuetify;