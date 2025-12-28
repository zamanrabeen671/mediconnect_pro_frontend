declare module "../firebase" {
  import { Auth } from "firebase/auth";
  export const auth: Auth;
  export function RecaptchaVerifier(
    auth: Auth,
    id: string,
    options?: any
  ): any;
  export function signInWithPhoneNumber(
    auth: Auth,
    phoneNumber: string,
    appVerifier: any
  ): Promise<any>;
}
