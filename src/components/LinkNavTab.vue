<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link :to="to" custom v-slot="{ href, navigate, isExactActive }">
    <li :class="{ 'is-active': isExactActive }">
      <a :href="href" class="user-select-none" @click="navigate" v-no-drag>
        <slot></slot>
      </a>
    </li>
  </router-link>
</template>
