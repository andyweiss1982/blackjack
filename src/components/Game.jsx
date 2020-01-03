import React, { useContext, useEffect, useState } from "react"
import { DeckContext } from '../context/DeckContext'
import { points } from '../functions/points'
import styles from './Game.module.css'

const Game = () => {
  const { deal } = useContext(DeckContext)
  const [dealerCards, setDealerCards] = useState([])
  const [playerCards, setPlayerCards] = useState([])
  const [gameState, setGameState] = useState('initial')

  useEffect(
    () => {
      if (gameState === 'playerDone'){
        let dealerHand = [...dealerCards]
        while (points(dealerHand) < 16){
          dealerHand = [...dealerHand, ...deal(1)]
        }
        setDealerCards(dealerHand)
        setGameState('done')
      }
    },
    [gameState, dealerCards, deal]
  )

  return(
    <main className={styles.main}>
      {
        gameState === 'done' ?
        <h1>
          {
            (points(playerCards) > 21 || points(dealerCards) === 21 || (points(dealerCards) < 21 && points(dealerCards) > points(playerCards))) ?
            "You Lose!" :
            (points(playerCards) === points(dealerCards)) ?
            "Push!" :
            "You Win!"
          }
        </h1> :
        <h1>Blackjack</h1>
      }
      {
        (gameState === 'initial' || gameState === 'done') &&
        <button
          className={styles.button}
          onClick={() => {
            setPlayerCards(deal(2))
            setDealerCards(deal(2))
            setGameState('playerDecision')
          }}
        >
          Deal
        </button>
      }
      {
        (gameState === 'playerDecision') &&
        <>
          <button
            className={styles.button}
            onClick={() => {
              const playerHand = [...playerCards, ...deal(1)]
              if (points(playerHand) > 21) setGameState('done')
              setPlayerCards(playerHand)
            }}
          >
            Hit
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setGameState('playerDone')
            }}
          >
            Stay
          </button>
        </>
      }
      {
        (gameState !== 'initial') &&
        <>
          <h2>
            Dealer:{' '}
            {
              (gameState !== 'initial' && gameState !== 'playerDecision') ?
              points(dealerCards) :
              '???'
            }
          </h2>
          <ul className={
            (gameState !== 'done') ?
            [styles.hand, styles.hidden].join(' ') :
            styles.hand
          }>
            {
              dealerCards.map(card => (
                <li key={card.code} className={styles.cardBack}>
                  <img
                    src={card.image}
                    alt={card.code}
                    className={styles.card}
                  />
                </li>
              ))
            }
          </ul>
          <h2>Player: {points(playerCards)}</h2>
          <ul className={styles.hand}>
            {
              playerCards.map(card => (
                <li key={card.code} className={styles.cardBack}>
                  <img
                    src={card.image}
                    alt={card.code}
                    className={styles.card}
                  />
                </li>
              ))
            }
          </ul>
        </>
      }
    </main>
  )
}

export default Game
