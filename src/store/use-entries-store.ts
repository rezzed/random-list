import { defineStore } from 'pinia';

import { arrayToHash, hashToArray } from '@/utils/array-to-hash';
import { inputToArray } from '@/utils/input-to-array';
import { sortArray } from '@/utils/sort-array';

export const useEntriesStore = defineStore('entries', {
  state: () => ({
    list: [] as string[],
    hash: '',
    error: {
      isInvalidHash: false,
      isHashTooLong: false,
    },
  }),

  getters: {
    asInput: (state) => state.list.join('\n'),
    count: (state) => state.list.length,
    isEmpty: (state) => state.list.length <= 0,
  },

  actions: {
    fromHash(rawHash: string) {
      const list = sortArray(hashToArray(rawHash));
      const hash = arrayToHash(list);
      // If we did not generate the raw hash, remove it.
      if (hash !== rawHash) {
        this.hash = '';
        this.list = [];
        this.error.isInvalidHash = true;
      } else {
        this.hash = hash;
        this.list = list;
        this.error.isInvalidHash = false;
      }
    },

    fromInput(rawInput: string) {
      const list = sortArray(inputToArray(rawInput));
      const hash = arrayToHash(list);
      // limit the hash size, else the url gets too long
      if (hash.length > 2000) {
        this.hash = '';
        this.list = [];
        this.error.isHashTooLong = true;
      } else {
        this.hash = hash;
        this.list = list;
        this.error.isHashTooLong = false;
      }
    },
  },
});
