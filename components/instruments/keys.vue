<template>
  <div class="keys w-6 flex">
    <key-note
      v-for="(n, k) in notes"
      :key="k"
      :note="n"
      :key-binding="getKeyBinding(n, k)"
      @play="play"
      @stop="stop"
    ></key-note>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note, Pitch } from 'mtts'
import Tone from 'tone'

// components
import KeyNote from '@/components/instruments/_keys/note.vue'

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

  keyBindings: string[] = [
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

  synth = new Tone.PolySynth(6, Tone.Synth).toMaster()

  play(note: Note) {
    this.synth.triggerAttack(note.frequency)
  }

  stop(note: Note) {
    this.synth.triggerRelease(note.frequency)
  }

  getKeyBinding(n: Note, k: number): string | undefined {
    if (k < this.keyBindings.length) {
      return this.keyBindings[k]
    }
  }

  get notes(): Note[] {
    const notes: Note[] = [new Note(this.startNote)]

    for (let i = 0; i < this.noteNumber; i++) {
      // duplicate last note
      const d: Note = notes[notes.length - 1].duplicate()
      // if it doesn't have an accidental and is different from B or E then add a sharp
      if (!d.hasAccidental() && !d.isBorE()) {
        d.addSharp()
      } else {
        // remove accidental and skip to next note
        d.removeAccidental()
        d.next()
      }
      notes.push(d)
    }

    return notes
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
