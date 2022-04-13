import { defineStore } from 'pinia';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { useEntriesStore } from '@/store/use-entries-store';
import { arrayWithout } from '@/utils/array-without';
import { arrayWith } from '@/utils/array-with';

export const useSelectedEntriesStore = defineStore('selected', {
  state: () => ({
    // The deselected entries are persisted in the localStorage and shared across all app instances.
    // If a user selects or deselects any entry, it is instantly shared with all windows.
    // Note: the loaded selected list may contain entries not on the current list!
    rawDeselectedEntries: useStorage<string[] | null>('deselectedEntries', null, undefined, {
      serializer: StorageSerializers.object,
    }),
  }),

  getters: {
    selected(): string[] {
      const entries = useEntriesStore();
      if (!this.rawDeselectedEntries) {
        return entries.list;
      }
      return arrayWithout(entries.list, this.rawDeselectedEntries);
    },
    count(): number {
      return this.selected.length;
    },
    isEmpty(): boolean {
      return this.selected.length <= 0;
    },
  },

  actions: {
    toggleEntry(entry: string) {
      if (this.isEntrySelected(entry)) {
        this.deselectEntry(entry);
      } else {
        this.selectEntry(entry);
      }
    },

    isEntrySelected(entry: string) {
      return this.selected.includes(entry);
    },

    selectEntry(entry: string) {
      if (this.rawDeselectedEntries && !this.isEntrySelected(entry)) {
        const deselectedEntries = arrayWithout(this.rawDeselectedEntries, entry);
        // If there are no more deselected entries, remove the object from the local storage.
        this.rawDeselectedEntries = deselectedEntries.length ? deselectedEntries : null;
      }
    },

    deselectEntry(entry: string) {
      if (this.isEntrySelected(entry)) {
        this.rawDeselectedEntries = arrayWith(this.rawDeselectedEntries, entry);
      }
    },

    selectAllEntries() {
      if (this.rawDeselectedEntries) {
        const entries = useEntriesStore();
        const deselectedEntries = arrayWithout(this.rawDeselectedEntries, entries.list);
        // If there are no more deselected entries, remove the object from the local storage.
        this.rawDeselectedEntries = deselectedEntries.length ? deselectedEntries : null;
      }
    },

    deselectAllEntries() {
      const entries = useEntriesStore();
      this.rawDeselectedEntries = arrayWith(this.rawDeselectedEntries, entries.list);
    },
  },
});
