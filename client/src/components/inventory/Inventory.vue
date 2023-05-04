<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__inventory'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <p>
      <!-- todo: set real -->
      Money: ${{ 100 }}
    </p>

    <p>
      <!-- todo: set real -->
      Inventory items: {{ [ 'foo', 'bar', 'baz' ].join( ', ' ) }}
    </p>
  </div>
</template>