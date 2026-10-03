export interface RegistrationPayload{
    name : string;
        email: string;
        password: string;
        patient:{
          contactNumber?: string;
        },
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

