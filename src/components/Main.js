import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import api from '../utils/api';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  setCards
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(`Ошибка при удалении лайка${err}`);
    });
  }

  function handleCardDelete(card) {
    
    api.deleteCard(card._id)
    .then((deletedCard) => {
      setCards((state) => state.filter((c) => c._id !== deletedCard._id));
    })
    .catch(err => {
      console.log(`Ошибка при удалении карточки${err}`);
    })

  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-overlay profile__avatar-overlay_closed"></div>
          <img className="profile__avatar" src={currentUser.avatar} onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__main-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="add-button" type="button" aria-label="добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">

        {cards.map((card) =>
        (<Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          currentUser={currentUser}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />))}

      </section>
    </main>
  )
}

export default Main;
