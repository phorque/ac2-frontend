import queryString from 'query-string';

import settings from 'webpack-env-loader!settings';

import store from 'store';
import { clearTokens } from 'action-creators';

function headers() {
    const base = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const state = store.getState();
    if (state.tokens.get(state.currentToken)) {
        base.Authorization = 'Bearer ' + state.tokens.get(state.currentToken).access_token;
    }

    return (base);
}

function handleDisconnect(response) {
    if (response.status === 401) {
        const unauthorizedError = response.headers.get('www-authenticate');
        if (unauthorizedError && unauthorizedError.match('invalid_token')) {
            store.dispatch(clearTokens());
        }
    }
    return response;
}

function handleError(response) {
    if (response.ok) {
        return response;
    }

    const error = new Error(response.statusText);

    error.response = response;
    if ((response.headers.get('content-type') || '').match('application/json')) {
        return response.json().then(() => {
            error.body = response.body;
            throw error;
        });
    }
    throw error;
}

function parseJSON(response) {
    if ((response.headers.get('content-type') || '').match('application/json')) {
        return response.json();
    }
    return Promise.resolve(null);
}

function fetchJSON(path, params) {
    return (
        fetch(path, params)
            .then(handleDisconnect)
            .then(handleError)
            .then(parseJSON)
    );
}

export default {
    create: (path, record, query) => {
        return fetchJSON(`${settings.api}${path}?${queryString.stringify(query)}`, {
            method: 'POST',
            body: JSON.stringify(record),
            mode: 'cors',
            headers: {
                ...headers()
            }
        });
    },

    update: (path, record, query) => {
        return fetchJSON(`${settings.api}${path}?${queryString.stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(record),
            mode: 'cors',
            headers: {
                ...headers()
            }
        });
    },

    find: (path, query = {}) => {
        return fetchJSON(`${settings.api}${path}?${queryString.stringify(query)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                ...headers()
            }
        });
    },

    destroy: (path, query = {}) => {
        return fetchJSON(`${settings.api}${path}?${queryString.stringify(query)}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                ...headers()
            }
        });
    }
};
