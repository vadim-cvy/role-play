<script setup lang="ts">
import Game from '@/inc/game/Game';

const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__global-meta'

const
  date = Game.date,
  time = Game.time
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      {{ date }}
    </p>

    <p>
      {{ time }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>