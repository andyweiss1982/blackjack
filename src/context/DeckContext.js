import React, { createContext, useState, useEffect } from 'react'

export const DeckContext = createContext()

const shuffledDeck = () => {
  const cards = []
  const decks = [1,2,3,4,5,6]
  const values = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]
  const suits = ["H","S","C","D"]
  decks.forEach(deck => {
    values.forEach(value => {
      suits.forEach(suit => {
        cards.push({
          suit,
          value,
          image: `https://deckofcardsapi.com/static/img/${(value === 10 ? 0 : value) + suit}.png`,
          code: value + suit + deck
        })
      })
    })
  })
  return cards.sort(() => 0.5 - Math.random())
}

export const DeckContextProvider = ({ children }) => {
  const [deck, setDeck] = useState(shuffledDeck())

  useEffect(
    () => { if (deck.length < 70) setDeck(shuffledDeck()) },
    [deck.length]
  )

  const deal = number => {
    const dealOut = deck.splice(0, number)
    setDeck([...deck])
    return dealOut
  }

  return(
    <DeckContext.Provider value={{ deal }}>
      { children }
    </DeckContext.Provider>
  )
}



