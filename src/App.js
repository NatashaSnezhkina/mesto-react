import React, { useEffect, useState } from 'react';
import './index.css'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import api from './utils/api';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({name: "", link: ""});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard({name: data.name, link: data.link});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: "", link: ""});
  }

  useEffect(() => {
    api.getProfileInfo()
      .then((user) => {
        setUser(user)
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
  }
  );

  return (
    <div className="App">
      <div className="root">
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mesto</title>
        </div>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddClick}
          onEditAvatar={handleEditAvatarClick}
          userName={user.name}
          userDescription={user.about}
          userAvatar={user.avatar}
          cards={cards}
          onCardClick={handleCardClick}
          >
        </Main>
        <Footer />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>

          <input className="field field_type_name popup__input"
            type="text" name="name" id="popup-${name}__input_name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span id="popup-edit__input_name-error" className="error"></span>
          <input className="field field_type_description popup__input" type="text" id="popup-edit__input_description" name="about"
            placeholder="Описание" required minLength="2" maxLength="200" />
          <span id="popup-edit__input_description-error" className="error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>

          <input className="field field_type_title popup__input" id="popup-add__input_title"
            type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" />
          <span id="popup-add__input_title-error" className="error"></span>
          <input className="field field_type_link popup__input" id="popup-add__input_link"
            type="url" name="link" placeholder="Ссылка на картинку" required />
          <span id="popup-add__input_link-error" className="error"></span>
        </PopupWithForm>


        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          onClose={closeAllPopups}>
        </PopupWithForm>


        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input className="field field_type_link popup__input popup-avatar__input" id="popup-avatar__input_link"
            type="url" name="avatar" placeholder="Ссылка на картинку" required />
          <span id="popup-avatar__input_link-error" className="error"></span>
        </PopupWithForm>

        <ImagePopup
          card = {selectedCard}
          onClose = {closeAllPopups}
        ></ImagePopup>

      </div>
    </div >
  );
}

export default App;
