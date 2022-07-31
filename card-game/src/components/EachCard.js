import "./EachCard.css";

export const EachCard = ({ card, firstPick, clicked, freeze}) => {

    const handleClick = () => {
        if(!freeze){
            firstPick(card)
        }
    }

  return (
    <div className="each-card">
      <div className={clicked ? 'clicked' : ""}>
        <img src={card.src}
            className="front" 
            alt="chess-front" />
        <img src="/img/cover.jpeg" 
            className="back" 
            alt="cover"
            onClick={handleClick} 
            />
      </div>
    </div>
  );
};
