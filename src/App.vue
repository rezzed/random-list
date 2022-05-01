<script setup lang="ts">
import { useOptionBgAnimationStore } from '@/store';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import OptionalComponent from '@/components/OptionalComponent.vue';

const optionBgAnimation = useOptionBgAnimationStore();
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
</template>

<style lang="scss">
@import 'assets/styles/main';
</style>
