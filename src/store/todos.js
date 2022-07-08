import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodosStore = defineStore("todos", () => {
  const todos = ref([
    // {
    //   id: crypto.randomUUID(),
    //   desc: "First todo",
    //   due: "Jun 14, 2022",
    //   completed: false,
    //   tags: ["personal", "work"],
    // },
    {
      id: crypto.randomUUID(),
      desc: "item with long description for test",
      due: "Jun 16, 2022",
      completed: false,
      tags: ["test"],
    },
  ]);

  function addTodo(todo) {
    todos.value.push({
      id: crypto.randomUUID(),
      ...todo,
    });
  }

  function editTodo(id, todo) {
    const existing = todos.value.find((todo) => todo.id === id);

    if (existing) {
      const newTodo = {
        ...existing,
        ...todo,
      };

      todos.value = todos.value.map((todo) =>
        todo.id === existing.id ? { ...newTodo } : todo
      );
    }
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
  };
});
