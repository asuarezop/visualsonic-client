import { sendPasswordResetEmail } from 'firebase/auth';

export const forgotPassword = async (auth, email) => {
  try {
    if (email === '') {
      alert('Please enter your email address.');
      return;
    }
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};
