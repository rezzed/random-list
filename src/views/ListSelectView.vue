<script setup lang="ts">
import { computed } from 'vue';
import { useEntriesStore, useSelectedEntriesStore } from '@/store';
import LinkButton from '@/components/LinkButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import ThrottledButton from '@/components/ThrottledButton.vue';
import ToggleButton from '@/components/ToggleButton.vue';

const entries = useEntriesStore();
const selectedEntries = useSelectedEntriesStore();

const shouldSelectAll = computed(() => selectedEntries.count < entries.count);

function toggleSelection() {
  if (shouldSelectAll.value) {
    selectedEntries.selectAllEntries();
  } else {
    selectedEntries.deselectAllEntries();
  }
}
</script>

<template>
  <div class="content">
    <div class="field">
      <label class="label is-flex is-justify-content-space-between">
        <span>Select the entries to randomise</span>
        <span
          class="tag is-primary has-text-weight-normal"
          title="Number of selected entries / number of all entries"
        >
          {{ selectedEntries.count }} / {{ entries.count }}
        </span>
      </label>
      <div class="control">
        <div class="notification">
          <div class="buttons">
            <template v-for="entry in entries.list" :key="entry">
              <ToggleButton
                :selected="selectedEntries.isEntrySelected(entry)"
                @click="selectedEntries.toggleEntry(entry)"
              >
                {{ entry }}
              </ToggleButton>
            </template>
          </div>
        </div>
      </div>
      <p class="help">Only the selected entries will be randomised.</p>
    </div>
  </div>

  <div class="content is-flex is-justify-content-space-between">
    <ThrottledButton @click="toggleSelection" :disabled="entries.isEmpty">
      {{ shouldSelectAll ? 'Select all entries' : 'Select no entries' }}
    </ThrottledButton>

    <LinkButton
      :to="{ name: 'list-random', hash: entries.hash }"
      class="is-primary mr-0"
      :disabled="selectedEntries.isEmpty"
    >
      <SvgIcon name="mdiShuffleVariant"></SvgIcon>
      <span class="is-hidden-mobile">Randomise entries</span>
      <span class="is-hidden-tablet">Randomise</span>
    </LinkButton>
  </div>
</template>
