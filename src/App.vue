<script setup lang="ts">
import { ref, watch } from 'vue';
import Turn from './components/turn/Turn.vue';
import Character from './components/character/Character.vue';
import { Configuration, OpenAIApi } from 'openai'

const cssPrefix = 'game'

const healthStatus = ref( 'test hp' )
const hungerStatus = ref( 'test hg' )
const thirstStatus = ref( 'test th' )
const money = ref( 100.15 )
const inventoryItems = ref( [ 'test water', 'test bread' ] )

const location = ref( 'test loc' )
const time = ref( '1st Test 2029, 00:00' )
const description = ref( 'Test description of the turn' )

const openai = new OpenAIApi(new Configuration({
  // todo: IMPORTANT - keep this code on backend as it contains API key.
  // Don't forget to create new key and remove current one.
  apiKey: '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',
}))

const doAction = ( action: string ) =>
{
  description.value = ''

  openai.createChatCompletion({
    // todo: set v.4
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        // todo: set
        content: action,
      },
    ]
  })
  // todo: set catch()
  .then( httpResponse =>
  {
    const response = httpResponse.data.choices[0]

    if ( response.finish_reason !== 'stop' )
    {
      // todo: handle this case
      throw new Error( 'Unexpected finish reason!' )
    }

    if ( ! response.message )
    {
      // todo: handle this case
      throw new Error( 'Something goes wrong!' )
    }

    description.value = response.message.content
  })
}
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
      @do-action="doAction"
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