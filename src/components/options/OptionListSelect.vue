<script setup lang="ts">
import { useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';

const options = useOptionsStore();
</script>

<template>
  <OptionsBox :selected="options.isListSelectEnabled" @toggle="options.toggleListSelectEnabled">
    <template #title>Enable list entries selection</template>
    <template #default>
      This adds an additional tab &quot;Select list entries&quot; between &quot;Create list
      entries&quot; and &quot;Randomise list entries&quot; where each list entry can be selected or
      deselected by simply clicking it. The selection will be persisted in the local storage of your
      browser and shared across browser tabs and lists.
    </template>
  </OptionsBox>
</template>
