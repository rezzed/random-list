<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { refAutoReset, useIntervalFn } from '@vueuse/core';
import { useOptionAudioStore, useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';
import OptionsFieldSelect from '@/components/OptionsFieldSelect.vue';
import PlayStopButton from '@/components/PlayStopButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const options = useOptionsStore();
const optionAudio = useOptionAudioStore();
const isTemporaryDisabled = refAutoReset(false, 600);

const selectedAudio = computed({
  get: () => optionAudio.selected,
  set: (value) => optionAudio.setSelected(value),
});

const selectedVolume = computed({
  get: () => optionAudio.volume,
  set: (value) => optionAudio.setVolume(value),
});

const labelCss = computed(() => (options.isAudioEnabled ? '' : 'is-disabled'));
const buttonCss = computed(() => (options.isAudioEnabled ? 'is-primary' : 'is-static'));

// Required for a visible countdown while listening to the preview.
const seconds = ref();
const { pause: stopTimeout, resume: startTimeout } = useIntervalFn(
  () => {
    if (!seconds.value || seconds.value <= 1) {
      stopTimeout();
      // Prevent the user from re-starting the audio if it just finished.
      isTemporaryDisabled.value = true;
      stopAudio();
    } else {
      seconds.value--;
    }
  },
  1000,
  {
    immediate: false,
  },
);

// Stop all timeouts in this view – the audio itself will be stopped
// from inside the store.
watch(
  () => [options.isAudioEnabled, optionAudio.selected],
  () => {
    stopTimeout();
    if (!options.isAudioEnabled) {
      isTemporaryDisabled.value = false;
    }
  },
);

// Important! CLear the playing state when leaving this page.
// The interval is cleared automatically.
onBeforeUnmount(stopAudio);

function toggleAudioPlaying() {
  optionAudio.togglePlaying();
  if (optionAudio.isPlaying) {
    seconds.value = 8;
    startTimeout();
  } else {
    stopTimeout();
  }
}

function stopAudio() {
  optionAudio.setPlaying(false);
}
</script>

<template>
  <OptionsBox :selected="options.isAudioEnabled" @toggle="options.toggleAudioEnabled">
    <template #title>Enable music</template>
    <template #default>
      <p>
        When the &quot;{{ options.randomiseButtonLabel }}&quot; button is held down in the
        &quot;Randomise list entries&quot; tab, a piece of music is played.
      </p>

      <div class="field">
        <label class="label is-flex is-justify-content-space-between" :class="labelCss">
          <span>Music file</span>
          <transition name="fade">
            <span v-if="optionAudio.isPlaying" class="tag is-primary has-text-weight-normal">
              {{ seconds }}s
            </span>
          </transition>
        </label>
      </div>

      <OptionsFieldSelect v-model="selectedAudio" :disabled="!options.isAudioEnabled">
        <template #default>
          <option v-for="audio in optionAudio.list" :value="audio" :key="audio.label">
            {{ audio.label }}
          </option>
        </template>
        <template #end>
          <PlayStopButton
            :disabled="isTemporaryDisabled || !optionAudio.canPlay"
            :playing="optionAudio.isPlaying"
            :class="buttonCss"
            @click="toggleAudioPlaying()"
            what="preview"
          >
            Preview
          </PlayStopButton>
        </template>
      </OptionsFieldSelect>

      <OptionsFieldSelect
        label="Volume"
        v-model="selectedVolume"
        :disabled="!options.isAudioEnabled"
      >
        <template #start>
          <button
            class="button"
            @click="optionAudio.volumeDecrease()"
            :disabled="!optionAudio.volumeCanDecrease"
          >
            <SvgIcon name="mdiMinusThick"></SvgIcon>
          </button>
        </template>
        <template #default>
          <option v-for="step in optionAudio.volumeSteps" :value="step" :key="step.label">
            {{ step.label }}
          </option>
        </template>
        <template #end>
          <button
            class="button"
            @click="optionAudio.volumeIncrease()"
            :disabled="!optionAudio.volumeCanIncrease"
          >
            <SvgIcon name="mdiPlusThick"></SvgIcon>
          </button>
        </template>
      </OptionsFieldSelect>
    </template>
  </OptionsBox>
</template>
