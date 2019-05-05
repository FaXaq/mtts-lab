<template>
  <div
    class="keys-note"
    :class="{
      white: !note.hasAccidental(),
      black: note.hasAccidental(),
      active: active,
      playing: playing
    }"
  >
    <span v-if="keyBinding">{{ keyBinding }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
  @Prop({
    default: false
  })
  active!: boolean
  playing: boolean = false

  press() {
    this.playing = true
    this.$emit('press', this.note)
  }

  release() {
    this.playing = false
    this.$emit('release', this.note)
  }

  @Watch('active')
  activateNote(v: boolean) {
    if (v) {
      this.press()
    } else {
      this.release()
    }
  }

  created() {
    if (this.keyBinding !== undefined) {
      document.addEventListener('keypress', e => {
        if (e.key === this.keyBinding && !this.playing) {
          this.press()
        }
      })

      document.addEventListener('keyup', e => {
        if (e.key === this.keyBinding && this.playing) {
          this.release()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active,
.black.active {
  background-color: #66c0cc !important;
}

.playing,
.black.playing {
  background-color: #997fb3 !important;
}
</style>
