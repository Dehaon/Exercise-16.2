const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const crearteUser = (name) => {
    const userLine = document.createElement('li');
    const userName = document.createElement('a');
        userName.href = '#';
        userName.textContent = name;
        userLine.append(userName);
    return userLine;
};

const dataContainer = document.querySelector('#data-container');

function toggleLoader() {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.hasAttribute('hidden');
    if (isHidden) {
        loaderHTML.removeAttribute('hidden');
    } else {
        loaderHTML.setAttribute('hidden', '');
    }
}

function getUsersByIds(ids) {
    toggleLoader();
    const requsts = ids.map((id) => fetch(`${USERS_URL}/${id}`));
    Promise.all(requsts)
        .then((responses) => {
            const result = responses.map((response) => response.json());
            return Promise.all(result);
        })
        .then((users) => {
            users.forEach((user) => {
                const userHTML = crearteUser(user.name);
                dataContainer.append(userHTML);
            })
        })
        .catch(console.log)
        .finally(toggleLoader());
}

getUsersByIds([5, 6, 2, 1]);