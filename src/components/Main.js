import React, { useEffect, useState } from 'react';
import Card from './Card';
import api from '../utils/api';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  // userName,
  // userDescription,
  // userAvatar,
  // cards,
  onCardClick
}) {

  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then((user) => {
        setUser(user)
      })
      .catch(err => {
        console.log(err => {
          console.log(err);
        })
      })
  }, [])

  useEffect(() => {
    api.getCards()
      .then((res) => {
        setCards(
          res
        )
      }
      )
      .catch(err => {
        console.log(err => {
          console.log(err);
        })
      })
  }, []);


  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-overlay profile__avatar-overlay_closed"></div>
          <img className="profile__avatar" src={user.avatar} onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__main-info">
            <h1 className="profile__title">{user.name}</h1>
            <button className="edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{user.about}</p>
        </div>
        <button className="add-button" type="button" aria-label="добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">

        {cards.map((card) =>
        (<Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
        />))}

      </section>
    </main>
  )
}

export default Main;
