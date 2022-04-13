<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue';
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <div class="content">
            <h3>Introduction</h3>
            <p>
              The purpose of this page is to create a simple list that can be randomised and shared
              via URL without sending any private data to a server.
            </p>
            <ul>
              <li>Use it for your daily scrum meeting</li>
              <li>Share the lists URL so anyone can use the prefilled list</li>
              <li>Everything happens in your browser and stays in your browser</li>
              <li>No private data sent to any server</li>
            </ul>
            <p>
              Make sure to take a look at the
              <router-link :to="{ name: 'options' }">Options</router-link> for more advanced
              features.
            </p>
          </div>
          <div class="content has-text-centered">
            <p>And now, get started by creating a new list!</p>
            <LinkButton :to="{ name: 'list-create' }" class="is-medium is-primary">
              Create new list
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
