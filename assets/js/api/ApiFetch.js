export default async function apiFetch(endpoint, method, body = null) {
    const options = {
        method: method,
        headers: {
            method: method,
            'Content-Type': 'application/json',
            'sessionid': `${sessionStorage.getItem('sessionId')}` || null,
            'userid': `${sessionStorage.getItem('userId')}` || null
        },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(endpoint, options);
    if (!(response.status >= 200 && response.status < 300)) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status; // 상태 코드 추가
        error.response = await response.json();
        throw error;
    }
    const json = await response.json();
    console.log(`json : ${JSON.stringify(json)}`);
    return (json.data) || '';
}
