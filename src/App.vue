<script setup>
import { toRefs } from "vue";
import VTodoList from "./components/VTodoList.vue";
import { useTodosStore } from "./store/todos";
import VTodoAddModal from "./components/VTodoAddModal.vue";

const { todos } = toRefs(useTodosStore());
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <button
          data-target="todo-add-modal"
          class="btn full-width modal-trigger"
        >
          Add todo
        </button>
      </div>
    </div>
    <VTodoList :todos="todos" />
  </div>
  <VTodoAddModal />
</template>
