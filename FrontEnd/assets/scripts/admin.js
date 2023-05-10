window.addEventListener('load', function() {
    
    const modifier = document.querySelectorAll('.modifier');
    let logout = document.getElementById('logout');
    let login = document.getElementById('login');
    const logged = sessionStorage.getItem('accessToken');

    if (logged) {
        console.log('Logged!')
            
        login.classList.add('hidden');
        logout.addEventListener('click', function(){
            sessionStorage.removeItem('accessToken');
            
            location.reload();
        })

        const filters = document.getElementById('filters');
        const projets = document.getElementById('projets');
        console.log(projets)
        filters.classList.remove('filter');
        filters.classList.add('hidden');
        projets.classList.add('space')

        
    } else {
        console.log('notLogged!'),

        logout.classList.add('hidden');

        modifier.forEach(modifier => {
            modifier.style.display = 'none';
        });
    }
});