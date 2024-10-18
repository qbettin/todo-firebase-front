<template>
  <div class="main-view">
    <Registration></Registration>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useStore } from 'vuex';
import Registration from '../components/Registration.vue';

export default defineComponent({
  components: {
    Registration,
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