  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAF67FucZE2ziExqX9O-Dile19gJguY_uM",
    authDomain: "gaming-app-eff22.firebaseapp.com",
    projectId: "gaming-app-eff22",
    storageBucket: "gaming-app-eff22.firebasestorage.app",
    messagingSenderId: "891163282279",
    appId: "1:891163282279:web:75d3c3ffaed30b134e3dc2"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  //show message function
  function showMessage(message) {
    let messageDiv = document.getElementById('messageDiv');
    if (messageDiv) {
      messageDiv.style.display = 'block'; // Ensure the div is visible
      messageDiv.innerText = message;     // Set the message text
      messageDiv.style.opacity = 1;       // Make it visible with opacity
      messageDiv.style.transition = 'opacity 0.5s ease-out'; // Smooth transition
  
      setTimeout(() => {
        messageDiv.style.opacity = 0;  // Fade out the message
        setTimeout(() => {
          messageDiv.style.display = 'none'; // Hide the div after fade-out
        }, 500); // Wait for the fade out animation to complete
      }, 5000); // Show the message for 5 seconds
    }
  }
  

  // register logic page
  const register = document.getElementById('registerBtn');
  if(register){
    register.addEventListener('click', (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        Email : email,
        Username : username,
        Password : password
      };
      showMessage('Account Created Successfully!');
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, userData)
      .then(setTimeout(()=>{
        window.location.href = './index.html';
      },3000))
      .catch((err) => {
        console.error('error writing document', err);
      });
    })
    .catch((err) =>{
      const errorCode = err.code;
      if(errorCode == 'auth/email-already-in-use'){
        showMessage('Email Address Already Exist!');
      }else{
        showMessage('Unable to create user. Please try again.');
      }
    });
  });
}


// login page
const login = document.getElementById('loginBtn');
if(login){
  login.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
      showMessage('login is successful Redirecting...');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      setTimeout(()=>{
        window.location.href = './Banner.html';
      },3000);
    })
    .catch((err) =>{
      const errorCode = err.code;
      if(errorCode == 'auth/user-not-found'){
        showMessage('Account does not exist. Please register first.');
      }else if(errorCode == 'auth/wrong-password'){
        showMessage("Unable to sign in. Please try again later.");
      }else{
        console.error('Error Loging in:', err)
        showMessage('Incorrect email or password. Please try again.');
      }
    });
  });
}


// reset password
const reset = document.getElementById('resetBtn');
if(reset){
  reset.addEventListener('click', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    // const newpassword = document.getElementById('newpassword').value;
    
    sendPasswordResetEmail(auth, email)
    .then(() => {
      showMessage('Password reset email sent! Please check your inbox');
      setTimeout(() => {
      window.location.href = './index.html';
    }, 2000);
  })
  .catch((err) => {
    const errorCode = err.code;
    const errMessage = err.message;
    
    if(errorCode == 'auth/invalid-email'){
      showMessage('Invalid email address.');
    }else if (errorCode == 'auth/user-not-found'){
      showMessage('No user found with that email address.');
    }else{
      showMessage('Error: ' + errMessage)
    }
  });
});
}


//  continue as guest
const guest = document.getElementById('guestBtn');
if(guest){
  guest.addEventListener('click', (event) => {
    event.preventDefault();

    signInAnonymously(auth)
    .then((userCredential)=>{
      showMessage('Logged in as Guest. Redirecting...');
      const user = userCredential.user;
     // localStorage.setItem('guestUserId', user.uid);
      setTimeout(() => {
        window.location.href = './Product.html';
      }, 3000);
    })
    .catch((err) =>{
      const errorCode = err.code;
      showMessage('Unable to continue as guest. Please try again.');
    })
  });
}
