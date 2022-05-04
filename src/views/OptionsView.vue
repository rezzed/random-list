<script setup lang="ts">
import OptionAudio from '@/components/options/OptionAudio.vue';
import OptionBgAnimation from '@/components/options/OptionBgAnimation.vue';
import OptionListSelect from '@/components/options/OptionListSelect.vue';
import OptionRandomiseButton from '@/components/options/OptionRandomiseButton.vue';
import OptionShareButton from '@/components/options/OptionShareButton.vue';
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <div class="content">
            <h3>Options</h3>

            <div class="tile is-ancestor">
              <div class="tile is-4 is-parent">
                <article class="tile is-child notification is-primary">
                  <div class="content">
                    <strong>Note:</strong> Selecting an option will persist it in the local storage
                    of your browser.<br />
                    If you do not want this, do not select an option.<br />
                    To remove a stored option from your browser, just deselect it.
                  </div>
                </article>
              </div>

              <div class="tile is-vertical is-parent">
                <OptionListSelect></OptionListSelect>
                <OptionBgAnimation></OptionBgAnimation>
                <OptionAudio></OptionAudio>
                <OptionRandomiseButton></OptionRandomiseButton>
                <OptionShareButton></OptionShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
