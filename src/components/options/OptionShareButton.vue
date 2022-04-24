<script setup lang="ts">
import { useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';

const options = useOptionsStore();
</script>

<template>
  <OptionsBox
    :selected="options.isShareButtonEnabled"
    :enabled="options.canShareButtonBeEnabled"
    @toggle="options.toggleShareButtonEnabled"
  >
    <template #title>Enable share button</template>
    <template #default>
      <article v-if="!options.canShareButtonBeEnabled" class="message is-danger is-small">
        <div class="message-body">
          <strong>Note:</strong> This option needs the Web Share API, which is not available on your
          device.
        </div>
      </article>

      <p>
        The &quot;Copy&quot; button will be replaced with a &quot;Share&quot; button, which uses the
        Web Share API to open the native share menu of your device.
      </p>
    </template>
  </OptionsBox>
</template>
