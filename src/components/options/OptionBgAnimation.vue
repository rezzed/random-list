<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { refAutoReset, useIntervalFn } from '@vueuse/core';
import { useOptionBgAnimationStore, useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';
import OptionsFieldSelect from '@/components/OptionsFieldSelect.vue';
import PlayStopButton from '@/components/PlayStopButton.vue';

const options = useOptionsStore();
const optionBgAnimation = useOptionBgAnimationStore();
const isTemporaryDisabled = refAutoReset(false, 600);

const selectedBgAnimation = computed({
  get: () => optionBgAnimation.selected,
  set: (value) => optionBgAnimation.setSelected(value),
});

const labelCss = computed(() => (options.isBgAnimationEnabled ? '' : 'is-disabled'));
const buttonCss = computed(() => (options.isBgAnimationEnabled ? 'is-primary' : 'is-static'));

// Required for a visible countdown while showing the preview.
const seconds = ref();
const { pause: stopTimeout, resume: startTimeout } = useIntervalFn(
  () => {
    if (!seconds.value || seconds.value <= 1) {
      stopTimeout();
      // Prevent the user from re-starting the animation if it just finished.
      isTemporaryDisabled.value = true;
      stopAnimation();
    } else {
      seconds.value--;
    }
  },
  1000,
  {
    immediate: false,
  },
);

// Stop all timeouts in this view – the animation itself will be stopped
// from inside the store.
watch(
  () => [options.isBgAnimationEnabled, optionBgAnimation.selected],
  () => {
    stopTimeout();
    if (!options.isBgAnimationEnabled) {
      isTemporaryDisabled.value = false;
    }
  },
);

// Important! CLear the playing state when leaving this page.
// The interval is cleared automatically.
onBeforeUnmount(stopAnimation);

function toggleBgAnimationPlaying() {
  optionBgAnimation.togglePlaying();
  if (optionBgAnimation.isPlaying) {
    seconds.value = 8;
    startTimeout();
  } else {
    stopTimeout();
  }
}

function stopAnimation() {
  optionBgAnimation.setPlaying(false);
}
</script>

<template>
  <OptionsBox :selected="options.isBgAnimationEnabled" @toggle="options.toggleBgAnimationEnabled">
    <template #title>Enable background animations</template>
    <template #default>
      <p>
        When the &quot;Re-randomise list&quot; button is held down in the &quot;Randomise list
        entries&quot; tab, the background will be animated.
      </p>

      <div class="field">
        <label class="label is-flex is-justify-content-space-between" :class="labelCss">
          <span>Animation</span>
          <transition name="fade">
            <span v-if="optionBgAnimation.isPlaying" class="tag is-primary has-text-weight-normal">
              {{ seconds }}s
            </span>
          </transition>
        </label>
      </div>

      <OptionsFieldSelect v-model="selectedBgAnimation" :disabled="!options.isBgAnimationEnabled">
        <template #default>
          <option
            v-for="animation in optionBgAnimation.list"
            :value="animation"
            :key="animation.label"
          >
            {{ animation.label }}
          </option>
        </template>
        <template #end>
          <PlayStopButton
            :disabled="isTemporaryDisabled || !optionBgAnimation.canPlay"
            :playing="optionBgAnimation.isPlaying"
            :class="buttonCss"
            @click="toggleBgAnimationPlaying()"
            what="preview"
          >
            Preview
          </PlayStopButton>
        </template>
      </OptionsFieldSelect>

      <template v-if="optionBgAnimation.hasPossibleSettings">
        <div class="field">
          <label class="label" :class="labelCss">Settings</label>
        </div>

        <template
          v-for="setting in optionBgAnimation.selected.possibleSettings"
          :key="setting.label"
        >
          <OptionsFieldSelect
            :label="setting.label"
            :modelValue="optionBgAnimation.selectedSettings[setting.label]"
            @update:modelValue="(value) => optionBgAnimation.setSetting(setting.label, value)"
            :disabled="!options.isBgAnimationEnabled"
          >
            <option v-for="option in setting.options" :value="option" :key="option">
              {{ option }}
            </option>
          </OptionsFieldSelect>
        </template>
      </template>
    </template>
  </OptionsBox>
</template>
