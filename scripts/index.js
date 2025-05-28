// edit profile Vars
const editProfileBtn = document.querySelector(".profile__edit-profile");
const editProfileModale = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModale.querySelector(".modal__close-btn");
// new post Vars
const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClostBtn = newPostModal.querySelector(".modal__close-btn");

// edit profile EventListeners
editProfileBtn.addEventListener("click", function () {
  editProfileModale.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModale.classList.remove("modal_is-opened");
});
// new post EventListeners
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
newPostClostBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
