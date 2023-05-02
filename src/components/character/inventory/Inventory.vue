<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
  money: number
  items: string[]
}>()

const cssPrefix = props.cssPrefix + '__inventory'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      Money: {{ money }}
    </p>

    <p>
      Inventory: {{ items.join( ', ' ) }}
    </p>
  </div>
</template>