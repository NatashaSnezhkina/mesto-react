import React from 'react';

function Card({
  card,
  onCardClick
}) {
  
  function handleClick() {
    onCardClick(card);
  }  

  return (
    <div className="element">
      <img className="element__photo" src = {card.link} 
      onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className="element__like" type="button" aria-label="лайк"></button>
          <p className="element__like__counter">{card.likes.length}</p>
        </div>
      </div>
      <button className="element__basket" type="button" aria-label="корзина"></button>
    </div>
  )
}

export default Card;