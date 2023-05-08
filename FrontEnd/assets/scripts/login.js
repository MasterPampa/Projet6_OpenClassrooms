window.addEventListener('load', function() {

    login.addEventListener('submit', function(e) {

        let login = document.getElementById("login");
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let idTest = "sophie.bluel@test.tld";
        let passwordTest = "S0phie";
        let usernameError = document.getElementById("usernameError");
        let passwordError = document.getElementById("passwordError");
        let usernameOk = 0;
        let passwordOk = 0;

        ////////////////USERNAME/////////////////////
        
        if (username.value.trim() == ""){
            usernameError.innerHTML = "Merci de renseigner votre adresse email.";
            usernameError.style.color = 'red';
            e.preventDefault();
        } else if (username.value != idTest) {
            console.log(username.value);
            usernameError.innerHTML = "Merci de renseigner une adresse email valide.";
            usernameError.style.color = 'red';
            e.preventDefault();
        } else if (username.value === idTest) {
            usernameError.innerHTML = "";
            usernameOk == 1;
        }

        ///////////////PASSWORD///////////////////////

        if (password.value == ""){
            passwordError.innerHTML = "Merci de renseigner votre mot de passe.";
            passwordError.style.color = 'red';
            e.preventDefault();
        } else if (password.value != passwordTest) {
            console.log(password.value);
            passwordError.innerHTML = "Merci de renseigner un mot de passe valide.";
            passwordError.style.color = 'red';
            e.preventDefault();
        } else if (password.value === passwordTest) {
            passwordError.innerHTML = "";
            passwordOk = 1;

        }
        
        //////////////SI TOUT EST OK ENVOI DE LA REQUETE///////////////

        if (passwordOk === usernameOk){
            SubmitEvent;
        }
    });

});