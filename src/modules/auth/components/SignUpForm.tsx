import React from 'react'
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import { ILocationParams, IGenderParams } from '../../../models/auth';
import { GENDER, locationURL } from '../../../utils/constants';
import { ISignUpParams } from '../../../models/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { validateSignUp } from '../utils';

interface Props {
    onSignUp(values: ISignUpParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}


const SignUpForm = ({ locations, loading, errorMessage, setLoading, onSignUp }: Props) => {
    const [states, setStates] = useState<Array<ILocationParams>>([]);

    const validate = validateSignUp;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            gender: '',
            region: 0,
            state: 0,
        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            onSignUp(values);
        },
    });


    const getStates = React.useCallback(() => {
        setLoading(true);
        axios.get(`${locationURL}/?pid=${formik.values.region}`)
            .then(({ data }) => {
                // handle success
                setStates(data.data);
                setLoading(false);
            })
            .catch((error) => {
                // handle error
                console.error(error);
            })
    }, [setStates, setLoading, formik.values.region]);

    useEffect(() => {
        getStates()
    }, [getStates]);

    return (
        <form
            style={{ maxWidth: '560px', width: '100%' }}
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
                    autoComplete="on"
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
            <div className="col-md-12">
                <label htmlFor="repeatPassword" className="form-label">
                    <FormattedMessage id="repeatPassword" />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                    autoComplete="on"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />

                {formik.errors.repeatPassword
                    &&
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.repeatPassword} />
                    </small>
                }
            </div>

            <div className="col-md-12">
                <label htmlFor="name" className="form-label">
                    <FormattedMessage id="name" />
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />

                {formik.errors.name
                    &&
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.name} />
                    </small>
                }

            </div>

            <div className="col-md-12">
                <label htmlFor="gender" className="form-label">
                    <FormattedMessage id="gender" />
                </label>
                <select
                    defaultValue={'DEFAULT'}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={formik.handleChange}
                    id="gender"
                    name="gender"
                >
                    <option disabled hidden value="DEFAULT" > -- select an option -- </option>
                    {GENDER.map((gen: IGenderParams, index: number) => (
                        <option key={index} value={gen.value}>
                            {gen.label}
                        </option>
                    ))}
                </select>
                {formik.errors.gender
                    &&
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.gender} />
                    </small>
                }
            </div>

            <div className="col-md-12">
                <label htmlFor="region" className="form-label">
                    <FormattedMessage id="region" />
                </label>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    id="region"
                    name="region"
                    onChange={(e) => {
                        formik.values.state = 0;
                        formik.handleChange(e);
                    }}
                    value={formik.values.region}
                >
                    <option disabled hidden value="0"> -- select an option -- </option>
                    {locations.map((location: ILocationParams) => (
                        <option
                            key={location.id}
                            value={location.id}
                        >
                            {location.name}
                        </option>
                    ))}
                </select>
                {formik.errors.region
                    &&
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.region} />
                    </small>
                }
            </div>
            {
                (formik.values.region !== 0 && states) &&
                <div className="col-md-12">
                    <label htmlFor="state" className="form-label">
                        <FormattedMessage id="state" />
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="state"
                        name="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    >
                        <option disabled hidden value="0" > -- select an option -- </option>
                        {states.map((state: ILocationParams) => (
                            <option
                                key={state.id}
                                value={state.id}
                            >
                                {state.name}
                            </option>
                        ))}
                    </select>
                    {formik.errors.state
                        &&
                        <small className="text-danger">
                            <FormattedMessage id={formik.errors.state} />
                        </small>
                    }
                </div>
            }

            <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
                <div className="col-md-auto">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                        <FormattedMessage id="register" />
                    </button>
                </div>
            </div>
        </form >
    )
}

export default SignUpForm