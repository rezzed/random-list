<script setup lang="ts">
import { useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';

const options = useOptionsStore();
</script>

<template>
  <OptionsBox
    :selected="options.isRandomiseButtonEnabled"
    @toggle="options.toggleRandomiseButtonEnabled"
  >
    <template #title>Enable only explicit randomisation</template>
    <template #default>
      This disables the implicit randomisation when the &quot;Randomise list entries&quot; tab is
      selected.<br />
      The &quot;Re-randomise list&quot; button will be replaced with a simple &quot;Randomise
      list&quot; button. Only if this button is clicked or held down, the list entries will be
      randomised.
    </template>
  </OptionsBox>
</template>
