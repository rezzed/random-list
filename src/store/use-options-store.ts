import { computed, ComputedRef, Ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { useSelectedEntriesStore } from '@/store/use-selected-entries-store';

/** A set of state value, getter value and toggle action */
type ToggleOption = [Ref<true | null>, ComputedRef<boolean>, () => void];

// ------------------------------------

export const useOptionsStore = defineStore('options', () => {
  // is the tab "ListSelectView.vue" enabled and available?
  const [rawListSelectEnabled, isListSelectEnabled, toggleListSelectEnabled] = createToggleOption(
    'listSelectEnabled',
    () => {
      const selectedEntries = useSelectedEntriesStore();
      selectedEntries.rawDeselectedEntries = null;
    },
  );

  return {
    // state
    rawListSelectEnabled,
    // getters
    isListSelectEnabled,
    // actions
    toggleListSelectEnabled,
  };
});

// ------------------------------------

/**
 * Create a single boolean option with state value, getter value and toggle action.
 *
 * @param key The storage key of the option, should be unique.
 * @param disableCallback Called when the option gets disabled. Use to toggle and remove other stored values.
 * @param enableCallback Called when the option gets enabled.
 */

function createToggleOption(
  key: string,
  disableCallback?: () => void,
  enableCallback?: () => void,
): ToggleOption {
  const rawEnabled = useStorage<true | null>(key, null, undefined, {
    serializer: StorageSerializers.boolean,
  });

  const isEnabled = computed(() => !!rawEnabled.value);

  if (disableCallback || enableCallback) {
    watch(
      isEnabled,
      (value) => {
        if (value && enableCallback) {
          enableCallback();
        } else if (!value && disableCallback) {
          disableCallback();
        }
      },
      { immediate: true },
    );
  }

  function toggleEnabled() {
    if (rawEnabled.value) {
      rawEnabled.value = null;
    } else {
      rawEnabled.value = true;
    }
  }

  return [rawEnabled, isEnabled, toggleEnabled];
}
