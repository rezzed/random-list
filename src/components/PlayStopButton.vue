<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import ThrottledButton from '@/components/ThrottledButton.vue';
import type { SvgIconPathName } from '@/components/SvgIconPathName';

const props = defineProps<{ playing: boolean; what?: string }>();

const iconName = computed<SvgIconPathName>(() => (props.playing ? 'mdiStop' : 'mdiPlay'));

const title = computed(() => {
  let end = props.what ? ` ${props.what}` : '';
  return `Click to ${props.playing ? 'stop' : 'play'}${end}`;
});
</script>

<template>
  <ThrottledButton :title="title">
    <SvgIcon :name="iconName"></SvgIcon>
    <span v-if="$slots.default"><slot></slot></span>
  </ThrottledButton>
</template>
