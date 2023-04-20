import { API_URL } from "./config";
import { PATH_URL } from "./config";

const API_URL_USER = API_URL + "users"

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
    let users = JSON.parse(localStorage.getItem('usertoken'))
    var formData = new FormData();
    formData.append("file", file);
    console.log(path);
    var url;
    if (path === '')
        url = API_URL + 'images/upload-single?path=' + users.id
    else
        url = API_URL + 'images/upload-single?path=' + users.id + '/' + path

    return requestUploadFile({
        url: url,
        method: 'POST',
        body: formData,
        redirect: 'follow'
    });
}

// delete
export function deleteFolder(path) {
    var raw = JSON.stringify({
        path: path
    })

    return request({
        url: API_URL + 'paths/delete',
        method: 'PATCH',
        body: raw,
        redirect: 'follow'
    });
}

// update
export function updateFolder(oldPath, newPath) {
    let users = JSON.parse(localStorage.getItem('usertoken'))
    var raw = JSON.stringify({
        oldPath: PATH_URL + users.id + '/' + oldPath,
        newPath: PATH_URL + users.id + '/' + newPath,
    })

    console.log(oldPath)
    
    return request({
        url: API_URL + 'paths/update',
        method: 'PUT',
        body: raw,
        redirect: 'follow',
    });
}


// USER 

// Hiển thị danh sách người dùng
export function getListAllUser() {
    return request({
        url: API_URL_USER ,
        method: 'GET',
        redirect: 'follow'
    });
}

// Tạo mới tài khoản người dùng
export function createUser(usersName, email, password) {
    var raw = JSON.stringify({
        "name": usersName,
        "email": email,
        "password": password
    });

    return request({
        url: API_URL_USER,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Hiển thị danh sách người dùng theo ID
export function getUserbyID(user) {
    return request({
        url: API_URL_USER + '/' + user.id,
        method: 'GET',
        redirect: 'follow'
    });
}

// Cập nhật thông tin người dùng
export function updateUser(username, email, id) {
    var raw = JSON.stringify({
        'name': username,
        'email': email
    });

    return request({
        url: API_URL_USER + "/" + id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}


// Xóa thông tin tài khoản người dùng
export function deleteUser(user) {
    return request({
        url: API_URL_USER + "/" + user.id,
        method: 'DELETE',
        redirect: 'follow'
    });
}