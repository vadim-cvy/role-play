import Chat from '@/inc/ai/Chat'

class TurnChat extends Chat
{
  constructor()
  {
    super()
  }

  public init()
  {
    return this.sendUserMessageSave(
      `We will play a text based zombie apocalypse survival RPG.

      The RPG starts when I, a 17-year old boy names Pierre, am sitting at my home in Paris, listening the speech of President Macron about the Zombie Virus outbreak(The speech is in the style of Macron's coronavirus speech). The RPG starts on March 16 2020. Pierre lives in the center of Paris. Invent an address for him. Pierre goes to the terminale class of a lycee, he lives only with his mother. Invent the address and name of the lycee.

      Each my message will be a description of what my character is going to do at current turn. You should analyze the game history and make the game world to respond to actions of my character.

      Keep text length under about 700 characters.`,
    )
  }
}

export default new TurnChat()