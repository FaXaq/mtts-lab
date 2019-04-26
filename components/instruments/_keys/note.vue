<template>
  <div
    class="keys-note"
    :class="{
      white: !note.hasAccidental(),
      black: note.hasAccidental(),
      playing: playing
    }"
    @mouseenter="play()"
    @mouseup="stop()"
    @mouseout="stop()"
  >
    <span v-if="keyBinding">{{ keyBinding }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note } from 'mtts' // eslint-disable-line no-unused-vars
import { player, Player } from '@/services/Player' // eslint-disable-line no-unused-vars

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
  player: Player = player
  playing: boolean = false

  play() {
    this.playing = true
    this.stopCB = this.player.play(this.note.frequency)
  }

  stop() {
    this.playing = false
    this.stopCB()
  }

  stopCB() {}

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
.playing {
  zoom: 0.3;
}
</style>
