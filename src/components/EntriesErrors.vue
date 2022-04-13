<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEntriesStore, useSelectedEntriesStore } from '@/store';

const route = useRoute();
const entries = useEntriesStore();
const selectedEntries = useSelectedEntriesStore();

const showEmptyEntriesError = computed(() => entries.isEmpty && route.name !== 'list-create');
const showEmptySelectedEntriesError = computed(
  () => !entries.isEmpty && selectedEntries.isEmpty && route.name === 'list-random',
);
</script>

<template>
  <div v-if="entries.error.isInvalidHash" class="content">
    <article class="message is-danger">
      <div class="message-header">
        <span>Error</span>
        <button class="delete" @click="entries.error.isInvalidHash = false"></button>
      </div>
      <div class="message-body">
        The hash you entered in the url was invalid and has therefore been removed.
      </div>
    </article>
  </div>
  <div v-if="entries.error.isHashTooLong" class="content">
    <article class="message is-danger">
      <div class="message-header">
        <span>Error</span>
        <button class="delete" @click="entries.error.isHashTooLong = false"></button>
      </div>
      <div class="message-body">There are to many entries in the list. Please remove some.</div>
    </article>
  </div>
  <div v-if="showEmptyEntriesError" class="content">
    <article class="message is-danger">
      <div class="message-body">
        <strong>Note:</strong> The list is empty. Please
        <router-link :to="{ name: 'list-create' }">create list entries</router-link>.
      </div>
    </article>
  </div>
  <div v-if="showEmptySelectedEntriesError" class="content">
    <article class="message is-danger">
      <div class="message-body">
        <strong>Note:</strong> No entries selected. Please
        <router-link :to="{ name: 'list-select', hash: entries.hash }"
          >select list entries</router-link
        >.
      </div>
    </article>
  </div>
</template>
