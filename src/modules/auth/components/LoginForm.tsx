import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams } from '../../../models/auth';
import { useFormik } from 'formik';
import { validateLogin } from '../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}


const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const validate = validateLogin;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    validateOnChange: false, 
    validateOnBlur: false,
    onSubmit: values => {
      onLogin(values);
    },
  });


  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={formik.handleSubmit}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="email" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {formik.errors.email
          &&
          <small className="text-danger">
            <FormattedMessage id={formik.errors.email} />
          </small>
        }
      </div>

      <div className="col-md-12">
        <label htmlFor="password" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {formik.errors.password
          &&
          <small className="text-danger">
            <FormattedMessage id={formik.errors.password} />
          </small>
        }

      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMe"
            value=""
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
