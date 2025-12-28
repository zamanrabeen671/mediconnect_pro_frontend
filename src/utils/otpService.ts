import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
let confirmationResult: any = null;

const auth = getAuth();

export const setupRecaptcha = (): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: () => {
      console.log("Recaptcha verified");
    },
    "expired-callback": () => {
      console.log("Recaptcha expired");
    },
  });
};

export const sendOTP = async (phoneNumber: string): Promise<string> => {
  try {
    const recaptchaVerifier = setupRecaptcha();
    
    const confirmResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    confirmationResult = confirmResult;
    return "OTP sent successfully";
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    throw new Error(error.message || "Failed to send OTP");
  }
};

export const verifyOTP = async (otp: string): Promise<any> => {
  try {
    if (!confirmationResult) {
      throw new Error("No confirmation result found. Please request OTP first.");
    }

    const result = await confirmationResult.confirm(otp);
    
    // Get the user
    const user = result.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
      idToken: await user.getIdToken(),
    };
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    
    // Check for wrong code error
    if (error.code === "auth/invalid-verification-code") {
      throw new Error("Invalid OTP. Please try again.");
    }
    
    throw new Error(error.message || "Failed to verify OTP");
  }
};

export const clearConfirmationResult = () => {
  confirmationResult = null;
};

export const isOTPSent = (): boolean => {
  return confirmationResult !== null;
};
