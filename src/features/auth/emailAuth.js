import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
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
