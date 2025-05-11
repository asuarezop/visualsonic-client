import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const registerUser = async (auth, email, password) => {
  try {
    //Create new user profile
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log('User created:', user.uid);

    //Send email verification to new user's email
    await sendEmailVerification(user);
    alert(
      `Email verification was sent to ${email}. Please verify user to login.`
    );
  } catch (err) {
    console.log(err);
  }
};

export const loginUserWithEmailAndPassword = async (auth, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const results = userCredential.user;

    if (results.emailVerified === false) {
      alert('Please verify your email to login.');
      return;
    }

    return results;
  } catch (err) {
    console.error(err);
  }
};
