document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        errorMessage.classList.add('show');
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters';
        errorMessage.classList.add('show');
        return;
    }

    try {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });

        saveAuthData(data.token, data.user);
        window.location.href = '/pages/dashboard.html';
    } catch (error) {
        errorMessage.textContent = error.message || 'Registration failed. Please try again.';
        errorMessage.classList.add('show');
    }
});
