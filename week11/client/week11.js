import makeRequest from "./authHelper.js";
import Auth from "./auth.js";

window.addEventListener("load", () => {
    document.getElementById("submit").addEventListener("click", () => {
        let myAuth = new Auth();
        myAuth.login();
    });
});

/*
makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
});
*/
