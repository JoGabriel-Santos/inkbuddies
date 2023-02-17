import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((request) => {
    if (localStorage.getItem('profile')) {
        request.headers.Authorization = JSON.parse(localStorage.getItem('profile'))['token'].credential ?
            `Bearer ${JSON.parse(localStorage.getItem('profile'))['token'].credential}` :
            `Bearer ${JSON.parse(localStorage.getItem('profile'))['token']}`
    }

    return request;
})

export const fetchUsers = () => API.get('/user');
export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (updatedUser) => API.patch('/user/update', updatedUser);

export const fetchPenpals = (id) => API.get(`/penpal/fetch/${id}`);
export const createPenpal = (penpalData) => API.post('/penpal/new', penpalData);
export const sendLetter = (letterData) => API.patch('/penpal/letter', letterData);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);