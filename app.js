

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

    const firstName = document.querySelector('.firstname').value;
    const lastName = document.querySelector('.lastname').value;
    const gender = document.querySelector('.gender').value;
    const age = document.querySelector('.age').value;
    const dob = document.querySelector('.dob').value;
    const email = document.querySelector('.email').value;
    const address1 = document.querySelector('.address1').value;
    const address2 = document.querySelector('.address2').value;
    const areacode = document.querySelector('.areacode').value;
    const phoneNumber = document.querySelector('.phoneNumber').value;
    const postZipCode = document.querySelector('.postZip').value;
    const city = document.querySelector('.city').value;
    const image = document.querySelector('.image').value;
    console.log(firstName, lastName, gender,age, dob, email, address1, address2, areacode, phoneNumber, postZipCode, city, image);

    saveLoginInfo(
            firstName, 
            lastName,
            gender,
            age, 
            dob,
            email,
            address1,
            address2,
            areacode,
            phoneNumber,
            postZipCode,
            city,
            image
        );

     // Reset the form inputs
     document.querySelector('.login-form').reset();
}

function saveLoginInfo(
        firstName, 
        lastName,
        gender,
        age, 
        dob,
        email,
        address1,
        address2,
        areacode,
        phoneNumber,
        postZipCode,
        city,
        image
    ) {
    const newLoginInfo = loginForm.push(); // Changed variable name to loginForm

    newLoginInfo.set({
            firstName: firstName, 
            lastName: lastName,
            gender: gender,
            age: age, 
            dob: dob,
            email: email,
            address1: address1,
            address2: address2,
            areacode: areacode,
            phoneNumber: phoneNumber,
            postZipCode: postZipCode,
            city: city,
            image: image
    });
}