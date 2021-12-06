import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_NbHFq63z0aUyhDHILFQZPZCMv4tCvOs",
  authDomain: "nftdemo-8b434.firebaseapp.com",
  projectId: "nftdemo-8b434",
  storageBucket: "nftdemo-8b434.appspot.com",
  messagingSenderId: "584145387201",
  appId: "1:584145387201:web:8c12556aafa19ce972de40",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const user = auth.currentUser;
console.log("testHello", user);

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    document.getElementById("avatar").src = photoURL;
    document.getElementById("uname").innerHTML = displayName;

    window.location.href = "./admin.html";
    console.log("count");
  } else {
    // window.location.href = "./index.html";
  }
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  // document.getElementById("uname").innerHTML = email;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..

      console.log(errorCode);

      switch (errorCode) {
        case "auth/email-already-in-use":
          signIn(auth, email, password);
          break;

        default:
          break;
      }
    });
});

document.getElementById("google").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

      console.log(user);

      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      document.getElementById("avatar").src = photoURL;
      document.getElementById("uname").innerHTML = displayName;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      console.log({ errorCode }, { errorMessage }, { email }, { credential });
    });
});

const signIn = (auth, email, password) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid);

              const displayName = user.displayName;
              const email = user.email;
              const photoURL = user.photoURL;
              const emailVerified = user.emailVerified;

              setTimeout(() => {
                document.getElementById("avatar").src = photoURL;
                document.getElementById("uname").innerHTML = displayName;
              }, 1);
            } else {
              // User is signed out
              // ...
            }
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log({ errorCode }, { errorMessage }, { email }, { credential });
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

document.getElementById("logout").addEventListener("click", () => {
  console.log("logout");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signing out");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log("singout error", error);
    });
});
