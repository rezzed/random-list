<script setup lang="ts">
import { useOptionAudioStore, useOptionBgAnimationStore } from '@/store';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import OptionalComponent from '@/components/OptionalComponent.vue';

const optionBgAnimation = useOptionBgAnimationStore();
const optionAudio = useOptionAudioStore();
</script>

<template>
  <OptionalComponent
    :comp="optionBgAnimation.playingComp"
    :settings="optionBgAnimation.selectedSettings"
    :variation="optionBgAnimation.selected.variation"
  ></OptionalComponent>
  <transition name="fade">
    <TheHeader v-visible="!optionBgAnimation.isPlaying"></TheHeader>
  </transition>
  <router-view></router-view>
  <transition name="fade">
    <TheFooter v-visible="!optionBgAnimation.isPlaying"></TheFooter>
  </transition>
  <OptionalComponent
    v-if="optionAudio.canPlay"
    comp="AudioPlayer"
    :is-playing="optionAudio.isPlaying"
    :volume="optionAudio.volume.value"
    :name="optionAudio.selected.value"
  ></OptionalComponent>
</template>

<style lang="scss">
@import 'assets/styles/main';
</style>
