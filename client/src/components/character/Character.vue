<script setup lang="ts">
const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__character'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <div :class="`${cssPrefix}__stats`">
      <p :class="`${cssPrefix}__stats__item`">
        <!-- todo: set real -->
        HP: {{ 'foo' }}
      </p>

      <p :class="`${cssPrefix}__stats__item`">
        <!-- todo: set real -->
        Hunger: {{ 'bar' }}
      </p>

      <p :class="`${cssPrefix}__stats__item`">
        <!-- todo: set real -->
        Thirst: {{ 'baz' }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game__character
{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__stats
  {
    display: flex;
    font-size: 1.2em;

    &__item
    {
      margin-right: 2em;

      &:last-child
      {
        margin-right: 0;
      }
    }
  }
}
</style>