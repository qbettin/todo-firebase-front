<template>
  <div class="main-view">
    <Login/>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useStore } from 'vuex';
import Login from '../components/Login.vue';

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const store = useStore();
    return {
      store
    }
  },
});
</script>

<style scoped>
.main-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
