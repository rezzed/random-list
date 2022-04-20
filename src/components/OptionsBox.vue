<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import type { SvgIconPathName } from '@/components/SvgIconPathName';

defineEmits(['toggle']);

const props = withDefaults(defineProps<{ selected: boolean; enabled?: boolean }>(), {
  enabled: true,
});

const iconName = computed<SvgIconPathName>(() => {
  if (props.selected) {
    return 'mdiCheckboxMarkedCircleOutline';
  }
  if (props.enabled) {
    return 'mdiCheckboxBlankCircleOutline';
  }
  return 'mdiCircleOffOutline';
});
const titleHint = computed(() => {
  if (props.selected) {
    return 'Option enabled, click to disable option';
  }
  if (props.enabled) {
    return 'Option disabled, click to enable option';
  }
  return 'This option cannot be enabled';
});
</script>

<template>
  <article class="tile is-child message" :class="{ 'is-primary': selected }">
    <div
      class="message-header"
      :class="{ 'is-clickable': enabled }"
      @click="$emit('toggle')"
      :title="titleHint"
    >
      <span><slot name="title">Title</slot></span>
      <SvgIcon :name="iconName"></SvgIcon>
    </div>
    <div class="message-body">
      <slot>Default</slot>
    </div>
  </article>
</template>
