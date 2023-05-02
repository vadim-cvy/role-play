<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
  time: string
}>()

const cssPrefix = props.cssPrefix + '__global-meta'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      {{ time }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>