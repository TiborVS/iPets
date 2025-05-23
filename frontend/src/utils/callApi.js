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
    if (!fetchResponse.ok && fetchResponse.status == 401) {
        try {
            await refreshAccessToken(url);
            options.headers["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
            const retryResponse = await fetch(url + endpoint, options);
            const retryJson = await retryResponse.json();
            if (retryResponse.ok) return retryJson;
            else throw new Error(retryJson.error);
        }
        catch (err) {
            throw new Error("Invalid access token and cannot refresh, error: " + err.message);
        }
    }
    else if (!fetchResponse.ok) {
        throw new Error("Error fetching data: " + responseJson.error); 
    }
    return responseJson;
}

async function refreshAccessToken(url) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const fetchResponse = await fetch(url + "/auth/refresh", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refreshToken
        })
    });
    const responseJson = await fetchResponse.json();
    if (!fetchResponse.ok) {
        throw new Error("Error trying to refresh access token, response code " + fetchResponse.status + ", error: " + responseJson.error );
    }
    localStorage.setItem("accessToken", responseJson.accessToken);
}

export default callApi;
