<template>
  <div class="pad h-32 w-32" @contextmenu.prevent="modify"></div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component({})
export default class DrumPad extends Vue {
  showContextMenu: boolean = false

  @Emit('rightClick')
  modify(e: MouseEvent) {
    return {
      left: e.x,
      top: e.y
    }
  }
}
</script>

<style lang="scss" scoped></style>
