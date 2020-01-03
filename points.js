const points = cards => {
    let points = 0
    cards.filter(card => card.value !== 'A')
      .forEach(card => {
        if (typeof(card.value) === 'string'){
          points += 10
        } else {
          points += Number(card.value)
        }
      })
    const aces = cards.filter(card => card.value === 'A')
    if (aces.length >= 21 - points){
      return points + aces.length
    } else {
      aces.forEach(_ace => {
        if (points + 11 > 21) points += 1
        else points += 11
      })
    }
    return points
  }

  const cards = [{"suit":"H","value":9,"image":"https://deckofcardsapi.com/static/img/9H.png","code":"9H2"},{"suit":"D","value":4,"image":"https://deckofcardsapi.com/static/img/4D.png","code":"4D3"}]

  console.log(points(cards))
