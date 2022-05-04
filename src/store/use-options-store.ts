import { computed, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { defineStore } from 'pinia';
import { StorageSerializers, useShare, useStorage } from '@vueuse/core';
import { useSelectedEntriesStore } from '@/store/use-selected-entries-store';
import { useOptionAudioStore } from '@/store/use-option-audio-store';
import { useOptionBgAnimationStore } from '@/store/use-option-bg-animation-store';

/** A set of state value, getter value and toggle action */
type ToggleOption = [Ref<true | null>, ComputedRef<boolean>, () => void, ComputedRef<boolean>];

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

  // is an animated background available when rendomising the list entries?
  const [rawBgAnimationEnabled, isBgAnimationEnabled, toggleBgAnimationEnabled] =
    createToggleOption(
      'bgAnimationEnabled',
      () => {
        const optionBgAnimation = useOptionBgAnimationStore();
        optionBgAnimation.disable();
      },
      () => {
        const optionBgAnimation = useOptionBgAnimationStore();
        optionBgAnimation.enable();
      },
    );

  // is audio available when rendomising the list entries?
  const [rawAudioEnabled, isAudioEnabled, toggleAudioEnabled] = createToggleOption(
    'audioEnabled',
    () => {
      const optionAudio = useOptionAudioStore();
      optionAudio.disable();
    },
    () => {
      const optionAudio = useOptionAudioStore();
      optionAudio.enable();
    },
  );

  // is the button "Randomise list" instead of "Re-randomise list" enabled?
  const [rawRandomiseButtonEnabled, isRandomiseButtonEnabled, toggleRandomiseButtonEnabled] =
    createToggleOption('randomiseButtonEnabled');
  const randomiseButtonLabel = computed(() =>
    isRandomiseButtonEnabled.value ? 'Randomise list' : 'Re-randomise list',
  );

  // is the button "Share" instead of "Copy" enabled and available?
  const [
    rawShareButtonEnabled,
    isShareButtonEnabled,
    toggleShareButtonEnabled,
    canShareButtonBeEnabled,
  ] = createToggleOption('shareButtonEnabled', undefined, undefined, () => {
    const { isSupported } = useShare();
    return isSupported;
  });

  // ----------------------------------
  return {
    // state
    rawListSelectEnabled,
    rawBgAnimationEnabled,
    rawAudioEnabled,
    rawRandomiseButtonEnabled,
    rawShareButtonEnabled,
    // getters
    isListSelectEnabled,
    isBgAnimationEnabled,
    isAudioEnabled,
    isRandomiseButtonEnabled,
    randomiseButtonLabel,
    isShareButtonEnabled,
    canShareButtonBeEnabled,
    // actions
    toggleListSelectEnabled,
    toggleBgAnimationEnabled,
    toggleAudioEnabled,
    toggleRandomiseButtonEnabled,
    toggleShareButtonEnabled,
  };
});

// ------------------------------------

/**
 * Create a single boolean option with state value, getter value and toggle action.
 *
 * @param key The storage key of the option, should be unique.
 * @param disableCallback Called when the option gets disabled. Use to toggle and remove other stored values.
 * @param enableCallback Called when the option gets enabled.
 * @param checkCanBeEnabled Function that returns a boolean and is used to check if the conditions
 * are met to allow the current option.
 */

function createToggleOption(
  key: string,
  disableCallback?: () => void,
  enableCallback?: () => void,
  checkCanBeEnabled?: () => boolean,
): ToggleOption {
  const rawEnabled = useStorage<true | null>(key, null, undefined, {
    serializer: StorageSerializers.boolean,
  });

  const isEnabled = computed(() => !!rawEnabled.value);
  const canBeEnabled = computed(() => (checkCanBeEnabled ? checkCanBeEnabled() : true));

  if (disableCallback || enableCallback) {
    // if a callback is required, watch the option toggling
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

  if (checkCanBeEnabled) {
    // disable the option if it cannot be enabled
    watch(
      canBeEnabled,
      (value) => {
        if (!value && rawEnabled.value) {
          rawEnabled.value = null;
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

  return [rawEnabled, isEnabled, toggleEnabled, canBeEnabled];
}
