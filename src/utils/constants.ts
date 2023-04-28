export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';
export const APIUrl = development ? process.env.REACT_APP_API_URL : 'https://google.com';

export const ACCESS_TOKEN_KEY = 'token';

export const GENDER = [
    {
        label: 'Male',
        value: 'Male'
    },
    {
        label: 'Female',
        value: 'Female'
    },
    {
        label: 'Other',
        value: 'Other'
    }
]

export const locationURL = process.env.REACT_APP_API_URL + '/api/v1/location';
