<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__user-action'

const action = ref( '' )

const performAction = () =>
{
  // todo: perform
  console.log( action.value )

  action.value = ''
}
</script>

<template>
  <div :class="`${cssPrefix}`">
    <textarea
      v-model="action"
      :class="`${cssPrefix}__text`"
    ></textarea>

    <button
      type="button"
      @click="performAction"
      :class="`${cssPrefix}__submit-button`"
    >
      Submit
    </button>
  </div>
</template>

<style lang="scss" scoped>
.game__turn__user-action
{
  &__text
  {
    $side-padding: .5em;
    $vertical-padding: .2em;

    $side-padding-sum: $side-padding * 2;
    $vertical-padding-sum: $vertical-padding * 2;

    $width: calc( 100% - $side-padding-sum );
    $initial-height: calc( 1em + $vertical-padding-sum );

    min-width: $width;
    max-width: $width;
    height: $initial-height;
    min-height: $initial-height;
    max-height: calc( 20em + $vertical-padding-sum );
    padding: $vertical-padding $side-padding;
    resize: vertical;
  }

  &__submit-button
  {
    width: 100%;
    height: 2em;
  }
}
</style>