import webmidi, { Input } from "webmidi";
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

export interface IMIDIState {
  currentInputName: string
}

@Module
export default class MIDI extends VuexModule implements IMIDIState {
  currentInputName: string = ''
  enabled: boolean = false

  @Action
  init() {
    webmidi.enable(err => {
      if (!err) {
        this.context.commit('enable')
      } else {
        console.error(`Couldn't enable MIDI input`) // eslint-disable-line no-console
      }
    })
  }

  @Mutation
  enable() {
    this.enabled = true
  }

  @Action
  selectInput(name: string) {
    const input: Input | false = webmidi.getInputByName(name)
    if (input !== false) {
      this.context.commit('setCurrentInput', input)
    }
  }

  @Mutation
  setCurrentInput(input: Input) {
    this.currentInputName = input.name
  }

  get inputsNames(): string[] {
    if (this.enabled) {
      return webmidi.inputs.map((i) => i.name)
    }

    return []
  }

  get input(): Input | undefined {
    if (this.enabled) {
      return webmidi.getInputByName(this.currentInputName) as Input
    }
  }
}