import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  // todo: IMPORTANT - keep this code on backend as it contains API key.
  // Don't forget to create new key and remove current one.
  apiKey: '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',
})

export default new OpenAIApi( config )