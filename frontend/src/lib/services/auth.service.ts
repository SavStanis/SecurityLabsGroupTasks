import type { LoginUser, RegisterUser } from '$lib/models/user';

const apiUrl = 'http://localhost:8080';
export const login = (user: LoginUser) => fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json',
    }
});

export const register = (user: RegisterUser) => fetch(`${apiUrl}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json',
    }
});