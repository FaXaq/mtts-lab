<template>
  <div class="keys w-6 flex">
    <key-note
      v-for="(n, k) in notePlayers"
      :id="k"
      :key="k"
      :np="n"
      :key-binding="getKeyBinding(n, k)"
      @play="play"
      @stop="stop"
    ></key-note>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note, Pitch } from 'mtts'

// components
import KeyNote from '@/components/instruments/_keys/note.vue'
import { player } from '@/services/Player'

export class NotePlayer {
  private _note!: Note
  private _playing!: boolean

  constructor(note: Note) {
    this.note = note
    this.playing = false
  }

  get note(): Note {
    return this._note
  }

  set note(note: Note) {
    this._note = note
  }

  get playing(): boolean {
    return this._playing
  }

  set playing(playing: boolean) {
    this._playing = playing
  }

  play() {
    if (!this.playing) {
      this.playing = true
      this.stopCallback = player.play(this.note.frequency)
    }
  }

  stop() {
    if (this.playing) {
      this.playing = false
      this.stopCallback()
    }
  }

  stopCallback() {}
}

@Component({
  components: {
    KeyNote
  }
})
export default class Keys extends Vue {
  @Prop({
    default: () => {
      return new Note({
        name: 'C',
        pitch: new Pitch({
          value: 3
        })
      })
    }
  })
  startNote!: Note

  @Prop({ default: 11 })
  noteNumber!: number

  keyBindings = [
    'q',
    'z',
    's',
    'e',
    'd',
    'f',
    't',
    'g',
    'y',
    'h',
    'u',
    'j',
    'k',
    'o',
    'l',
    'p',
    'm'
  ]

  notePlayers: NotePlayer[] = []

  play(id: number) {
    this.notePlayers[id].play()
  }

  stop(id: number) {
    this.notePlayers[id].stop()
  }

  getKeyBinding(n: Note, k: number): string | undefined {
    if (k < this.keyBindings.length) {
      return this.keyBindings[k]
    }
  }

  initNotePlayers(): NotePlayer[] {
    const notes: NotePlayer[] = [new NotePlayer(this.startNote)]

    for (let i = 0; i < this.noteNumber; i++) {
      // duplicate last note
      const d: Note = notes[notes.length - 1].note.duplicate()
      // if it doesn't have an accidental and is different from B or E then add a sharp
      if (!d.hasAccidental() && !d.isBorE()) {
        d.addSharp()
      } else {
        // remove accidental and skip to next note
        d.removeAccidental()
        d.next()
      }
      notes.push(new NotePlayer(d))
    }

    return notes
  }

  created() {
    this.notePlayers = this.initNotePlayers()
  }
}
</script>

<style lang="scss" scoped>
div.keys {
  height: 200px;
  width: auto;
  > div.keys-note {
    width: 35px;
    border-radius: 0px 0px 4px 4px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.3);

    &.black {
      background-color: grey;
      width: 20px;
      height: 50%;
      border-radius: 4px;
      margin-left: -10px;
      z-index: 2;
      color: white;

      & + .white {
        margin-left: -10px;
      }
    }
  }
}
</style>
