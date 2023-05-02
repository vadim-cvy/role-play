<script setup lang="ts">
import Inventory from './inventory/Inventory.vue'

const props = defineProps<{
  cssPrefix: string
  healthStatus: string
  hungerStatus: string
  thirstStatus: string
  money: number
  inventoryItems: string[]
}>()

const cssPrefix = props.cssPrefix + '__character'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <div :class="`${cssPrefix}__stats`">
      <p :class="`${cssPrefix}__stats__item`">
        HP: {{ healthStatus }}
      </p>

      <p :class="`${cssPrefix}__stats__item`">
        Hunger: {{ hungerStatus }}
      </p>

      <p :class="`${cssPrefix}__stats__item`">
        Thirst: {{ thirstStatus }}
      </p>
    </div>

    <Inventory
      :css-prefix="cssPrefix"
      :money="money"
      :items="inventoryItems"
    ></Inventory>
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