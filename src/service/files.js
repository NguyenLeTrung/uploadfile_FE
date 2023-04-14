import { API_URL } from "./config";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const token = JSON.stringify(localStorage.getItem('accesstoken'));

    if(token){
        headers.append("Authorization", 
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTIzMzUzMiIsImF2YXRhciI6bnVsbCwiZW1haWwiOiJ0cjEyNEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwic2VydmljZSI6InVzZXIiLCJpZCI6NiwiaWF0IjoxNjgxMzk1OTk1LCJleHAiOjE2ODEzOTk1OTV9.UoM8pkQ5kpwsSczLq50F7b7h6kiNWK5bFdr_s40hXec");
    }
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


// Lấy tất cả folder và file đã được tạo
export function getListpath() {
    var raw = JSON.stringify({
        "path": ""
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