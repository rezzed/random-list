<script setup lang="ts">
import { nextTick, ref, watch, watchEffect } from 'vue';

const props = defineProps<{ isPlaying: boolean; volume: number; name: string }>();

const audioElement = ref<HTMLAudioElement | null>(null);
const fileName = ref<string | null>(null);

watch(
  () => props.name,
  async (value) => {
    // Force the <audio> element to be re-created,
    // else the changed sound files will not be loaded.
    fileName.value = null;
    await nextTick();
    fileName.value = value;
  },
  { immediate: true },
);

watchEffect(() => {
  const el = audioElement.value;
  if (el && props.volume) {
    el.volume = props.volume / 100;
  }
});

watchEffect(() => {
  const el = audioElement.value;
  if (el) {
    if (props.isPlaying) {
      el.play();
    } else {
      // "stop"
      el.pause();
      el.currentTime = 0;
    }
  }
});
</script>

<template>
  <audio v-if="fileName" preload="auto" loop ref="audioElement">
    <source :src="`assets/audio/${fileName}.ogg`" type="audio/ogg" />
    <source :src="`assets/audio/${fileName}.mp3`" type="audio/mpeg" />
  </audio>
</template>
