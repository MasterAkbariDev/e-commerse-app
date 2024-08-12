const getFromAPI = async (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            return null;
        });
}


export default getFromAPI