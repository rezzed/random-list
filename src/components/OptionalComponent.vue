<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { NOOP } from '@/utils/noop';

const props = defineProps<{ comp: string | null }>();

const optionalComp = computed(() => {
  if (!props.comp) {
    return;
  }
  return defineAsyncComponent({
    // no backticks here, as WebStorm will complaint about the path
    loader: () => import('./optional-components/' + props.comp + '.vue'),
    // this component returns "undefined" = nothing is shown.
    errorComponent: NOOP,
    timeout: 5000,
  });
});
</script>

<template>
  <component :is="optionalComp" v-bind="$attrs"></component>
</template>
