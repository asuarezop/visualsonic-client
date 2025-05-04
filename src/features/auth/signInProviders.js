import {
  auth,
  loginAuth,
  microsoftProvider,
  googleProvider,
  facebookProvider,
} from '../../firebase/firebase';
import {
  signInWithPopup,
  FacebookAuthProvider,
  linkWithRedirect,
} from 'firebase/auth';

export const signInGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

export const signInMicrosoft = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    console.log(result.user);
  } catch (err) {
    console.log('Error during Microsoft sign-in:', err);
    throw err;
  }
};

export const signInFacebook = async () => {
  try {
    linkWithRedirect(loginAuth.currentUser, facebookProvider).then((res) => {
      // const fbCredential = FacebookAuthProvider.credentialFromResult(res);
      // const user = res.user;
      // console.log(fbCredential, user);
    });
    const result = await signInWithPopup(auth, facebookProvider);
    console.log(result.user);
  } catch (err) {
    console.log('Error during Facebook sign-in:', err);
    throw err;
  }
};
