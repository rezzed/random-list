<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import { svgIconPathMap } from '@/components/SvgIconPathName';
import type { SvgIconPathName } from '@/components/SvgIconPathName';

const props = defineProps({
  name: {
    type: String as PropType<SvgIconPathName>,
    required: true,
    validator: (value: SvgIconPathName) => !!svgIconPathMap[value],
  },
});
const path = computed(() => svgIconPathMap[props.name]);
</script>

<template>
  <span class="icon user-select-none">
    <svg style="width: 1em; height: 1em" viewBox="0 0 24 24">
      <path fill="currentColor" :d="path" />
    </svg>
  </span>
</template>
