import { ILoginValidation, ISignUpValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

export const validateLogin = (values: any) => {
  const errors: ILoginValidation = {};
  if (!values.email) {
    errors.email = 'emailRequire';
  } else if (!validEmailRegex.test(values.email)) {
    errors.email = 'emailInvalid';
  }

  if (!values.password) {
    errors.password = 'passwordRequire';
  }

  if (values.password.length < 4 && values.password.length > 0) {
    errors.password = 'minPasswordInvalid';
  }

  return errors;
};

export const validateSignUp = (values:any) => {
  const errors: ISignUpValidation = {};
  if (!values.email) {
      errors.email = 'emailRequire';
  } else if (!validEmailRegex.test(values.email)) {
      errors.email = 'emailInvalid';
  }

  if (!values.password) {
      errors.password = 'passwordRequire';
  }

  if (values.password.length < 4 && values.password.length > 0) {
      errors.password = 'minPasswordInvalid';
  }

  if (!values.repeatPassword) {
      errors.repeatPassword = 'passwordRequire';
  }

  if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'repeatPasswordWrong';
  }

  if (!values.name) {
      errors.name = 'nameRequired';
  }

  if (!values.gender) {
      errors.gender = 'genderRequired';
  }

  if (!values.region) {
      errors.region = 'regionRequired';
  }

  if (!values.state) {
      errors.state = 'stateRequired';
  }

  return errors;
}
