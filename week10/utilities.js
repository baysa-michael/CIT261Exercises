export function getJSON(url) {
    let headerJSON = {headers: {Accept:  "application/json"}};

    return fetch(url, headerJSON)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                let returnValue = response.json();

                return returnValue;
            }
        })
        .catch((error) => {
            throw error;
        });
}

export const getLocation = function(options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0} ) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};