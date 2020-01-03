import React from 'react'
import { DeckContextProvider } from './context/DeckContext'
import Game from './components/Game'

const App = () => {
  return(
    <DeckContextProvider>
      <Game/>
    </DeckContextProvider>
  )
}

export default App
