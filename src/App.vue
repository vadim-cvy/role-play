<script setup lang="ts">
import { ref } from 'vue';
import Turn from './components/turn/Turn.vue';
import Character from './components/character/Character.vue';
import Game from './inc/game/Game';

const cssPrefix = 'game'

const healthStatus = ref( 'test hp' )
const hungerStatus = ref( 'test hg' )
const thirstStatus = ref( 'test th' )
const money = ref( 100.15 )
const inventoryItems = ref( [ 'test water', 'test bread' ] )

const bgImageURL = Game.turn.locationImg
</script>

<template>
  <div
    :class="`${cssPrefix}`"
    :style="{
      backgroundImage: `url('${bgImageURL}')`,
    }"
  >
    <Character
      :css-prefix="cssPrefix"
      :health-status="healthStatus"
      :hunger-status="hungerStatus"
      :thirst-status="thirstStatus"
      :money="money"
      :inventory-items="inventoryItems"
    ></Character>

    <Turn :css-prefix="cssPrefix"></Turn>
  </div>
</template>

<style lang="scss" scoped>
.game
{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
}
</style>