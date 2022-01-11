function updateOptions(options: any, token?: string) {
    const update = {...options};
    if (!update.headers) update.headers = {}
    update.headers["Access-Control-Allow-Origin"] = '*'
    if (!update.headers['Content-Type']) update.headers['Content-Type'] = 'application/json';
    if (update.headers.Authorization) return update;
    let localToken: any = ''
    if (!token) {
        localToken = `Bearer ${localStorage.getItem('token')}`;
    }
    if (token || localToken) {
        update.headers = {
            ...update.headers,
            'Authorization': token ? token : localToken
        };
    }
    return update;
}

export function customFetch(url: string, options: RequestInit, token?: string) {
    return new Promise((resolve, reject) => {
        fetch(url, updateOptions(options, token))
            .then((response) => {
                if (!response.ok) reject(response)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
    });
}
