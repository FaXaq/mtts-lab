import { Vue } from 'vue-property-decorator'
import webmidi, { Input } from 'webmidi' // eslint-disable-line no-unused-vars

export class MIDIInstrument extends Vue {
  currentMIDIInput?: Input | undefined
}