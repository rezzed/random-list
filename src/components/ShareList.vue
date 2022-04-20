<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEntriesStore } from '@/store';
import ShareCopyButton from '@/components/ShareCopyButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import type { SvgIconPathName } from '@/components/SvgIconPathName';

const router = useRouter();
const entries = useEntriesStore();

const expanded = ref(false);
const iconName = computed<SvgIconPathName>(() =>
  expanded.value ? 'mdiChevronUp' : 'mdiChevronDown',
);
const shareUrl = computed(() => {
  const route = router.resolve({ name: 'list-create', hash: entries.hash });
  return new URL(route.href, window.location.href).href;
});

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div class="card">
    <header class="card-header has-background-primary is-clickable" @click="toggleExpanded">
      <span class="card-header-title has-text-white">Share this list</span>
      <button class="card-header-icon has-text-white">
        <SvgIcon :name="iconName"></SvgIcon>
      </button>
    </header>
    <div v-if="expanded" class="card-content has-background-primary-light has-text-primary-dark">
      <div class="content">
        <p>
          The content of the entered list is stored in the URL. This way each list can be bookmarked
          or shared.
        </p>
        <div class="field">
          <label for="share-ti" class="label has-text-primary-dark">The URL to this page</label>
          <div class="field has-addons">
            <p class="control">
              <button class="button is-static">
                <SvgIcon name="mdiLink"></SvgIcon>
              </button>
            </p>
            <div class="control is-expanded">
              <input id="share-ti" class="input" type="text" v-model="shareUrl" readonly v-focus />
            </div>
            <div class="control">
              <ShareCopyButton :value="shareUrl">url</ShareCopyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
