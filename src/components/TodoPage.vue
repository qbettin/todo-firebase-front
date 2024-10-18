<template>
  <v-container class="toolbar-container">
    <v-card class="toolbar-card" variant="elevated">
      <v-card-text class="toolbar-content">
        <v-form @submit.prevent="addTodo" class="toolbar-form">
          <v-text-field
            v-model="newTask"
            label="New Task"
            variant="solo"
            class="task-input"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" class="add-button">Add Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const newTask = ref('');

    const addTodo = async () => {
      try {
        console.log(newTask.value);
        await store.dispatch('createTodo', { task: newTask.value });
        newTask.value = '';
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    };

    return { newTask, addTodo };
  }
});
</script>

<style scoped>
.toolbar-container {
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
}

.toolbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar-form {
  display: flex;
  width: 100%;
}

.task-input {
  flex: 1;
  margin-right: 16px;
}

.add-button {
  flex-shrink: 0;
}
</style>
