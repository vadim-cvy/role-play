<script setup lang="ts">
import Game from '@/inc/game/Game';

const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__turn-description'

const description = Game.turnDescription
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      {{ description ? description : 'Loading...' }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.game__turn-description
{
  min-height: 5em;
  margin-bottom: 1em;
}
</style>