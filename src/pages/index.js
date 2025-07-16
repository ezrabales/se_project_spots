import {
  toggleButtonState,
  enableValidation,
  hideErrorMsgs,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import headerLogoSrc from "../images/Logo.svg";
import profileImageSrc from "../images/avatar.svg";
import profileIconSrc from "../images/edit-icon.svg";
import editImageMobile from "../images/edit-image-mobile.svg";
import { Api } from "../utils/Api.js";

const headerLogoImage = document.getElementById("header-logo");
headerLogoImage.src = headerLogoSrc;
const profileImageImage = document.getElementById("profile-image");
const profileIconImage = document.getElementById("profile-icon");
profileIconImage.src = profileIconSrc;
const avatarIconImage = document.getElementById("avatar-icon");
avatarIconImage.src = profileIconSrc;
const avatarIconImageMobile = document.getElementById("avatar-icon-mobile");
avatarIconImageMobile.src = editImageMobile;

// image modal variables
const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalDescription = imageModal.querySelector(
  ".modal__image-description"
);
const imageModalCloseBtn = imageModal.querySelector(
  ".modal__outside-close-btn"
);

// modal functions
const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  addEscape(modal);
};
const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  removeEscape();
};

// image modal close button
imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

// edit profile Vars
const editProfileBtn = document.querySelector(".profile__edit-profile");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);
const editAvatarModal = document.querySelector("#edit-avatar-modal");
// profile vars
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileImageOverlay = document.querySelector(".profile__image-overlay");
const profileImageOverlayMobile = document.querySelector(
  ".avatar__edit-icon-mobile"
);
const editProfileImageInput = editAvatarModal.querySelector(
  "#profile-picture-input"
);
const editProfileSubmitBtn =
  editProfileModal.querySelector(".modal__submit-btn");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
// new post Vars
const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostLink = newPostModal.querySelector("#post-link-input");
const newPostCaption = newPostModal.querySelector("#post-caption-input");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
// edit profile functions
editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});
function closeProfileModal() {
  closeModal(editProfileModal);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  api
    .editUserInfo({
      name: editProfileName.value,
      about: editProfileDescription.value,
    })
    .then(() => {
      closeProfileModal(), (editProfileSubmitBtn.textContent = "Saving...");
    })
    .finally(() => {
      editProfileSubmitBtn.textContent = "Save";
    });
}
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  editAvatarSubmitBtn.textContent = "Saving...";
  api
    .updateProfilePicture({ avatar: editProfileImageInput.value })
    .then(() => {
      closeModal(editAvatarModal),
        (editProfileImageInput.value = ""),
        (profileImageImage.src = editProfileImageInput.value);
    })
    .finally(() => {
      editAvatarSubmitBtn.textContent = "Save";
    });
}

// edit profile EventListeners
editAvatarModal.addEventListener("submit", handleEditAvatarFormSubmit);
profileImageOverlay.addEventListener("click", () => {
  openModal(editAvatarModal);
});
profileImageOverlayMobile.addEventListener("click", () => {
  openModal(editAvatarModal);
});
editProfileBtn.addEventListener("click", function () {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  hideErrorMsgs(
    editProfileModal,
    [editProfileName, editProfileDescription],
    settings
  );
  openModal(editProfileModal);
});

enableValidation(settings);
editProfileCloseBtn.addEventListener("click", closeProfileModal);

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
//new post functions
function closeNewPostModal() {
  closeModal(newPostModal);
}

async function apiNewCard(name, link) {
  return api
    .addNewcard({ name, link })
    .then((res) => {
      addCard(res);
    })
    .finally(() => {
      newPostSubmitBtn.textContent = "Save";
    });
}
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  newPostSubmitBtn.textContent = "Saving...";
  const newCard = {
    name: newPostCaption.value,
    link: newPostLink.value,
  };
  apiNewCard(newPostCaption.value, newPostLink.value).then(
    closeNewPostModal(),
    evt.target.reset()
  );
}

// new post EventListeners
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", handleNewPostSubmit);

// close modals by clicking outside
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

let escEventListener;

// close modals when "esc" is pressed
const addEscape = (modal) => {
  document.addEventListener(
    "keydown",
    (escEventListener = (evt) => {
      if (evt.key === "Escape") {
        closeModal(modal);
      }
    })
  );
};

// remove event listener for "esc"
const removeEscape = () => {
  document.removeEventListener("keydown", escEventListener);
};

// card template vars
const cardTemplate = document.querySelector("#card__template");
const cardsList = document.querySelector(".cards__list");
const trashModal = document.querySelector("#confirm-delete-modal");
let selectedCard;

//card template functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const card = cardElement.querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  card.id = data._id;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  // like listener
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn-clicked");
  }
  cardLikeBtn.addEventListener("click", () => {
    selectedCard = cardLikeBtn.closest(".card");
    if (cardLikeBtn.classList.contains("card__like-btn-clicked")) {
      api.unlikeCard({ id: selectedCard.id }).then(() => {
        cardLikeBtn.classList.toggle("card__like-btn-clicked");
      });
    } else {
      api.likeCard({ id: selectedCard.id }).then(() => {
        cardLikeBtn.classList.toggle("card__like-btn-clicked");
      });
    }
  });
  // trash listener
  const cardTrashBtn = cardElement.querySelector(".card__trash-btn");
  cardTrashBtn.addEventListener("click", () => {
    trashDeleteBtn.disabled = false;
    trashModal.classList.add("modal_is-opened");
    selectedCard = cardTrashBtn.closest(".card");
  });

  // image listener
  cardImage.addEventListener("click", () => {
    imageModalDescription.textContent = data.name;
    imageModalImage.src = data.link;
    imageModalImage.alt = data.name;
    openModal(imageModal);
  });

  return cardElement;
};

//trash logic
const trashDeleteBtn = trashModal.querySelector(".modal__delete-btn");
trashDeleteBtn.addEventListener("click", () => {
  trashDeleteBtn.textContent = "Deleting...";
  trashDeleteBtn.disabled = true;
  api
    .deleteCard({ id: selectedCard.id })
    .then(() => {
      selectedCard.remove(), closeModal(trashModal);
    })
    .finally(() => {
      trashDeleteBtn.textContent = "Delete";
    });
});

const deleteCloseBtn = trashModal.querySelector(".modal__delete_close-btn");
deleteCloseBtn.addEventListener("click", () => {
  closeModal(trashModal);
});
const deleteCancelBtn = trashModal.querySelector(".modal__cancel-btn");
deleteCancelBtn.addEventListener("click", () => {
  closeModal(trashModal);
});

const addCard = (newCard) => {
  const card = getCardElement(newCard);
  cardsList.prepend(card);
};

//api stuff
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d7941b1c-5b4f-425b-a81a-327062cdb56a",
    "Content-Type": "application/json",
  },
});

async function initialData() {
  try {
    const result = await api.getAllData();
    const initialCards = result[0];
    initialCards.reverse().forEach((initialCard) => {
      addCard(initialCard);
    });
    profileName.textContent = result[1].name;
    profileDescription.textContent = result[1].about;
    profileImageImage.src = result[1].avatar;
  } catch (err) {
    console.error(err);
  }
}
initialData();
