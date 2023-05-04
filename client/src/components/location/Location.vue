<script setup lang="ts">
import Game from '@/inc/game/Game';

const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__location'

const label = Game.location.label
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      Location: {{ label }}
    </p>
  </div>
</template>