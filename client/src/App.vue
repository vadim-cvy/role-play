<script setup lang="ts">
import TurnDescription from './components/turn-description/TurnDescription.vue';
import UserCustomAction from './components/user-custom-action/UserCustomAction.vue';
import Character from './components/character/Character.vue';
import Game from './inc/game/Game';
import Inventory from './components/inventory/Inventory.vue';
import Location from './components/location/Location.vue';
import Time from './components/time/Time.vue';

const cssPrefix = 'game'

const screenImgURL = Game.location.img
</script>

<template>
  <div :class="`${cssPrefix}`">
    <div :class="`${cssPrefix}__header`">
      <Character :css-prefix="cssPrefix"></Character>
    </div>

    <div
      :class="`${cssPrefix}__screen`"
      :style="{
        backgroundImage: `url('${screenImgURL}')`,
      }"
    ></div>

    <div :class="`${cssPrefix}__sidebar`">
      <div>
        <Time :css-prefix="cssPrefix"></Time>

        <Location :css-prefix="cssPrefix"></Location>
      </div>

      <Inventory :css-prefix="cssPrefix"></Inventory>
    </div>

    <div :class="`${cssPrefix}__footer`">
      <TurnDescription :css-prefix="cssPrefix"></TurnDescription>

      <UserCustomAction :css-prefix="cssPrefix"></UserCustomAction>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game
{
  $section-border: 1px solid #fff;

  display: grid;
  grid-template-rows: min-content auto min-content;
  grid-template-columns: 3fr 1fr;
  height: 100%;

  &__header
  {
    position: relative;
    z-index: 2;
    grid-row: 1/2;
    grid-column: 1/2;
    background-color: rgba(0,0,0,.7);
  }

  &__screen
  {
    grid-row: 1/3;
    grid-column: 1/2;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__sidebar
  {
    grid-row: 1/3;
    grid-column: 2/3;
    border-left: $section-border;
  }

  &__footer
  {
    grid-row: 3/4;
    grid-column: 1/3;
    border-top: $section-border;
  }
}
</style>