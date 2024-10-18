<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 title">Register</v-card-title>
          <v-card-subtitle class="title">Register a new account here.</v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="username"
                label="Email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required, rules.min]"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                :rules="[rules.required, rules.passwordMatch]"
                type="password"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                @click="register"
                color="primary"
                block
              >
                Register
              </v-btn>              
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Make sure you import the configured auth instance

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const valid = ref(false);

    const rules = {
      required: (value: string) => !!value || 'Required.',
      email: (value: string) => /.+@.+\..+/.test(value) || 'Email must be valid.',
      min: (value: string) => value.length >= 6 || 'Password must be at least 6 characters long.',
      passwordMatch: () => password.value === confirmPassword.value || 'Passwords do not match.',
    };

    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          // Use createUserWithEmailAndPassword for Firebase registration
          await createUserWithEmailAndPassword(auth, username.value, password.value);
          router.push('/');
        } catch (error: any) {
          console.error('Registration failed:', error);
        }
      }
    };

    return { username, password, confirmPassword, valid, rules, register };
  }
});
</script>


<style scoped>
.v-card {
  max-width: 400px;
  margin: auto;
}

.v-btn {
  width: 100%;
}

.title{
  text-align: center;
}
</style>