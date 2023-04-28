import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import logo from '../../../logo-420-x-108.png';
import SignUpForm from '../components/SignUpForm';
import { locationURL } from '../../../utils/constants';
import { ISignUpParams } from '../../../models/auth';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import axios from 'axios';

import { fetchThunk } from '../../common/redux/thunk';
const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [locations, setLocations] = useState([]);

    const getLocations = React.useCallback(() => {
        setLoading(true);
        axios.get(locationURL)
            .then(({ data }) => {
                // handle success
                setLocations(data.data);
                setLoading(false);
            })
            .catch((error) => {
                // handle error
                console.error(error);
            })
    }, [setLoading, setLocations]);

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values),
            );

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                console.log(json.data);
                alert('Chúc mừng bạn đã đăng ký thành công');
                dispatch(replace(ROUTES.login));
                return;
            }

            setErrorMessage(getErrorMessageResponse(json));
            
            console.log(json);
        },
        [dispatch],
    );

    useEffect(() => {
        getLocations()
    }, [getLocations])

    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <img src={logo} alt="logo" style={{ maxWidth: '250px', margin: '32px' }} />
            <SignUpForm onSignUp={onSignUp} loading={loading} setLoading={setLoading} errorMessage={errorMessage} locations={locations} />
        </div>
    )
}

export default SignUpPage