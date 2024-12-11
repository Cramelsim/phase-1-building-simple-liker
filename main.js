// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const errorMessage = document.getElementById("modal-message");
  const hearts = document.querySelectorAll(".like-glyph");

  // Initially hide the error modal
  errorModal.classList.add("hidden");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      const isFullHeart = heart.classList.contains("activated-heart");

      mimicServerCall()
        .then(() => {
          if (isFullHeart) {
            heart.textContent = "♡"; // When a user clicks on a full heart change the heart back to an empty heart
            heart.classList.remove("activated-heart");
          } else {
            heart.textContent = "♥"; // full red heart when the user clicks on an empty heart
            heart.classList.add("activated-heart");
          }
        })
        //When the "server" returns a failure status
        .catch((error) => {
          errorMessage.textContent = error;
          errorModal.classList.remove("hidden");
          //hide the modal after 3 seconds (add the .hidden class)
          setTimeout(() => errorModal.classList.add("hidden"), 3000);
        });
    });
  });
});
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------


function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
