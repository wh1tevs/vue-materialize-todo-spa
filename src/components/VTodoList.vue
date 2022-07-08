<script setup>
import { computed } from "vue";
import VTodoItem from "./VTodoItem.vue";

const props = defineProps({
  todos: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
});

const uncompletedTodos = computed(() =>
  props.todos.filter((todo) => !todo.completed)
);

const completedTodos = computed(() =>
  props.todos.filter((todo) => todo.completed)
);
</script>

<template>
  <ul>
    <VTodoItem v-for="todo of uncompletedTodos" :key="todo.id" :todo="todo" />
    <VTodoItem v-for="todo of completedTodos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<style scoped>
.todo-list {
  display: flex;
  justify-content: center;
}
</style>
