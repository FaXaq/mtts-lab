export class Player {
  ac: AudioContext = new AudioContext()
  g: { [key: string]: GainNode } = {}
  cc: number = 0
  _outputVolume: number = 1

  addOscilator(): OscillatorNode {
    return this.ac.createOscillator()
  }

  updateGain() {
    for (let i in this.g) {
      this.g[i].gain.value = Math.sqrt(this.outputVolume / this.gainLength)
    }
  }

  addGainChannel(): [GainNode, number] {
    this.cc++
    this.g[this.cc] = this.ac.createGain()
    this.updateGain()
    return [this.g[this.cc], this.cc]
  }

  play(f: number): (() => void) {
    const o = this.addOscilator()
    const [g, gIndex] = this.addGainChannel()
    o.type = 'sine'
    o.frequency.value = f
    o.connect(g)
    g.connect(this.ac.destination)
    o.start(0)

    return (() => this.stop(g, gIndex))
  }

  stop(g: GainNode, i: number) {
    g.gain.exponentialRampToValueAtTime(0.0001, this.ac.currentTime + 0.1)
    setTimeout(() => {
      this.g[i].disconnect()
      this.updateGain()
    }, 100)
  }

  get gainLength(): number {
    return Object.keys(this.g).length
  }

  get outputVolume(): number {
    return this._outputVolume
  }

  set outputVolume(volume: number) {
    this._outputVolume = volume
  }
}

export const player = new Player()