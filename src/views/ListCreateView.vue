<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEntriesStore, useOptionsStore } from '@/store';
import { NOOP } from '@/utils/noop';
import LinkButton from '@/components/LinkButton.vue';
import ShareList from '@/components/ShareList.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import ThrottledButton from '@/components/ThrottledButton.vue';

const route = useRoute();
const router = useRouter();
const entries = useEntriesStore();
const options = useOptionsStore();

// prefill the input
const input = ref(entries.asInput);

// Listen to any input change and update the hash in the url if required.
watch(input, (value) => {
  entries.fromInput(value);
  if (route.hash !== entries.hash) {
    // Replace the _current_ route to prevent the browser history
    // from becoming too long and contain unfinished lists.
    router.replace({ hash: entries.hash }).catch(NOOP);
  }
});

// If the hash in the url itself is changed, we must make sure to handle this.
watch(
  () => route.hash,
  (value) => {
    // We must make sure this hash update belongs to the current route.
    if (route.name === 'list-create' && value !== entries.hash) {
      entries.fromHash(value);
      input.value = entries.asInput;
    }
  },
  // If we do not run this watcher immediate, no router-link could ever
  // update the store when called from another page e.g., the start page.
  { immediate: true },
);

function clearList() {
  if (input.value) {
    router.push({ name: 'list-create', hash: '' }).catch(NOOP);
  }
}

function sortList() {
  input.value = entries.asInput;
}
</script>

<template>
  <div class="content">
    <div class="field">
      <label for="create-list-ta" class="label is-flex is-justify-content-space-between">
        <span>Enter the entries to randomise</span>
        <span class="tag is-primary has-text-weight-normal" title="Number of unique entries">
          {{ entries.count }}
        </span>
      </label>
      <div class="control">
        <textarea
          id="create-list-ta"
          class="textarea"
          placeholder="Enter one entry per line"
          rows="10"
          v-model="input"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
        ></textarea>
      </div>
      <p class="help">
        Enter one entry per line. Duplicates and exceeding whitespace will be removed automatically.
      </p>
    </div>
  </div>

  <div class="content is-flex is-justify-content-space-between">
    <div>
      <div class="buttons">
        <ThrottledButton
          @click="clearList"
          title="Clears the current list and creates a new one. The old list is still available in your browsing history."
        >
          Clear list
        </ThrottledButton>
        <ThrottledButton
          @click="sortList"
          title="Sort the list alphabetically, remove duplicates and exceeding whitespace."
        >
          Sort list
        </ThrottledButton>
      </div>
    </div>
    <LinkButton
      v-if="options.isListSelectEnabled"
      :to="{ name: 'list-select', hash: entries.hash }"
      class="is-primary mr-0"
      :disabled="entries.isEmpty"
    >
      <SvgIcon name="mdiCheckboxMarkedCircleOutline"></SvgIcon>
      <span class="is-hidden-mobile">Select entries</span>
      <span class="is-hidden-tablet">Select</span>
    </LinkButton>
    <LinkButton
      v-else
      :to="{ name: 'list-random', hash: entries.hash }"
      class="is-primary mr-0"
      :disabled="entries.isEmpty"
    >
      <SvgIcon name="mdiShuffleVariant"></SvgIcon>
      <span class="is-hidden-mobile">Randomise entries</span>
      <span class="is-hidden-tablet">Randomise</span>
    </LinkButton>
  </div>

  <div class="content">
    <ShareList></ShareList>
  </div>
</template>
