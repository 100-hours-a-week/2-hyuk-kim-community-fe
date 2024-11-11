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

    // try {
    const response = await fetch(endpoint, options);
    if (!(response.status >= 200 && response.status < 300)) {
        // 상태 코드를 포함한 에러 객체를 생성
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status; // 상태 코드 추가
        throw error;
    }
    return await response.json();
    // }
    // catch (error) {
    //     // console.error('Fetch error:', error);
    //     throw error; // 오류를 호출하는 함수로 전달
    // }
}
