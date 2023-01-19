// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Access to keys for Firebase
const apiKeyValue = process.env.FIREBASE_APIKEY;
const authDomainValue = process.env.FIREBASE_AUTHDOMAIN;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKeyValue,
  authDomain: authDomainValue,
  databaseURL: "https://showcase-app-storage-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "showcase-app-storage",
  storageBucket: "showcase-app-storage.appspot.com",
  messagingSenderId: "178009428545",
  appId: "1:178009428545:web:54ab7de271b02350c06cc0",
  measurementId: "G-1NK5TJCZB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


var projectsRef = firebase.firestore().collection("projectlikes");

function getLikes(projectId) {
  projectsRef.doc(projectId).get().then(function(doc) {
    if (doc.exists) {
      var likes = doc.data().likes;
      console.log("Number of likes: ", likes);
      // Display the number of likes on your GitHub Pages application
    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

// Function to increment the number of likes for a specific project
function incrementLikes(projectId) {
  projectsRef.doc(projectId).update({
    likes: firebase.firestore.FieldValue.increment(1)
  }).then(function() {
    console.log("Likes incremented!");
    // Retrieve the updated number of likes and display it on your GitHub Pages application
    getLikes(projectId);
  }).catch(function(error) {
    console.log("Error incrementing likes:", error);
  });
}

const contentFolder = "path/to/content/folder";
fs.readdir(contentFolder, (err, folders) => {
  if (err) {
    console.log(err);
    return;
  }

  // Iterate over the list of folders
  folders.forEach(folder => {
    // Create a Firestore document for each folder with a "likes" field
    firebase.firestore().collection("projectlikes").doc(folder).set({
      likes: 0
    }).then(() => {
      console.log(`Document for folder ${folder} created`);
    }).catch(error => {
      console.log(`Error creating document for folder ${folder}:`, error);
    });
  });
});
