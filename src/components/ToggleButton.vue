<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import ThrottledButton from '@/components/ThrottledButton.vue';
import type { SvgIconPathName } from '@/components/SvgIconPathName';

const props = defineProps<{ selected: boolean }>();
const iconName = computed<SvgIconPathName>(() =>
  props.selected ? 'mdiCheckboxMarkedCircleOutline' : 'mdiCheckboxBlankCircleOutline',
);
</script>

<template>
  <ThrottledButton class="is-rounded" :class="{ 'is-primary': selected }">
    <SvgIcon :name="iconName"></SvgIcon>
    <span><slot>Default</slot></span>
  </ThrottledButton>
</template>
