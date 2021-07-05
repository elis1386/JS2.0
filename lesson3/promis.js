
'use strict';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('Get', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
};

