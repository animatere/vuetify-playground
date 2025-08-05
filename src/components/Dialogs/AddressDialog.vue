<template>
  <v-dialog v-model="localVisible" max-width="300px">
    <address-view></address-view>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  addressDialogVisible: boolean;
}>();

const emit = defineEmits<{
  (e: "update:addressDialogVisible", value: boolean): void;
  (e: "confirmSave"): void;
}>();

const localVisible = ref(props.addressDialogVisible);

watch(
  () => props.addressDialogVisible,
  (newVal) => {
    localVisible.value = newVal;
  },
);

function closeDialog() {
  emit("update:addressDialogVisible", false);
}

function confirmSaveClicked() {
  emit("confirmSave");
  emit("update:addressDialogVisible", false);
}
</script>
