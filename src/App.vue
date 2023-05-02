<script setup lang="ts">
import { ref } from 'vue';
import Turn from './components/turn/Turn.vue';
import Character from './components/character/Character.vue';

const cssPrefix = 'game'

const healthStatus = ref( 'test hp' )
const hungerStatus = ref( 'test hg' )
const thirstStatus = ref( 'test th' )
const money = ref( 100.15 )
const inventoryItems = ref( [ 'test water', 'test bread' ] )

const location = ref( 'test loc' )
const time = ref( '1st Test 2029, 00:00' )
const description = ref( 'Test description of the turn' )
</script>

<template>
  <div :class="`${cssPrefix}`">
    <Character
      :css-prefix="cssPrefix"
      :health-status="healthStatus"
      :hunger-status="hungerStatus"
      :thirst-status="thirstStatus"
      :money="money"
      :inventory-items="inventoryItems"
    ></Character>

    <Turn
      :css-prefix="cssPrefix"
      :location="location"
      :time="time"
      :description="description"
    ></Turn>
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
  background-image: url('/src/assets/img/test-turn-bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>