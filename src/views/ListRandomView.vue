<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { refDebounced, useIntervalFn, useMousePressed } from '@vueuse/core';
import { useOptionBgAnimationStore, useSelectedEntriesStore } from '@/store';
import { shuffleArray } from '@/utils/shuffle-array';
import { arrayHasSameOrder } from '@/utils/array-has-same-order';
import ShareCopyButton from '@/components/ShareCopyButton.vue';

const selectedEntries = useSelectedEntriesStore();
const optionBgAnimation = useOptionBgAnimationStore();

const randomEntries = ref(selectedEntries.selected.concat());
const randomEntriesAsText = computed(() => randomEntries.value.join('\n'));

const shuffleButtonElement = ref(null);
// If the button is pressed, this might be the start of a "click"...
const { pressed: isMousePressed } = useMousePressed({ target: shuffleButtonElement });
// ...that's why we debounce this before we treat the button as "held down".
// isMouseButtonHeldDown is used to show the spinner icon on the shuffle button.
const isMouseButtonHeldDown = refDebounced(isMousePressed, 240);

const showSpinnerAnimation = computed(() => isMousePressed.value && isMouseButtonHeldDown.value);

// a 120ms interval looks like a nice re-shuffle animation
const reShuffleInterval = useIntervalFn(randomiseList, 120, { immediate: false });

function randomiseList() {
  // The "if" allows the button to be clicked normally
  // and prevents an additional re-shuffle after being "held down".
  if (isMousePressed.value === isMouseButtonHeldDown.value) {
    shuffleArray(randomEntries.value);

    // If the button was clicked, or the page was just opened,
    // re-shuffle the list if the order is the same.
    // It happens -- and just "feels" like a bug, thus we try to avoid it.
    if (
      !isMouseButtonHeldDown.value &&
      randomEntries.value.length > 2 &&
      arrayHasSameOrder(randomEntries.value, selectedEntries.selected)
    ) {
      let i = 5;
      do {
        shuffleArray(randomEntries.value);
      } while (--i > 0 && arrayHasSameOrder(randomEntries.value, selectedEntries.selected));
    }
  }
}

watch(isMousePressed, (value) => {
  if (value) {
    reShuffleInterval.resume();
  } else {
    reShuffleInterval.pause();
  }
});

watch(showSpinnerAnimation, (value) => {
  optionBgAnimation.setPlaying(value);
});

onMounted(randomiseList);
</script>

<template>
  <div class="content">
    <div class="field">
      <label for="random-list-ta" class="label">The randomised entries</label>
      <div class="control">
        <textarea
          id="random-list-ta"
          v-model="randomEntriesAsText"
          class="textarea has-fixed-size"
          placeholder="The list is empty"
          rows="10"
          readonly
          v-select-on-focus
        ></textarea>
      </div>
      <p class="help">
        When the &quot;Re-randomise list&quot; button is held down, the list entries will be
        randomised multiple times.
      </p>
    </div>
  </div>
  <div class="content is-flex is-justify-content-space-between">
    <button
      class="button shuffle"
      :class="{ 'is-loading': showSpinnerAnimation }"
      ref="shuffleButtonElement"
      @click="randomiseList"
      :disabled="selectedEntries.isEmpty"
      title="Keep the button held down to randomise the list entries multiple times."
    >
      Re-randomise list
    </button>

    <ShareCopyButton class="mr-0" :value="randomEntriesAsText" :disabled="selectedEntries.isEmpty"
      >entries</ShareCopyButton
    >
  </div>
</template>
