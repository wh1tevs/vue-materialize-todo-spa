<script setup>
import { ref } from "vue";
import { useTodosStore } from "../store/todos";
import VTodoEditModal from "./VTodoEditModal.vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { editTodo, deleteTodo } = useTodosStore();

const isEditModalOpen = ref(false);

function switchState() {
  editTodo(props.todo.id, {
    completed: !props.todo.completed,
  });
}

function editHandler() {
  isEditModalOpen.value = true;
}
</script>

<template>
  <li class="card todo-item">
    <div class="todo-item--title">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          :checked="todo.completed"
          @click="switchState"
        />
        <span
          :class="{
            'todo-item--title__completed': todo.completed,
          }"
        >
          {{ todo.desc }}{{ todo.due && ` (${todo.due})` }}
        </span>
      </label>
    </div>
    <div class="todo-item--tags">
      <div v-for="(text, index) of todo.tags" :key="index" class="chip">
        {{ text }}
      </div>
    </div>
    <div class="todo-item--actions">
      <button
        data-trigger="todo-edit-modal"
        href="#todo-edit-modal"
        class="btn-flat modal-trigger"
        @click="editHandler"
      >
        <i class="material-icons">edit</i>
      </button>
      <button class="btn-flat" @click="deleteTodo(todo.id)">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </li>
  <VTodoEditModal v-if="isEditModalOpen" :todo="todo" />
</template>

<style scoped>
.todo-item {
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: 1fr max-content auto;
  padding: 10px 20px;
}

.todo-item--title {
  display: flex;
  align-items: center;
}

.todo-item--title__completed {
  text-decoration: line-through !important;
}

.todo-item--tags {
  display: flex;
  align-items: center;
}

.todo-item--actions {
  display: flex;
  justify-content: flex-end;
}
</style>
