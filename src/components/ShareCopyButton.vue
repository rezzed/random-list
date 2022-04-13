<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard, useShare } from '@vueuse/core';
import SvgIcon from '@/components/SvgIcon.vue';
import { SvgIconPathName } from '@/components/SvgIconPathName';

const props = defineProps<{ value: string; disabled?: boolean }>();

const { copy, copied, isSupported: isClipboardSupported } = useClipboard();
const { share, isSupported: isShareSupported } = useShare();

const disabled = computed(
  () => !!(props.disabled || copied.value || (!isShareSupported && !isClipboardSupported)),
);

const title = computed(() => {
  if (isShareSupported) {
    return 'Click to share the text.';
  }
  if (isClipboardSupported) {
    return 'Click to copy the text to the clipboard.';
  }
  return 'The share and clipboard api is not supported by your browser. Please use the copy & paste functions of your browser.';
});

const state = computed(() => {
  let icon: SvgIconPathName = isClipboardSupported
    ? 'mdiClipboardMultipleOutline'
    : 'mdiClipboardOffOutline';
  let label = 'Copy';

  if (copied.value) {
    icon = 'mdiClipboardCheckMultiple';
  } else if (isShareSupported) {
    icon = 'mdiShare';
    label = 'Share';
  }

  return { icon, label };
});

function copyOrShare() {
  if (isShareSupported) {
    share({ text: props.value });
  } else {
    copy(props.value);
  }
}
</script>

<template>
  <button class="button is-primary" :disabled="disabled" @click="copyOrShare" :title="title">
    <SvgIcon :name="state.icon"></SvgIcon>
    <span class="is-hidden-mobile">{{ state.label }} <slot></slot></span>
    <span class="is-hidden-tablet">{{ state.label }}</span>
  </button>
</template>
