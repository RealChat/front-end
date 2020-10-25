const headers = {
    "Content-Type": "application/json",
};
const baseURL = "http://localhost:9008";

const client = {};

client.get = (url) => {
    return fetch(baseURL + url).then((e) => e.json());
};

client.post = (url, body) => {
    return fetch(baseURL + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
    }).then((e) => e.json());
};

export default client;
