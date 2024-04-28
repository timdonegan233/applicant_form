

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

// Get a reference to the Firebase Storage
let storageRef = firebase.storage().ref('images');

document.querySelector('.login-form').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const firstName = document.querySelector('.firstname').value;
    const lastName = document.querySelector('.lastname').value;
    const gender = document.querySelector('.gender').value;
    const age = document.querySelector('.age').value;
    const dob = document.querySelector('.dob').value;
    const email = document.querySelector('.email').value;
    const fianceFirstName = document.querySelector('.fianceFirstname').value;
    const fianceLastName = document.querySelector('.fianceLastname').value;
    const address1 = document.querySelector('.address1').value;
    const address2 = document.querySelector('.address2').value;
    const areacode = document.querySelector('.areacode').value;
    const phoneNumber = document.querySelector('.phoneNumber').value;
    const postZipCode = document.querySelector('.postZip').value;
    const city = document.querySelector('.city').value;
    const imageFile = document.querySelector('.image').files[0]; // Get the selected image filee;
    console.log(firstName, lastName, gender,age, dob, email, fianceFirstName, fianceLastName, address1, address2, areacode, phoneNumber, postZipCode, city, image);

 // Upload image to Firebase Storage
 const imageRef = storageRef.child('images/' + imageFile.name);
 imageRef.put(imageFile)
     .then((snapshot) => {
         // Get the URL of the uploaded image
         return snapshot.ref.getDownloadURL();
     })
     .then((imageUrl) => {
         // Save form data and image URL to Firebase Realtime Database
         saveLoginInfo(firstName, lastName, gender, age, dob, email, fianceFirstName, fianceLastName, address1, address2, areacode, phoneNumber, postZipCode, city, imageUrl);

         // Reset the form inputs
         document.querySelector('.login-form').reset();
     })
     .catch((error) => {
         console.error("Error uploading image: ", error);
     });
}

function saveLoginInfo(firstName, lastName, gender, age, dob, email, fianceFirstName, fianceLastName, address1, address2, areacode, phoneNumber, postZipCode, city, imageUrl) {
 const newLoginInfo = database.push();

 newLoginInfo.set({
     firstName: firstName,
     lastName: lastName,
     gender: gender,
     age: age,
     dob: dob,
     email: email,
     fianceFirstName: fianceFirstName,
     fianceLastName: fianceLastName,
     address1: address1,
     address2: address2,
     areacode: areacode,
     phoneNumber: phoneNumber,
     postZipCode: postZipCode,
     city: city,
     imageUrl: imageUrl // Save the URL of the uploaded image
 });
}