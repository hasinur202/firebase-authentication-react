import './App.css';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const {displayName, email, photoURL} = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const handleGithubSignIn = () => {
      signInWithPopup(auth, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const {displayName, email, photoURL} = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <div className="App">
          {  !user.name ?
            <div>
              <button onClick={handleGoogleSignIn}>Google Sign In</button>
              <button onClick={handleGithubSignIn}>Github Sign In</button>
            </div> : 
            <button onClick={handleSignOut}>Sign Out</button>
          }
          <br />
          {
            user.name && <div>
                <h2>Welcome {user.name}</h2>
                <p>I know your email address: {user.email}</p>
                <img src={user.photo} alt="" />
              </div>
          }
    </div>
  );
}

export default App;
