import React from "react";
import { useState, useEffect } from "react";
import { deleteFile, saveFile, getListFiles } from "../service/files";

function Upload() {

    useEffect (() => {
        getData();
    }, [])

    function getData() {
        const users = JSON.parse(localStorage.getItem('usertoken'))
        if (users) {
            let promise;
            promise = getListFiles(users[0].id);
            promise
                .then(response => {
                    setFiles(response);
                }).catch(error => {
                    console.log(error);
                });
        } else {
            setFiles([])
        }
    }

    const [files, setFiles] = useState([]);

    function deleteFiles(id) {
        deleteFile(id)
            .then(response => {
                console.log('Error');
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                console.log('success');
                getData();
            })
    }

    function createFile(files) {
        const users = JSON.parse(localStorage.getItem('usertoken'));
        saveFile(files.file, users[0].id)
            .then(response => {
                getData();
            })
            .catch(error => {
                console.log(error);
            }).finally(getData());
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <h2 className="alert alert-success">File Upload Section</h2>

                        <form onSubmit={createFile}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1" className="float-left">Browse A File To Upload</label>
                                <input type="file" className="form-control" />
                            </div>

                            <button type="button" className="btn btn-primary float-left mt-2">Submit</button>
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
                <hr />
                <h2 className="alert alert-success">List of Uploaded Files</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col-8">File Title</th>
                            <th scope="col-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><a href="" target="_blank"></a>
                                <button className="btn btn-success">DownLoad</button>
                                {" "}
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Upload;