<template>
  <div class="note-select">
    <ul>
      <li
        v-for="(n, k) in notes"
        :key="k"
        :style="`${getY(k)} ${getX(k)}`"
        @click="selectNote(n)"
      >
        {{ n }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Note, NOTES } from 'mtts' // eslint-disable-line no-unused-vars

@Component({})
export default class NoteSelect extends Vue {
  notes: string[] = NOTES

  private toRad(o: number): number {
    return (o * Math.PI) / 180
  }

  getY(i: number): string {
    const centerAngle: number = (360 / this.notes.length) * i
    const intAngle: number = (180 - centerAngle) / 2
    const extAngleA: number = 90 - intAngle
    const h: number = Math.cos(this.toRad(intAngle)) * 75 * 2
    let res: any = Math.sin(this.toRad(extAngleA)) * h
    console.log(i, res) // eslint-disable-line no-console

    if (res >= 75) {
      res = `bottom: ${155 - res}px;`
    } else {
      res = `top: ${5 + res}px;`
    }

    return res
  }

  getX(i: number): string {
    const centerAngle: number = (360 / this.notes.length) * i
    const intAngle: number = (180 - centerAngle) / 2
    const extAngleA: number = 90 - intAngle
    const h: number = Math.cos(this.toRad(intAngle)) * 75 * 2
    let res: any = Math.cos(this.toRad(extAngleA)) * h
    console.log('left', i, res) // eslint-disable-line no-console

    if (res < 0) {
      res = `left: ${5 + 75 + res}px;`
    } else {
      res = `right: ${5 + 75 - res}px;`
    }

    return res
  }
}
</script>

<style lang="scss" scoped>
.note-select {
  border-radius: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

  > ul {
    list-style: none;
    padding: 20px;
    height: 150px;
    width: 150px;
    margin: 0px;
    position: relative;

    > li {
      background-color: red;
      position: absolute;
    }
  }
}
</style>
