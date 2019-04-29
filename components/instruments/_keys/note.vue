<template>
  <div
    class="keys-note"
    :class="{
      white: !np.note.hasAccidental(),
      black: np.note.hasAccidental(),
      active: np.playing
    }"
  >
    <span v-if="keyBinding">{{ keyBinding }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note } from 'mtts' // eslint-disable-line no-unused-vars
import { NotePlayer } from '../keys.vue' // eslint-disable-line no-unused-vars

@Component({})
export default class KeyNote extends Vue {
  @Prop({
    required: true
  })
  np!: NotePlayer
  @Prop({
    required: false
  })
  keyBinding?: string
  @Prop({
    required: true
  })
  id!: number

  play() {
    this.$emit('play', this.id)
  }

  stop() {
    this.$emit('stop', this.id)
  }

  created() {
    if (this.keyBinding !== undefined) {
      document.addEventListener('keypress', e => {
        if (e.key === this.keyBinding && !this.np.playing) {
          this.play()
        }
      })

      document.addEventListener('keyup', e => {
        if (e.key === this.keyBinding && this.np.playing) {
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
