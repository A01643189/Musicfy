


export const fetchSpotifyApi = async (url, method, body, contenType, token) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': contenType,
            Authorization: token? token : null,
        },
        body: body ?? null,
    }) .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    });
    return response;
}