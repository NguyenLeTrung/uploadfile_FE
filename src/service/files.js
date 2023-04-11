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



const requestGet = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
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



//  Lấy danh sách các file;
export function getListFiles(id) {
    return requestGet({
        url: API_URL + "list-file/" + id,
        method: 'GET'
    });
}


//  Tại file mới;
export function saveFile(file, userId) {

    // var raw = JSON.stringify({
    //     file: file,
    //     user: userId
    // })
    console.log(file);
    let formData = new FormData();
    formData.append("file", file.name);
    formData.append("user", userId);
    console.log(formData);

    return request({
        url: API_URL + "upload",
        method: 'POST',
        body: formData,
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