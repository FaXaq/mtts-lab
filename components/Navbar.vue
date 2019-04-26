<template>
  <nav>
    <ul class="list-reset flex lg:fixed">
      <li class="mr-6">
        <nuxt-link
          to="/"
          class="no-underline block p-2 text-blue hover:text-blue-darker"
          >Home
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link
          to="/instruments/piano"
          class="no-underline block p-2 text-blue hover:text-blue-darker"
          >Piano
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class NewComponent extends Vue {}
</script>

<style lang="scss" scoped></style>
