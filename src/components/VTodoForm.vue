<script setup>
import { computed } from "vue";
import { onMounted, ref } from "vue";
import { useMaterialize } from "../composables/useMaterialize";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const emit = defineEmits({
  "update:modelValue": null,
});

const M = useMaterialize();

const chips = ref(null);
const chipsData = ref([]);
const datepicker = ref(null);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function updateChips() {
  model.value.tags = chipsData.value.map(({ tag }) => tag);
}

onMounted(() => {
  M.Datepicker.init(datepicker.value, {
    container: "body",
    onSelect: (value) =>
      (model.value.due = new Date(value).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })),
  });

  chipsData.value = M.Chips.init(chips.value, {
    placeholder: "Tags",
    data: model.value.tags.map((tag) => ({
      tag,
    })),
    onChipAdd: updateChips,
    onChipDelete: updateChips,
  }).chipsData;
});
</script>

<template>
  <form action="#">
    <input type="text" placeholder="Description" v-model="model.desc" />
    <input
      ref="datepicker"
      type="text"
      class="datepicker"
      placeholder="Due date"
      :value="model.due"
    />
    <div ref="chips" class="chips chips-placeholder"></div>
  </form>
</template>
