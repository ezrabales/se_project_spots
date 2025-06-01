const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
// modal functions
const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
};
const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
};

// edit profile Vars
const editProfileBtn = document.querySelector(".profile__edit-profile");
const editProfileModale = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModale.querySelector(".modal__close-btn");
const editProfileName = editProfileModale.querySelector("#profile-name-input");
const editProfileDescription = editProfileModale.querySelector(
  "#profile-description-input"
);
// profile vars
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// new post Vars
const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClostBtn = newPostModal.querySelector(".modal__close-btn");
const newPostLink = newPostModal.querySelector("#post-link-input");
const newPostCaption = newPostModal.querySelector("#post-caption-input");

// edit profile functions
function closeProfileModal() {
  closeModal(editProfileModale);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeProfileModal();
}

// edit profile EventListeners
editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModale);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

editProfileCloseBtn.addEventListener("click", closeProfileModal);

editProfileModale.addEventListener("submit", handleProfileFormSubmit);
//new post functions
function closeNewPostModal() {
  closeModal(newPostModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostLink.value);
  console.log(newPostCaption.value);
  closeNewPostModal();
}

// new post EventListeners
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
newPostClostBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (element) {
  console.log(element.name);
});
