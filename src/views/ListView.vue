<script setup lang="ts">
import EntriesErrors from '@/components/EntriesErrors.vue';
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <EntriesErrors></EntriesErrors>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>
