export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number;
  state: number;
}

export interface ILocationParams {
  id: number;
  name: string;
  pid?: number;
}

export interface IGenderParams {
  label: string,
  value: string
}
