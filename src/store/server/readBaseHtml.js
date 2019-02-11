import fs from 'fs';


export const getFile = (FILE_PATH) => new Promise( (resolve, reject) => {

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    })
});









