function validatePassword(password, repassword) {
    if (!/(?=.*\d)/.test(password))
        return 'The password should contain at least one digit';
    if (!/(?=.*[a-z])/.test(password)) 
        return 'The password hould contain at least one lower case';
    if (!/(?=.*[A-Z])/.test(password))
        return 'The password should contain at least one upper case';
    if (!/[a-zA-Z0-9]{4,}/.test(password)) 
        return 'The password length must be at least 4 characters';
    if (password !== repassword)
        return 'Passwords do not match';
    return '';
}

function validateData(userData) {
    let res = {};
    res.type = 'success';
    res.text = '';

    if ((res.text = validatePassword(userData.password, userData.repassword))) {
        res.type = 'error';
    }

    return res;
}

function getData() {
    const form = document.querySelector("#form");

    let inputs = form.elements;
    let data = {};
    data.name = inputs["name"].value;
    data.login = inputs["login"].value;
    data.password = inputs["password"].value;
    data.repassword = inputs["repassword"].value;
    data.email = inputs["email"].value;

    return data;
}

async function sendUserData(userData) {
    let res = await fetch("/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    let data = await res.json();

    return data;
}

function setStyleMsg (notify, type) {
    switch (type) {
        case 'error':
            notify.classList.remove('notify--success');
            notify.classList.add('notify--error');
            break;

        case 'success':
            notify.classList.remove('notify--error');
            notify.classList.add('notify--success');
            break;
    
        default:
            break;
    }
}

function showMsg(data) {
    let notify = document.querySelector('.notify');
    notify.textContent = data.text;
    setStyleMsg(notify, data.type);
}

async function register() {
    let data = getData();
    let result = validateData(data);

    if (result.type !== 'error')
        result = await sendUserData(data);
    
    showMsg(result);
}

window.addEventListener("load", () => {
    const form = document.querySelector("#form");

    form.addEventListener("submit", event => {
        event.preventDefault();
        register();
    });
});