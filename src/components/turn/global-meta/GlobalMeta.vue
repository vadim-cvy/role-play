<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
  time: string
  date: string
}>()

const cssPrefix = props.cssPrefix + '__global-meta'
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