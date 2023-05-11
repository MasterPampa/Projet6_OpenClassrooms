window.addEventListener('load', function() {

    const login = document.getElementById("login");

    login.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const demande = await fetch("http://" + window.location.hostname + ":5678/api/users/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    });
        if (demande.ok) {
            const data = await demande.json();
            sessionStorage.setItem('accessToken', data.token);
            window.location.href="http://" + window.location.hostname + ":5500/FrontEnd/index.html";
        } else {
            const passwordError = document.getElementById('passwordError');
            passwordError.innerText = "Erreur dans l’identifiant ou le mot de passe";
            passwordError.style.color = 'red';
        }
    });
});

