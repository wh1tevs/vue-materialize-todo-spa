<script setup>
import { onMounted, reactive, ref, toRaw, toRefs } from "vue";
import { useMaterialize } from "../composables/useMaterialize";
import { useTodosStore } from "../store/todos";
import VTodoForm from "./VTodoForm.vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const M = useMaterialize();
const { editTodo } = toRefs(useTodosStore());

const modal = ref(null);

const formData = reactive(toRaw(props.todo));

onMounted(() => {
  M.Modal.init(modal.value);
});
</script>

<template>
  <Teleport to="body">
    <div ref="modal" id="todo-edit-modal" class="modal">
      <div class="modal-content">
        <h4>Edit todo</h4>
        <VTodoForm v-model="formData" />
      </div>
      <div class="modal-footer">
        <button class="btn modal-close">Cancel</button>
        <button class="btn modal-close" @click="editTodo(todo.id, formData)">
          Save
        </button>
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
