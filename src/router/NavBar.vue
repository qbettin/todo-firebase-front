<template>
  <v-app-bar app>
    <v-container>
      <v-row justify="space-between" align="center" no-gutters wrap>
        <!-- Left side: Task Manager title with icon -->
        <v-col cols="12" sm="auto" class="d-flex align-center">
          <v-icon>mdi-calendar-check</v-icon>
          <v-toolbar-title class="ml-2">Task Manager</v-toolbar-title>
        </v-col>

        <!-- Right side: Login and Register buttons -->
        <v-col cols="12" sm="auto" class="d-flex justify-end align-center">
          <v-btn v-show="isLoginOrRegisterPage" to="/">Login</v-btn>
          <v-btn v-show="isLoginOrRegisterPage" to="/register">Register</v-btn>
          <v-btn v-show="!isLoginOrRegisterPage" to="/" @click="store.dispatch('logout')">Logout</v-btn>
          <v-btn @click="toggleTheme" icon>
            <v-icon>{{ isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const theme = useTheme();
    const router = useRouter();
    const store = useStore();
    const isLoginOrRegisterPage = computed(() => {
      const path = router.currentRoute.value.path;
      return path === '/' || path === '/register';
    });
    const isDarkMode = computed(() => theme.global.name.value === 'dark');
    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
    }
    return {
      theme,
      store,
      router,
      isLoginOrRegisterPage,
      toggleTheme,
      isDarkMode,
    };
  },
});
</script>

<style scoped>
.v-toolbar-title {
  white-space: nowrap; /* Prevent text from wrapping */
}

@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 1.25rem; /* Adjust font size for smaller screens */
  }

  .v-app-bar {
    padding: 0 8px; /* Ensure padding around the navbar on mobile */
  }

  .v-btn {
    min-width: 80px; /* Adjust button width for better touch targets */
  }
}
</style>
