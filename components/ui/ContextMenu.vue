<template>
  <div
    v-position="{ top, left }"
    class="context-menu fixed bg-white shadow rounded"
  >
    <ul class="list-reset">
      <li
        v-for="(i, k) in items"
        :key="k"
        class="p-4 cursor-pointer hv:color-grey"
        @click="select(i)"
      >
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Position, { IPositionParams } from '@/directives/style/Position' // eslint-disable-line no-unused-vars

export interface IContextMenuPosition extends IPositionParams {}

@Component({
  directives: {
    Position
  }
})
export default class ContextMenu extends Vue {
  @Prop({
    required: false
  })
  top!: number

  @Prop({
    required: false
  })
  left!: number

  @Prop({
    default: () => [],
    required: false
  })
  items!: string[]

  @Emit('select')
  select(i: string) {
    return i
  }
}
</script>

<style lang="scss" scoped></style>
