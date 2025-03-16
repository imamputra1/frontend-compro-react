async function request(url, params, method = "GET") {
    console.log("Request URL:", url);
    console.log("Request Params:", params);
    console.log("Request Method:", method);

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = localStorage.getItem("access_token");
    if (token) {
      Object.assign(options.headers, { Authorization: `Bearer ${token}` });
    }
  
    if (params) {
        if (["GET", "DELETE"].includes(method)) {
            url += `?${objectToQueryString(params)}`;
        } else {
            Object.assign(options, {
                body: JSON.stringify(params),
            });
        }
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const response = await fetch(url.startsWith("http") ? url  : `${baseUrl}${url}`, options);

    const result = await response.json(); // Gunakan await untuk mengambil data JSON
    if (!response.ok) { // Perbaiki typo dari 'respon' ke 'response'
        throw result; // Melemparkan error dengan data JSON
    }
    return result; // Mengembalikan data JSON jika tidak ada error
}

function objectToQueryString(obj) {
    const params = new URLSearchParams(obj);
    return params.toString();
}

function get(url, params) {
    return request(url, params, "GET");
}

function create(url, params) {
    return request(url, params, "POST");
}

function update(url, params) {
    return request(url, params, "PUT");
}

function remove(url, params) {
    return request(url, params, "DELETE");
}

const $fetch = {
    get,
    create,
    update,
    remove,
};

export default $fetch;