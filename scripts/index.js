const initialCards = [
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
// image modal variables
const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalDescription = imageModal.querySelector(
  ".modal__image-description"
);
const imageModalCloseBtn = imageModal.querySelector(".modal__image-close-btn");

// modal functions
const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
};
const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  removeEscape()
};

// image modal close button
imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

// edit profile Vars
const editProfileBtn = document.querySelector(".profile__edit-profile");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);
// profile vars
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// new post Vars
const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostLink = newPostModal.querySelector("#post-link-input");
const newPostCaption = newPostModal.querySelector("#post-caption-input");

// edit profile functions
function closeProfileModal() {
  closeModal(editProfileModal);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeProfileModal();
}

// edit profile EventListeners
editProfileBtn.addEventListener("click", function () {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  hideErrorMsgs(editProfileModal, [editProfileName, editProfileDescription], settings)
  openModal(editProfileModal);
  enableValidation(settings);
  addEscape(editProfileModal)
});

editProfileCloseBtn.addEventListener("click", closeProfileModal);

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
//new post functions
function closeNewPostModal() {
  closeModal(newPostModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: newPostCaption.value, link: newPostLink.value };
  initialCards.push(newCard);
  addCard(newCard);
  closeNewPostModal();
  newPostCaption.value = "";
  newPostLink.value = "";
}

// new post EventListeners
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
  enableValidation(settings);
  addEscape(newPostModal)
});
newPostCloseBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", handleNewPostSubmit);

// close modals by clicking outside
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        closeModal(modal);
      };
  });
});

// close modals when "esc" is pressed
const addEscape = (modal) => {
  document.addEventListener("keydown", escEventListener = (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal)
    }
  })
}

// remove event listener for "esc"
const removeEscape = () => {
  document.removeEventListener("keydown", escEventListener)
}

// card template vars
const cardTemplate = document.querySelector("#card__template");
const cardsList = document.querySelector(".cards__list");

//card template functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  // like listener
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn-clicked");
  });
  // trash listener
  const cardTrashBtn = cardElement.querySelector(".card__trash-btn");
  cardTrashBtn.addEventListener("click", () => {
    cardTrashBtn.closest(".card").remove();
  });
  // image listener
  cardImage.addEventListener("click", () => {
    imageModalDescription.textContent = data.name;
    imageModalImage.src = data.link;
    imageModalImage.alt = data.name;
    openModal(imageModal);
    addEscape(imageModal)
  });

  return cardElement;
};

const addCard = (newCard) => {
  const card = getCardElement(newCard);
  cardsList.prepend(card);
};

initialCards.forEach((initialCard) => {
  addCard(initialCard);
});
