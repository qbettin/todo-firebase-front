<template>
  <v-container class="main-view">
    <v-row>
      <v-col>
        <TodoList />
      </v-col>
    </v-row>
    <TodoPage />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TodoPage from '../components/TodoPage.vue';
import TodoList from '../components/TodoList.vue';

export default defineComponent({
  components: {
    TodoPage,
    TodoList
  },
  setup(){
    const store = useStore();
    const router = useRouter();
    const populate = async () => {
      try {
        if(store.getters.getCurrentUser !== null){
          await store.dispatch('loadTodos');
        } else { router.push('/'); }
      } catch (error) {
        console.error('Loading Todos failed:', error);
      }
    };
    return {
      store,
      populate
    }
  },
  beforeMount() {
    this.populate()
  },
});
</script>

<style scoped>
.main-view {
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
