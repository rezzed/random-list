<script setup lang="ts">
import { useOptionsStore } from '@/store';
import OptionsBox from '@/components/OptionsBox.vue';

const options = useOptionsStore();
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
                <OptionsBox
                  :selected="options.isListSelectEnabled"
                  @toggle="options.toggleListSelectEnabled"
                >
                  <template #title>Enable list entries selection</template>
                  <template #default>
                    This adds an additional tab &quot;Select list entries&quot; between &quot;Create
                    list entries&quot; and &quot;Randomise list entries&quot; where each list entry
                    can be selected or deselected by simply clicking it. The selection will be
                    persisted in the local storage of your browser and shared across browser tabs
                    and lists.
                  </template>
                </OptionsBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
