<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">{{ store.getters.getCurrentUser }}'s To-Do List</span>
      </v-card-title>
      <v-card-subtitle>Manage your tasks here.</v-card-subtitle>
      <v-card-text class="todo-list">
        <v-row>
          <v-col v-for="todo in todos" :key="todo._id" cols="12" md="6">
            <TodoComponent
              :id="todo._id"
              :task="todo.task"
              :completed="todo.completed"
              :created_at="new Date(todo.created_at)"
              :completed_at="new Date(todo.completed_at)"
              :toggleComplete="toggleComplete"
              :deleteTodo="deleteTodo"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Todo } from '../entity/todo';
import TodoComponent from '../components/Todo.vue'

export default defineComponent({
  components: {TodoComponent},
  setup() {
    const store = useStore();
    const todos = computed(() => store.getters.getTodos as Todo[]);

    const toggleComplete = async (id: string, completed: boolean) => {
      try {
        const todo = todos.value.find(todo => todo._id === id);
        if (!todo) {
          console.error('Todo not found');
          return;
        }
        await store.dispatch('editTodo', { id, task: todo.task, completed });
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    };

    const deleteTodo = async (id: string) => {
      try {
        await store.dispatch('deleteTodo', id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    };

    return { todos, store, toggleComplete, deleteTodo };
  }
});
</script>

<style scoped>
.todo-list {
  max-height: 47vh; /* Limit height */
  overflow-y: auto; /* Make scrollable */
}
</style>
