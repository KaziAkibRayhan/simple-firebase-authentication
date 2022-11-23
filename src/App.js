import "./App.css";
import React, { useState } from "react";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser({}))
      .catch(() => setUser({}));
  };

  // github sign in

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      )}
      {user.uid && (
        <div>
          <h3>User Name: {user.displayName}</h3>
          <h5>e-mail address: {user.email}</h5>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default App;
