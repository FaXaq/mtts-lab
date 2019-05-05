<template>
  <div class="inline-block relative w-64">
    <select
      v-model="selectedOption"
      class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option v-for="(o, k) in options" :key="k" :value="o">{{ o }}</option>
    </select>
    <div
      class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class DropSelect extends Vue {
  @Prop({
    required: true
  })
  options!: any[]

  selectedOption: any = null

  @Watch('options')
  selectDefault() {
    this.selectedOption = this.options[0] || null
  }

  @Watch('selectedOption')
  @Emit('select')
  selectChange() {
    return this.selectedOption
  }
}
</script>

<style lang="scss" scoped></style>
