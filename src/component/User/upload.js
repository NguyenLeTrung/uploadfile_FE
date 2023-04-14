import * as React from 'react';
import { getListpath, createFolder } from '../../service/files';
import { useState, useEffect } from 'react';

export default function BasicList() {
    
    const [name, setName] = useState([])

    const getData = () => {
        let promise;
        promise = getListpath();
        promise
            .then(response => {
                console.log(response);
                setName(response.data)
            }).catch(error => {
                console(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container'>
            <table className="table bordered mt-4">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col-2'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {name.map((f, index) => (
                        <tr key={f.id}>
                            <td scope='row'>{index + 1}</td>
                            <td scope='row'><i class="fa-regular fa-folder"></i> {f.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

