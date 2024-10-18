<template>
  <v-card class="mb-3" :color='!completed ? "yellow-darken-2" : "green-darken-2"' variant="elevated">
    <v-card-title>
      {{ task }}
    </v-card-title>
    <v-card-subtitle>
      Created: {{ formatDate(created_at) }}
    </v-card-subtitle>
    <v-card-subtitle v-if="completed">
      Completed: {{ formatDate(completed_at) }}
    </v-card-subtitle>
    
    <v-card-actions>
      <v-btn @click="toggleComplete(id, !completed)">
        {{ completed ? 'Mark as Incomplete' : 'Mark as Complete' }}
      </v-btn>
      <v-btn @click="deleteTodo(id)" color="red">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    completed_at: {
      type: Date,
      required: false,
    },
    toggleComplete: {
      type: Function,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    }
  },
  methods: {
    formatDate(date: Date | undefined) {
      if (!date) return ''; 
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  }
});
</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px; /* Add margin to separate the cards */
}
</style>
