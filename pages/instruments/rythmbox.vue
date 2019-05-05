<template>
  <div class="rythm-box container">
    <drum-pads />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DrumPads from '@/components/instruments/DrumPads.vue'

@Component({
  components: {
    DrumPads
  }
})
export default class RythmBox extends Vue {}
</script>

<style lang="scss" scoped></style>
