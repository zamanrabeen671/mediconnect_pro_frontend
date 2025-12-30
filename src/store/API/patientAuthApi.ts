import axios from "axios";

const API_BASE_URL = typeof window !== "undefined" 
  ? (window as any).__API_URL__ || "http://localhost:3000"
  : "http://localhost:3000";

// Patient OTP sign-in API
export const patientOTPSignIn = async (
  firebaseUid: string,
  idToken: string,
  phoneNumber: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/patient/otp-login`,
      {
        firebaseUid,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in patient OTP sign-in:", error);
    throw error;
  }
};

// Patient sign-up via OTP
export const patientOTPSignUp = async (
  firebaseUid: string,
  idToken: string,
  phoneNumber: string,
  userData?: {
    name?: string;
    email?: string;
  }
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/patient/otp-register`,
      {
        firebaseUid,
        phoneNumber,
        ...userData,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in patient OTP sign-up:", error);
    throw error;
  }
};
