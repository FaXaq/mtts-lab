<template>
  <div
    class="keys-note"
    :class="{
      white: !note.hasAccidental(),
      black: note.hasAccidental(),
      active: playing
    }"
  >
    <span v-if="keyBinding">{{ keyBinding }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note } from 'mtts' // eslint-disable-line no-unused-vars

@Component({})
export default class KeyNote extends Vue {
  @Prop({
    required: true
  })
  note!: Note
  @Prop({
    required: false
  })
  keyBinding?: string
  playing: boolean = false

  play() {
    this.playing = true
    this.$emit('play', this.note)
  }

  stop() {
    this.playing = false
    this.$emit('stop', this.note)
  }

  created() {
    if (this.keyBinding !== undefined) {
      document.addEventListener('keypress', e => {
        if (e.key === this.keyBinding && !this.playing) {
          this.play()
        }
      })

      document.addEventListener('keyup', e => {
        if (e.key === this.keyBinding && this.playing) {
          this.stop()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active,
.black.active {
  background-color: red !important;
}
</style>
