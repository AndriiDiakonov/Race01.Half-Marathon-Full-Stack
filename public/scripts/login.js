import { showMsg, sendUserData } from "./sender.js";

function getData() {
    const form = document.querySelector("#form1");

    let inputs = form.elements;
    let data = {};
    data.login = inputs["login"].value;
    data.password = inputs["password"].value;

    return data;
}

async function login() {
    let data = getData();
    let res = await sendUserData(data, "/login");

    showMsg(res);

    if (res.hasOwnProperty('redirect')) {
        window.location.href = res.redirect;
    }
}

window.addEventListener("load", () => {
    const form = document.querySelector("#form1");

    form.addEventListener("submit", event => {
        event.preventDefault();
        login();
    });
});