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
  editProfileModale.classList.remove("modal_is-opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeProfileModal();
}

// edit profile EventListeners
editProfileBtn.addEventListener("click", function () {
  editProfileModale.classList.add("modal_is-opened");
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

editProfileCloseBtn.addEventListener("click", closeProfileModal);

editProfileModale.addEventListener("submit", handleProfileFormSubmit);
//new post functions
function closeNewPostModal() {
  newPostModal.classList.remove("modal_is-opened");
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostLink.value);
  console.log(newPostCaption.value);
  closeNewPostModal();
}

// new post EventListeners
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
newPostClostBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", handleNewPostSubmit);
