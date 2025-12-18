document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

    try {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        saveAuthData(data.token, data.user);
        window.location.href = '/pages/dashboard.html';
    } catch (error) {
        errorMessage.textContent = error.message || 'Login failed. Please try again.';
        errorMessage.classList.add('show');
    }
});
