

const firebaseConfig = {
    apiKey: "AIzaSyAzsTxTZIPwjB0wXQ0P72_CuhN6msvz9J4",
    authDomain: "mil-form.firebaseapp.com",
    databaseURL: "https://mil-form-default-rtdb.firebaseio.com",
    projectId: "mil-form",
    storageBucket: "mil-form.appspot.com",
    messagingSenderId: "294740847862",
    appId: "1:294740847862:web:91473edeaa4e1bd98f50d7"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

//   const db = firebase.firestore();

let loginForm = firebase.database().ref("infos"); // Database reference
const form = document.querySelector('.formbold-form-wrapper');
const formSuccess = document.querySelector('.form-submitted');
let imageUrl = '';
let identityUrl = '';

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

        // Set expiration time for the loader (e.g., 3 seconds)
        const expirationTime = 3000; // in milliseconds

        // Hide the loader after expiration time
        setTimeout(function() {
            loader.style.display = 'none';
        }, expirationTime);

    document.querySelector('.login-form').addEventListener("submit", submitForm);

    function submitForm(e) {
        e.preventDefault();


    // Get form input values
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
    const imageFile = document.querySelector('.image').files[0]; // Get the selected image file
    const identity = document.querySelector('.identity').value;
    const identityImage = document.querySelector('.identityImage').files[0];
    
    // Upload image to Firebase Storage
    if (imageFile && identityImage) {
        const storageRefImage = firebase.storage().ref('images/' + imageFile.name);
        const storageRefIdentity = firebase.storage().ref('identity/' + identityImage.name);
    
        const imageUploadTask = storageRefImage.put(imageFile);
        const identityUploadTask = storageRefIdentity.put(identityImage);
    
        Promise.all([imageUploadTask, identityUploadTask])
            .then((snapshots) => {
                const imageDownloadURL = snapshots[0].ref.getDownloadURL();
                const identityDownloadURL = snapshots[1].ref.getDownloadURL();
                return Promise.all([imageDownloadURL, identityDownloadURL]);
            })
            .then((downloadURLs) => {
                imageUrl = downloadURLs[0];
                identityUrl = downloadURLs[1];
    
                // Save form data and image URLs to Firebase Realtime Database
                saveLoginInfo(firstName, lastName, gender, age, dob, email, fianceFirstName, fianceLastName, address1, address2, areacode, phoneNumber, postZipCode, city, identity, imageUrl, identityUrl);
    
                // Reset the form inputs
                document.querySelector('.login-form').reset();
            })
            .catch((error) => {
                console.error("Error uploading images:", error);
            });
    } else {
        console.error("No files selected.");
    }
    
    form.classList.add('hidden');
        loader.style.display = 'block';
        setTimeout(function() {
            loader.style.display = 'none';
            formSuccess.classList.add('display');
        }, 3000);
        
        

    }
})

    const formCloseButton = document.querySelector('.form-close').addEventListener('click', (e) => {
        form.classList.remove('hidden');
        formSuccess.classList.remove('display');
    });

    function saveLoginInfo(firstName, lastName, gender, age, dob, email, fianceFirstName, fianceLastName, address1, address2, areacode, phoneNumber, postZipCode, city, identity, imageUrl, identityUrl) {
        const newLoginInfo = loginForm.push();

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
            identity: identity,
            imageUrls: imageUrl, // Save the URL of the uploaded image
            identityUrl: identityUrl
        });


    }
    