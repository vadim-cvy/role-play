<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
  location: string
}>()

const cssPrefix = props.cssPrefix + '__location'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      Location: {{ location }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>