<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 title">
            <span>Login</span>
          </v-card-title>
          <v-card-subtitle class="title">Please enter your credentials to login.</v-card-subtitle>
          <v-card-text>
            <!-- Show error alert if there is an error -->
            <v-alert v-if="errorMessage" type="error" dismissible>
              {{ errorMessage }}
            </v-alert>

            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block :disabled="username === '' || password === ''">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref(''); // Variable to store error messages

    const login = async () => {
      errorMessage.value = ''; // Clear any previous error message
      try {
        // Use signInWithEmailAndPassword for Firebase login
        await store.dispatch('login', { username: username.value, password: password.value });
        router.push('/home');
      } catch (error: any) {
        // Handle Firebase authentication errors
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage.value = 'Invalid credentials. Please try again.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMessage.value = 'Network error. Please check your connection.';
        } else {
          errorMessage.value = 'Login failed. Please try again later.';
        }
        console.error('Login failed:', error);
      }
    };

    return { username, password, login, errorMessage };
  }
});
</script>

<style scoped>
.title {
  text-align: center;
}

.v-card {
  max-width: 400px;
  margin: auto;
}

.v-btn {
  width: 100%;
}
</style>
