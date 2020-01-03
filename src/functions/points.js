export const points = cards => {
  let total = 0
  cards.filter(card => card.value !== 'A')
    .forEach(card => {
      if (typeof(card.value) === 'string'){
        total += 10
      } else {
        total += card.value
      }
    })
  const aces = cards.filter(card => card.value === 'A')
  if (aces.length >= 21 - total){
    return total + aces.length
  } else {
    aces.forEach(_ace => {
      if (total + 11 > 21) total += 1
      else total += 11
    })
  }
  return total
}
