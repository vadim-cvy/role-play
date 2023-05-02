<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
  description: string
}>()

const cssPrefix = props.cssPrefix + '__description'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      {{ description ? description : 'Loading...' }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>