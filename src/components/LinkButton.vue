<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import LinkBase from '@/components/LinkBase.vue';

defineProps<{ to: RouteLocationRaw; disabled?: boolean }>();
</script>

<template>
  <button v-if="disabled" class="button" disabled>
    <slot></slot>
  </button>
  <LinkBase v-else :to="to" class="button">
    <slot></slot>
  </LinkBase>
</template>
