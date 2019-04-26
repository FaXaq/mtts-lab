export class Player {
  ac: AudioContext = new AudioContext()
  g: { string: GainNode } = {}
  cc: number = 0

  get gainLength(): number {
    return Object.keys(this.g).length;
  }

  addOscilator(): OscillatorNode {
    return this.ac.createOscillator()
  }

  updateGain() {
    for (let i in this.g) {
      this.g[i].gain.value = 0.8 / this.gainLength
    }
  }

  addGainChannel(): [GainNode, number] {
    this.cc++
    this.g[this.cc] = this.ac.createGain()
    this.updateGain()
    return [this.g[this.cc], this.cc]
  }

  play(f: number): (() => void) {
    console.log('playing', f, 'hz');
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
    g.gain.exponentialRampToValueAtTime(0.0001, this.ac.currentTime + 0.04)
    setTimeout(() => {
      this.g[i].disconnect()
      delete this.g[i]
      this.updateGain()
    }, 40)
  }
}

export const player = new Player()