import { useEffect, useState } from "react";
import "./App.css";
import { EachCard } from "./components/EachCard";

const cardSources = [
  { src: "/img/bishop.png", same: 'false' },
  { src: "/img/knight.png", same: 'false' },
  { src: "/img/pawn.png", same: 'false' },
  { src: "/img/king.jpeg", same: 'false' },
  { src: "/img/rook.jpeg", same: 'false' },
  { src: "img/queen.jpeg", same: 'false' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null)
  const [SecondChoice, setSecondChoice] = useState(null)
  const [freeze, setFreeze] = useState(false)

  const prepCards = () => {
    const shuffledCards = [...cardSources, ...cardSources]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  // prepCards()
  // console.log(cards);
  const firstPick = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  const reset = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns + 1)
    setFreeze(false)
  }
  
  useEffect(()=>{
    if(firstChoice && SecondChoice){
      setFreeze(true)
      if(firstChoice.src === SecondChoice.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src){
              return {...card, same: true}
            }else{
              return card
            }
          })
        })
        reset()
      }else{
        setTimeout(() => reset(), 1000)
      }
    }
  },[firstChoice, SecondChoice])

  useEffect(()=>{
    prepCards()
  },[])


  // console.log(cards);
  return (
    <div className="App">
      <h1>Match Cards</h1>
      <button onClick={prepCards}>New Game</button>
      <p>Attempts: {turns}</p>
      <div className="grid">
        {cards.map(card => (
          <EachCard
            key = {card.id} 
            card = {card}
            firstPick ={firstPick}
            clicked = {card === firstChoice || card === SecondChoice || card.same === true }
            freeze ={freeze}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
