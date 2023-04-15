import { API_URL } from "./config";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const token = localStorage.getItem('accesstoken');

    if (token) {
        headers.append("Authorization",
            "Bearer " + token);
    }
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return json;
            })
        );
};


const requestUploadFile = (options) => {
    const headers = new Headers();

    const token = localStorage.getItem('accesstoken');

    if (token) {
        headers.append("Authorization",
            "Bearer " + token);
    }
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return json;
            })
        );
};

// Lấy tất cả folder và file đã được tạo
export function getListpath(path) {
    var raw = JSON.stringify({
        "path": path
    })

    return request({
        url: API_URL + 'paths',
        body: raw,
        method: 'POST',
        redirect: 'follow'
    })
}


// Tạo mới folder
export function createFolder(name, path) {
    var raw = JSON.stringify({
        name: name,
        path: path,
    })

    return request({
        url: API_URL + 'paths/create',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Upload file
export function uploadFile(file, path) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);

    return requestUploadFile({
        url: API_URL + 'images/upload-single?path=' + path,
        method: 'POST',
        body: formData,
        redirect: 'follow'
    });
}