<template>
  <div class="pads-container flex shadow" @click="showContextMenu = false">
    <div v-grid="gridParams" class="pads p-6">
      <drum-pad
        v-for="i in pads"
        :key="i"
        class="shadow"
        @rightClick="displayContextMenu"
      />
    </div>
    <div v-if="controls" class="pads-controls w-6 flex flex-col">
      <div class="number py-2 text-white cursor-pointer" @click="pads++">+</div>
      <div class="number py-2 text-white">{{ pads }}</div>
      <div class="number py-2 text-white cursor-pointer" @click="pads--">-</div>
    </div>
    <context-menu
      v-if="showContextMenu"
      :top="contextMenuPosition.top"
      :left="contextMenuPosition.left"
      :items="['bind']"
      @select="contextMenuSelect"
    ></context-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

// directives
import Grid, { IGridParams } from '@/directives/style/Grid' // eslint-disable-line no-unused-vars

import DrumPad from '@/components/instruments/_drumPads/DrumPad.vue'
import ContextMenu, {
  IContextMenuPosition // eslint-disable-line no-unused-vars
} from '@/components/ui/ContextMenu.vue'

@Component({
  components: {
    DrumPad,
    ContextMenu
  },
  directives: {
    Grid
  }
})
export default class DrumPads extends Vue {
  pads: number = 4
  @Prop({
    default: true
  })
  controls!: boolean

  contextMenuPosition: IContextMenuPosition = {
    top: 0,
    left: 0
  }
  showContextMenu: boolean = false

  displayContextMenu(position: IContextMenuPosition) {
    this.contextMenuPosition = position
    this.showContextMenu = true
  }

  contextMenuSelect(action: string) {
    this.showContextMenu = false
    switch (action) {
      case 'bind':
        // TODO : Implement binding between midi keyboard and this pad
        break
      default:
        console.warn(`${action} not implemented yet`) // eslint-disable-line no-console
    }
  }

  get gridParams(): IGridParams {
    return {
      elements: this.pads,
      type: 'rectangle',
      rows: 2,
      spacing: '10px',
      auto: 'column'
    }
  }
}
</script>

<style lang="scss" scoped>
.pads-container {
  background-color: #332640;
  border-radius: 8px;

  .pads {
    .pad {
      background-color: #594370;
      border-radius: 8px;
      border: 2px solid #e5e5e5;
    }
  }
}
</style>
