const base_url = 'http://localhost:3000/';

const timer = (time, value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, time)
    });
};

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    }).then(response => { console.log(response); if (response.ok) return response.json()})
}

function deleteData(url = '') {
    return fetch(url, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        referrer: 'no-referrer', // no-referrer, *client
    }).then(response => { console.log(response); if (response.ok) return response.json()})
}

export const getAllTask = () =>{
    return fetch(base_url +  'api/alltasks' ).then(response => {
        if (response.ok) return response.json()
    }).then(task => {
        return timer(500, task)
    })
};

export const getTask = id =>{
    return fetch(base_url + 'api/tasks/' + id).then(response => {
        if (response.ok) return response.json()
    }).then(task => {
        return timer(1000, task)
    })
};

export const saveTask = (task) => {
    return postData(base_url + 'api/newtask', task).then(task => {
        return timer(1000, task)
    })
};

export const deleteTask = id =>{
    return deleteData(base_url + 'api/tasks/' + id);
};
