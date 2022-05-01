<script setup lang="ts">
import { computed } from 'vue';
import { refAutoReset, whenever } from '@vueuse/core';

const props = defineProps<{ disabled?: boolean }>();

const isTemporaryDisabled = refAutoReset(false, 600);
const isDisabled = computed(() => !!props.disabled || isTemporaryDisabled.value);

whenever(
  () => props.disabled,
  () => {
    isTemporaryDisabled.value = false;
  },
);

function handleClick() {
  isTemporaryDisabled.value = true;
}
</script>

<template>
  <button class="button" :disabled="isDisabled" @click="handleClick">
    <slot></slot>
  </button>
</template>
