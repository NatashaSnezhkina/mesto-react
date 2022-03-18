import React, { useEffect, useState, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {
  const avatarRef = useRef();
  // const currentUser = useContext(CurrentUserContext);


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input className="field field_type_link popup__input popup-avatar__input" id="popup-avatar__input_link"
        type="url" name="avatar" placeholder="Ссылка на картинку" required ref={avatarRef}/>
      <span id="popup-avatar__input_link-error" className="error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
