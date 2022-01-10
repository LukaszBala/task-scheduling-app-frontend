function updateOptions(options: any) {
    const update = {...options};
    if(!update.headers) update.headers = {}
    update.headers["Access-Control-Allow-Origin"] = '*'
    if (!update.headers['Content-Type']) update.headers['Content-Type'] = 'application/json';
    if (update.headers.Authorization) return update;
    if (localStorage.getItem('token')) {
        update.headers = {
            ...update.headers,
            'Authorization': localStorage.getItem('token')
        };
    }
    return update;
}

export function customFetch(url: string, options: RequestInit) {
    return new Promise((resolve, reject) => {
        fetch(url, updateOptions(options))
            .then((response) => {
                if (!response.ok) reject(response)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
    });
}
