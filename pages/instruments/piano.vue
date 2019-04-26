<template>
  <div class="container w-screen max-w-full">
    <keys :start-note="startNote" :note-number="noteNumber" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// components
import Keys from '@/components/instruments/keys.vue'
import { Note, Pitch } from 'mtts'

@Component({
  components: {
    Keys
  }
})
export default class Piano extends Vue {
  startNote: Note = new Note({
    name: 'C',
    pitch: new Pitch({
      value: 6
    })
  })
  noteNumber: number = 23
}
</script>

<style lang="scss" scoped></style>
