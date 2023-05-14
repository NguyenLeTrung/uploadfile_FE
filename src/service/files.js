import { API_URL } from "./config";
import { PATH_URL } from "./config";

const API_URL_USER = API_URL + "users"
const API_URL_STAFF = API_URL + "staffs"

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
        url: API_URL + 'v1/' +'paths',
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
        url: API_URL + 'v1/' + 'paths/create',
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


export function uploadMultipleFile(files, path) {
	let users = JSON.parse(localStorage.getItem('usertoken'))
	var formData = new FormData();
	for (let i = 0; i < files.length; i++) {
		formData.append('file', files[i]);
	}
	var url;
	if (path === '')
			url = API_URL + 'images/upload-multiple?path=' + users.id
	else
			url = API_URL + 'images/upload-multiple?path=' + users.id + '/' + path

	return requestUploadFile({
			url: url,
			method: 'POST',
			body: formData,
			redirect: 'follow'
	});
}

// delete
export function deleteFolder(data) {
    var raw = JSON.stringify({
			data: data
    })

    return request({
        url: API_URL + 'paths/delete-multiple',
        method: 'PATCH',
        body: raw,
        redirect: 'follow'
    });
}

// Download
export function downloadFolder(path) {
    var raw = JSON.stringify({
        data: path
    })

    return request({
        url: API_URL + "paths/download",
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    })
}

// Force Download
export function forceDownload(path) {
    var raw = JSON.stringify({
        path: path
    })

    return request({
        url: API_URL + "paths/force-delete",
        method: 'PATCH',
        body: raw,
        redirect: 'follow'
    })
}

// update
export function updateFolder(oldPath, newPath) {
    let users = JSON.parse(localStorage.getItem('usertoken'))
    var raw = JSON.stringify({
<<<<<<< .mine
        oldPath: PATH_URL + users.id + '/' + oldPath,
        newPath: PATH_URL + users.id + '/' + newPath,
=======
        oldPath: API_URL + users.id + '/' + oldPath,
        newPath: API_URL + users.id + '/' + newPath,
>>>>>>> .theirs
    })
    
    return request({
        url: API_URL + 'v1/' + 'paths/update',
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
export function deleteUser(id) {
    return request({
        url: API_URL_USER + "/" + id,
        method: 'DELETE',
        redirect: 'follow'
    });
}

// Reset password tài khoản người dùng
export function resetPasswords(currentPassword, newPassword) {
    let users = JSON.parse(localStorage.getItem('usertoken'))
    var raw = JSON.stringify({
        'current_password': currentPassword,
        'new_password': newPassword
    });

    return request({
        url: API_URL + 'auth/' + users.id + "/reset-password",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    })
}


// Reset Password theo id người dùng 
export function resetPasswordbyId(newPassword, id) {
    var raw = JSON.stringify({
        "new_password": newPassword
    });

    return request({
        url: API_URL_USER + "/change-password/" + id,
        method: 'POST',
        body: raw,
        redirect: 'follow' 
    })
}


// Admin
// Tạo mới tài khoản admin
export function createAdmin(usersName, email, password) {
    var raw = JSON.stringify({
        "name": usersName,
        "email": email,
        "password": password
    });

    return request({
        url: API_URL_STAFF,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Hiển thị danh sách admin
export function getListAllAdmin() {
    return request({
        url: API_URL_STAFF,
        method: 'GET',
        redirect: 'follow'
    });
}


// Cập nhật thông tin admin
export function updateAdmin(username, email, id) {
    var raw = JSON.stringify({
        'name': username,
        'email': email
    });

    return request({
        url: API_URL_STAFF + "/" + id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}


// Xóa thông tin tài khoản admin
export function deleteAdmin(id) {
    return request({
        url: API_URL_STAFF + "/" + id,
        method: 'DELETE',
        redirect: 'follow'
    });
}