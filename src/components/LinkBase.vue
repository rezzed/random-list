<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link :to="to" class="user-select-none" v-no-drag>
    <slot></slot>
  </router-link>
</template>
