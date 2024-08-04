const SERVER = 'https://first-project-render-back.onrender.com';

async function buildMenu() {
    try {
        const response = await axios.get(SERVER + '/menu', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        menuSection = '';
        menuSection = '<ul style="display:flex; list-style-type: none; gap:10px">'
        menuLinks = response.data;
        console.log(menuLinks);
        for (var linkName in menuLinks) {
            menuSection += `<li><a href = "${menuLinks[linkName]}">${linkName}</a></li>`;
        }
        menuSection += `<li><a href="#" onclick="logout()" >Logout</a></li>`
        menuSection += "</ul>"
        document.getElementById('menudiv').innerHTML = menuSection
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

function logout() {
    axios.post(SERVER + '/logout')
    window.location.href = 'index.html'
}

async function getCurrentUser() {
    const token = localStorage.getItem('token');
    console.log("Current token:", token);
    if (!token) {
        return null;
    }
    try {
        const response = await axios.get(SERVER + '/current_user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.username;
    } catch (error) {
        console.error('Error fetching current user:', error);
        //                localStorage.removeItem('token');
        return null;
    }
}

