<script setup>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useMaterialize } from "../composables/useMaterialize";
import { useTodosStore } from "../store/todos";
import VTodoForm from "./VTodoForm.vue";

const M = useMaterialize();
const { addTodo } = toRefs(useTodosStore());

const modal = ref(null);

const formData = reactive({
  desc: null,
  due: null,
  tags: [],
});

onMounted(() => {
  M.Modal.init(modal.value, {
    onOpenStart: () => {
      formData.desc = null;
      formData.due = null;
    },
  });
});
</script>

<template>
  <Teleport to="body">
    <div ref="modal" id="todo-add-modal" class="modal">
      <div class="modal-content">
        <h4>Add todo</h4>
        <VTodoForm v-model="formData" />
      </div>
      <div class="modal-footer">
        <button class="btn modal-close">Cancel</button>
        <button class="btn modal-close" @click="addTodo(formData)">Save</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-footer {
  display: flex;
  justify-content: space-between;
}
</style>
