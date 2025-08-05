<template>
  <v-dialog v-model="localVisible" max-width="300px">
    <v-card>
      <v-row>
        <p>Do you really want to remove this item?</p>
        <v-col>
          <v-btn @click="confirmRemoveClicked" color="primary">Ok</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="closeDialog" color="warning">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  warningDialogVisible: boolean;
}>();

const emit = defineEmits<{
  (e: "update:warningDialogVisible", value: boolean): void;
  (e: "confirmRemove"): void;
}>();

const localVisible = ref(props.warningDialogVisible);

watch(
  () => props.warningDialogVisible,
  (newVal) => {
    localVisible.value = newVal;
  },
);

function closeDialog() {
  emit("update:warningDialogVisible", false);
}

function confirmRemoveClicked() {
  emit("confirmRemove");
  emit("update:warningDialogVisible", false);
}
</script>
