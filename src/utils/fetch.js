import { useAuthStore } from "@stores/auth.store"

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export const $fetch = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method) {
    return async (url, data) => {
        const config = {
            method,
            headers: headers()
        }

        if (data) {
            config.headers['Content-Type'] = 'application/json'
            config.body = JSON.stringify(data)
        }

        return fetch(VITE_API_ENDPOINT + url, config).then(response)
    }
}

function response(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)

        if (!response.ok) {
            const { isAuthenticated, logout } = useAuthStore()

            if ([401, 403].includes(response.status) && isAuthenticated) {
                logout()
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}

function headers() {
    const { token } = useAuthStore()

    if (token) {
        return {
            Authorization: `Bearer ${token}`
        }
    } else {
        return {}
    }
}