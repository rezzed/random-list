<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';

const versionString = `Version ${__APP_VERSION__}`;
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <a
          href="https://github.com/rezzed/random-list"
          class="button"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SvgIcon name="mdiGithub"></SvgIcon>
          <span>Contribute on GitHub</span>
        </a>
      </p>
      <p>
        <small>
          <a
            href="https://github.com/rezzed/random-list/blob/main/CHANGELOG.md"
            class="version"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ versionString }}
          </a>
        </small>
      </p>
    </div>
  </footer>
</template>
