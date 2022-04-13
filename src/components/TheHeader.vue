<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useEntriesStore, useOptionsStore } from '@/store';
import LinkBase from '@/components/LinkBase.vue';
import LinkNavTab from '@/components/LinkNavTab.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const entries = useEntriesStore();
const options = useOptionsStore();

const mobileNavActive = ref(false);

const navbarMenuElement = ref(null);
const navbarBurgerElement = ref(null);

onClickOutside(navbarMenuElement, closeMobileNav, { ignore: [navbarBurgerElement] });

function toggleMobileNav() {
  mobileNavActive.value = !mobileNavActive.value;
}

function closeMobileNav() {
  mobileNavActive.value = false;
}
</script>

<template>
  <section class="hero is-primary">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <LinkBase v-if="!$route.meta.hasLargeLogo" :to="{ name: 'home' }" class="navbar-item">
              <span class="icon-text">
                <span>random list</span>
                <SvgIcon name="mdiShuffleVariant"></SvgIcon>
              </span>
            </LinkBase>

            <a
              role="button"
              class="navbar-burger user-select-none"
              :class="{ 'is-active': mobileNavActive }"
              @click="toggleMobileNav"
              ref="navbarBurgerElement"
              v-no-drag
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div
            class="navbar-menu"
            :class="{ 'is-active': mobileNavActive }"
            ref="navbarMenuElement"
          >
            <div class="navbar-end">
              <LinkBase :to="{ name: 'home' }" class="navbar-item">Introduction</LinkBase>
              <LinkBase :to="{ name: 'list', hash: entries.hash }" class="navbar-item">
                Random List
              </LinkBase>
              <LinkBase :to="{ name: 'options' }" class="navbar-item">Options</LinkBase>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 v-if="$route.meta.hasLargeLogo" class="title">
          <span class="icon-text">
            <span>random list</span>
            <SvgIcon name="mdiShuffleVariant"></SvgIcon>
          </span>
        </h1>
        <h2 class="subtitle">{{ $route.meta.subtitle }}</h2>
      </div>
    </div>
    <div v-if="$route.meta.hasLinkNavTabs" class="hero-foot">
      <nav class="tabs is-fullwidth is-boxed">
        <div class="container">
          <ul>
            <LinkNavTab :to="{ name: 'list-create', hash: entries.hash }">
              <span class="is-hidden-mobile">Create list entries</span>
              <span class="is-hidden-tablet">Create</span>
            </LinkNavTab>
            <LinkNavTab
              v-if="options.isListSelectEnabled"
              :to="{ name: 'list-select', hash: entries.hash }"
            >
              <span class="is-hidden-mobile">Select list entries</span>
              <span class="is-hidden-tablet">Select</span>
            </LinkNavTab>
            <LinkNavTab :to="{ name: 'list-random', hash: entries.hash }">
              <span class="is-hidden-mobile">Randomise list entries</span>
              <span class="is-hidden-tablet">Randomise</span>
            </LinkNavTab>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>
