<script setup lang="ts">
import Description from './description/Description.vue';
import GlobalMeta from './global-meta/GlobalMeta.vue';
import Location from './location/Location.vue';
import UserAction from './user-action/UserAction.vue';

const props = defineProps<{
  cssPrefix: string
  time: string
  location: string
  description: string
}>()

const cssPrefix = props.cssPrefix + '__turn'
</script>

<template>
  <div :class="`${cssPrefix}`">
    <div :class="`${cssPrefix}__main`">
      <Description
        :css-prefix="cssPrefix"
        :description="description"
      ></Description>

      <UserAction
        :css-prefix="cssPrefix"
      ></UserAction>
    </div>

    <div :class="`${cssPrefix}__sidebar`">
      <Location
        :css-prefix="cssPrefix"
        :location="location"
      ></Location>

      <GlobalMeta
        :css-prefix="cssPrefix"
        :time="time"
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