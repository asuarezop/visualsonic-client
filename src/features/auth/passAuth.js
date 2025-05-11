import { sendPasswordResetEmail } from 'firebase/auth';

export const forgotPassword = async (auth, email) => {
  await sendPasswordResetEmail(auth, email);
};
