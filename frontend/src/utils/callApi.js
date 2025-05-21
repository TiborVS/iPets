async function callApi(method, url, endpoint, body, token) {
    let options = {};
    let headers = {};
    if (body) {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    options.headers = headers;
    options.method = method;
    const fetchResponse = await fetch(url + endpoint, options);
    const responseJson = await fetchResponse.json();
    return responseJson;
}

export default callApi;
