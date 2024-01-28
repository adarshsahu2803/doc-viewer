export const fileReader = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.onerror = (e) => {
            reject(e);
        };

        reader.readAsDataURL(file);
    });
};
