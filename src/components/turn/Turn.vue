<script setup lang="ts">
import Game from '@/inc/game/Game';
import Description from './description/Description.vue';
import GlobalMeta from './global-meta/GlobalMeta.vue';
import Location from './location/Location.vue';
import UserAction from './user-action/UserAction.vue';

const props = defineProps<{
  cssPrefix: string
}>()

const cssPrefix = props.cssPrefix + '__turn'

const turn = Game.turn

const
  description = turn.description,
  meta = turn.meta
</script>

<template>
  <div :class="`${cssPrefix}`">
    <div :class="`${cssPrefix}__main`">
      <Description
        :css-prefix="cssPrefix"
        :description="description"
      ></Description>

      <UserAction :css-prefix="cssPrefix"></UserAction>
    </div>

    <div :class="`${cssPrefix}__sidebar`" v-if="meta">
      <Location
        :css-prefix="cssPrefix"
        :location="meta.location"
      ></Location>

      <GlobalMeta
        :css-prefix="cssPrefix"
        :time="meta.time"
        :date="meta.date"
      ></GlobalMeta>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game__turn
{
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 1em;

  &__main
  {
    width: 100%;
  }

  &__sidebar
  {
    min-width: 10em;
    max-width: 10em;
    padding-left: 1em;
  }
}
</style>