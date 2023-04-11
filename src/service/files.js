import { API_URL } from "./config";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'multpart/form-data'
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options) 
    .then(response => {
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
    });
};



//  Lấy danh sách các file;
export function getListFiles(id) {
    return request({
        url: API_URL + "list-file/" + id,
        method: 'GET'
    });
}


//  Tại file mới;
export function saveFile(file, userId) {
    var raw = JSON.stringify({
        file: file,
        user: userId
    })

    return request({
        url: API_URL + "upload",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Xóa file đã có;
export function deleteFile(id) {
    return request({
        url: API_URL + "delete-file/" + id,
        method: 'DELETE'
    })
} 