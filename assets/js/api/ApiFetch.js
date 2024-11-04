// api.js (또는 원하는 파일명)
// const constants = require('./constants');
// import constants from './constants';

export default async function apiFetch(endpoint, method, body = null) {
    const options = {
        method: method,
        headers: {
            method: method,
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // 오류를 호출하는 함수로 전달
    }
}

// export const apiFetch= {
//     apiFetch,
// };
