<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useIntervalFn } from '@vueuse/core';

const THEME = ['184daf', '1c8728', 'cc9604', 'a01417'] as const;
const RAINBOW = ['ee82ee', '4b0082', '0000FF', '008000', 'ffff00', 'ffa500', 'ff0000'] as const;

const props = defineProps<{ settings?: Record<string, string>; variation?: string }>();

const styleObject = reactive({
  backgroundColor: undefined as string | undefined,
  transitionDuration: undefined as string | undefined,
});

const intervalMs = computed(() => {
  if (hasSetting('Speed', 'slow')) {
    return 600;
  }
  if (hasSetting('Speed', 'fast')) {
    return 300;
  }
  return 400;
});

let index = 0;

watch(intervalMs, () => {
  index = 0;
});

// starts immediately, will be automatically removed on scope destroy
useIntervalFn(() => {
  createNewBgColor();
}, intervalMs);

function createNewBgColor() {
  let backgroundColor;
  if (hasSetting('Color', 'random')) {
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    backgroundColor = Math.floor(Math.random() * 16777215).toString(16);
  } else if (hasSetting('Color', 'rainbow')) {
    backgroundColor = RAINBOW[index];
    index = (index + 1) % RAINBOW.length;
  } else {
    // default: Color theme
    backgroundColor = THEME[index];
    index = (index + 1) % THEME.length;
  }

  styleObject.backgroundColor = '#' + backgroundColor;
  styleObject.transitionDuration = props.variation === 'fade' ? '240ms' : undefined;
}

function hasSetting(key: string, value: string) {
  return props.settings?.[key] === value;
}
</script>

<template>
  <teleport to="body">
    <div class="bg-animation-container" :style="styleObject"></div>
  </teleport>
</template>

<style lang="scss" scoped>
.bg-animation-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  transition: background-color linear;
}
</style>
