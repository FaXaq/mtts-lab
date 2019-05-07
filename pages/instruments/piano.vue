<template>
  <div class="container w-screen flex flex-col max-w-full">
    <keys
      :start-note="startNote"
      :note-number="noteNumber"
      :active-notes="activeNotes"
      :play-active-notes="true"
      @play="play"
      @stop="stop"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { Note, Pitch, Accidental } from 'mtts'
import Tone from 'tone'
import webmidi, { Input } from 'webmidi' // eslint-disable-line no-unused-vars
import { mapGetters } from 'vuex'

// components
import { MIDIInstrument } from '@/components/instruments/MIDIInstrument'
import Keys from '@/components/instruments/Keys.vue'
import NoteSelect from '@/components/NoteSelect.vue'
import DropSelect from '@/components/ui/form/DropSelect.vue'
import { IMIDIState } from 'store/midi' // eslint-disable-line no-unused-vars

@Component({
  components: {
    DropSelect,
    Keys,
    NoteSelect
  },
  computed: {
    ...mapGetters('midi', {
      currentMIDIInput: 'input'
    })
  }
})
export default class Piano extends MIDIInstrument {
  startNote: Note = new Note({
    name: 'C',
    pitch: new Pitch({
      value: 2
    })
  })
  noteNumber: number = 60
  activeNotes: Note[] = []

  synth = new Tone.PolySynth(6, Tone.Synth).toMaster()

  play(note: Note) {
    this.synth.triggerAttack([note.frequency])
  }

  stop(note: Note) {
    this.synth.triggerRelease([note.frequency])
  }

  @Watch('currentMIDIInput')
  updateMIDISource(newInput: Input, oldInput: Input) {
    console.log('changeing midi input') // eslint-disable-line no-console
    if (oldInput) {
      this.removeMIDIListeners(oldInput)
    }

    this.addMIDIListeners(newInput)
  }

  addMIDIListeners(input: Input) {
    input.addListener('midimessage', 'all', e => {
      console.log(e) // eslint-disable-line no-console
    })

    input.addListener('noteon', 'all', e => {
      const note = new Note({
        // eslint-disable-line no-unused-vars
        name: e.note.name[0],
        pitch: new Pitch({
          value: e.note.octave
        }),
        accidental: Accidental.fromString(e.note.name[1])
      })

      this.activeNotes.push(note)
    })

    input.addListener('noteoff', 'all', e => {
      const note = new Note({
        // eslint-disable-line no-unused-vars
        name: e.note.name[0],
        pitch: new Pitch({
          value: e.note.octave
        }),
        accidental: Accidental.fromString(e.note.name[1])
      })

      this.activeNotes = this.activeNotes.filter((n: Note) => {
        return Note.getSemitonesBetween(n, note) !== 0
      })
    })
  }

  removeMIDIListeners(input: Input) {
    input.removeListener()
  }

  created() {
    if (this.currentMIDIInput) {
      this.addMIDIListeners(this.currentMIDIInput)
    }
  }

  beforeDestroy() {
    if (this.currentMIDIInput) {
      this.removeMIDIListeners(this.currentMIDIInput)
    }
  }
}
</script>

<style lang="scss" scoped></style>
