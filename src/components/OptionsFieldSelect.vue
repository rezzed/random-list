<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{ modelValue: unknown; disabled?: boolean; label?: string }>();
const emit = defineEmits(['update:modelValue']);

const selectModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div class="field has-addons">
    <div v-if="label || $slots.label || $slots.start" class="control">
      <slot name="start">
        <button class="button is-static" :class="{ 'is-disabled': disabled }">
          <slot name="label">{{ label }}</slot>
        </button>
      </slot>
    </div>
    <div class="control is-expanded">
      <div class="select is-fullwidth" :class="{ 'is-disabled': disabled }">
        <select v-model="selectModel" :disabled="disabled">
          <slot></slot>
        </select>
      </div>
    </div>
    <div v-if="$slots.end" class="control">
      <slot name="end"></slot>
    </div>
  </div>
</template>
