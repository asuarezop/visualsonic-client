import {
  auth,
  loginAuth,
  microsoftProvider,
  googleProvider,
  facebookProvider,
} from '../../firebase/firebase.js';
import {
  signInWithPopup,
  FacebookAuthProvider,
  linkWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const signInEmailAcct = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

export const signInGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

export const signInMicrosoft = async () => {
  try {
    await linkWithRedirect(loginAuth.currentUser, microsoftProvider).then(
      (res) => {
        const user = res.user;
        console.log(user);

        const redirectRes = getRedirectResult(auth);
        console.log(redirectRes);
      }
    );
    // const result = await signInWithPopup(auth, microsoftProvider);
    // console.log(result.user);
  } catch (err) {
    console.log('Error during Microsoft sign-in:', err);
    throw err;
  }
};

export const signInFacebook = async () => {
  try {
    linkWithRedirect(loginAuth.currentUser, facebookProvider).then((res) => {
      const fbCredential = FacebookAuthProvider.credentialFromResult(res);
      const user = res.user;
      console.log(fbCredential, user);
      // console.log(res.user);
    });
    // const result = await signInWithPopup(auth, facebookProvider);
  } catch (err) {
    console.log('Error during Facebook sign-in:', err);
    throw err;
  }
};
