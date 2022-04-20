import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useEntriesStore, useOptionsStore } from '@/store';

import HomeView from '@/views/HomeView.vue';
import ListCreateView from '@/views/ListCreateView.vue';
import ListRandomView from '@/views/ListRandomView.vue';
import ListSelectView from '@/views/ListSelectView.vue';
import ListView from '@/views/ListView.vue';
import OptionsView from '@/views/OptionsView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    hasLargeLogo?: boolean;
    hasLinkNavTabs?: boolean;
    pageTitle?: string;
    subtitle?: string;
    useHashInBeforeEach?: boolean;
  }
}

const DEFAULT_PAGE_TITLE = 'random list';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      hasLargeLogo: true,
      pageTitle: DEFAULT_PAGE_TITLE,
      subtitle: 'Create and randomise any list',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: ListView,
    redirect: { name: 'list-create' },
    meta: {
      hasLinkNavTabs: true,
      useHashInBeforeEach: true,
      subtitle: 'Create the list entries',
    },
    children: [
      {
        path: '',
        name: 'list-create',
        component: ListCreateView,
        meta: {
          pageTitle: 'random list | create',
          // Do not use the global navigation guard
          // as the view handles the hash change.
          useHashInBeforeEach: false,
        },
      },
      {
        path: 'select',
        name: 'list-select',
        component: ListSelectView,
        meta: {
          pageTitle: 'random list | select',
          subtitle: 'Select the list entries',
        },
      },
      {
        path: 'random',
        name: 'list-random',
        component: ListRandomView,
        meta: {
          pageTitle: 'random list | random',
          subtitle: 'Randomise the list entries',
        },
      },
    ],
  },
  {
    path: '/options',
    name: 'options',
    component: OptionsView,
    meta: {
      pageTitle: 'random list | options',
      subtitle: 'Select random list options',
    },
  },
  {
    // 404 NotFound -> just redirect to the start-page
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'is-active',
});

const title = useTitle();

router.afterEach((to, from, failure) => {
  if (!failure) {
    title.value = to.meta.pageTitle || DEFAULT_PAGE_TITLE;
  }
});

router.beforeEach((to, from) => {
  const entries = useEntriesStore();
  const options = useOptionsStore();

  if (!options.isListSelectEnabled && to.name === 'list-select') {
    // The user has no ListSelectView enabled -- redirect and remove it from the history.
    return {
      name: 'list-create',
      query: to.query,
      hash: to.hash,
      replace: true,
    } as RouteLocationRaw;
  }

  if (to.meta.useHashInBeforeEach && to.hash !== entries.hash) {
    // A new hash in the url? update the store.
    entries.fromHash(to.hash);
    if (entries.error.isInvalidHash) {
      // This hash was invalid! remove it from the url and the history.
      return { name: to.name, query: to.query, hash: '', replace: true } as RouteLocationRaw;
    }
  }

  if (to.name !== from.name && to.hash === entries.hash) {
    // Tf this was a page change and there is a valid hash in the url,
    // clear all former entries-store errors.
    entries.error.isInvalidHash = false;
    entries.error.isHashTooLong = false;
  }

  return true;
});

export default router;
