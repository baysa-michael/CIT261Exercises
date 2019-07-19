const baseURL = 'http://127.0.0.1:3000/';

export default async function makeRequest(url, method = 'GET', body = null) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(baseURL + url, options);

    //Convert to JSON before continuing to process
    const data = await response.json();

    if (!response.ok) {
        // Server Responses:
        // 500 - Token Expired
        // 401 - Not authorized (Incorrect Username/Password Combo)
        // 404 - Page does not exist

        console.log(response);
        throw new Error(`${data.status}: ${data.message}`);
    } else {
        console.log(data);
        return data;
    }
}