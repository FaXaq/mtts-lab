<template>
  <nav class="lg:fixed lg:w-100">
    <ul class="list-reset flex">
      <li class="mr-6">
        <nuxt-link
          to="/"
          class="no-underline block p-2 text-blue hover:text-blue-darker"
          >Home
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link
          to="/instruments/piano"
          class="no-underline block p-2 text-blue hover:text-blue-darker"
          >Piano
        </nuxt-link>
      </li>
      <li class="mr-6">
        <nuxt-link
          to="/instruments/rythmbox"
          class="no-underline block p-2 text-blue hover:text-blue-darker"
          >rythmbox
        </nuxt-link>
      </li>
      <li class="mr-6 self-end">
        <drop-select
          :options="MIDIInputsNames"
          @select="selectMIDIInput"
        ></drop-select>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import webmidi, { Input } from 'webmidi' // eslint-disable-line no-unused-vars

// components
import DropSelect from '@/components/ui/form/DropSelect.vue'
import { mapGetters } from 'vuex'

@Component({
  components: {
    DropSelect
  },
  computed: {
    ...mapGetters('midi', {
      MIDIInputsNames: 'inputsNames'
    })
  }
})
export default class NavBar extends Vue {
  MIDIInputsNames!: Input[]

  selectMIDIInput(name: string) {
    this.$store.dispatch('midi/selectInput', name)
  }

  created() {
    this.$store.dispatch('midi/init')
  }
}
</script>

<style lang="scss" scoped></style>
