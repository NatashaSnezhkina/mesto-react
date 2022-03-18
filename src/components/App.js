import React, { useEffect, useState } from 'react';
import '../index.css'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
    setSelectedCard({ name: data.name, link: data.link });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser(currentUser) {
    api.sendProfileInfo(currentUser)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => {
        console.log(err => {
          console.log(err);
        })
      })
  }

  useEffect(() => {
    api.getProfileInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser)
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
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="App">
          <div className="root">
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              setCards={setCards}
            >
            </Main>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />

            <PopupWithForm
              name="add"
              title="Новое место"
              buttonText="Создать"
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
              buttonText="Да"
              onClose={closeAllPopups}>
            </PopupWithForm>


            <PopupWithForm
              name="avatar"
              title="Обновить аватар"
              buttonText="Сохранить"
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}>
              <input className="field field_type_link popup__input popup-avatar__input" id="popup-avatar__input_link"
                type="url" name="avatar" placeholder="Ссылка на картинку" required />
              <span id="popup-avatar__input_link-error" className="error"></span>
            </PopupWithForm>

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
            ></ImagePopup>

          </div>
        </div >
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App
