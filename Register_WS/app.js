document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const profileTab = document.getElementById('profileTab');
    const settingsTab = document.getElementById('settingsTab');
    const logoutButton = document.getElementById('logout');
    const homeTab = document.getElementById('homeTab'); // Added this to make home tab functional
    const sidebarProfilePicture = document.getElementById('sidebarProfilePicture');

    const loadHomeContent = () => {
        contentDiv.innerHTML = `
        <h2>Welcome to your Dashboard!</h2>
        <div class="calendar-container">
            <iframe
                src="https://calendar.google.com/calendar/embed?src=en.philippine%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManila"
                style="border: 0"
                width="100%"
                height="600"
                frameborder="0"
                scrolling="no">
            </iframe>
        </div>
        `;
    };

    const loadProfileContent = () => {
        contentDiv.innerHTML = `
        <h2>Edit Profile Picture</h2>
        <div class="profile-picture-container">
            <img id="profilePicturePreview"
                src="${localStorage.getItem('profilePicture') || 'default-profile.png'}"
                alt="Profile Picture Preview" class="profile-picture">
        </div>
        <div class="upload-section">
            <label for="profilePictureInput" class="upload-label">Choose a New Picture:</label>
            <input type="file" id="profilePictureInput" accept="image/*" class="upload-input">
            <button id="updateProfilePicture" class="btn">Update Picture</button>
        </div>
        `;

        const profilePictureInput = document.getElementById('profilePictureInput');
        const profilePicturePreview = document.getElementById('profilePicturePreview');
        const updateButton = document.getElementById('updateProfilePicture');

        profilePictureInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profilePicturePreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        updateButton.addEventListener('click', () => {
            const file = profilePictureInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageData = reader.result;
                    profilePicturePreview.src = imageData;
                    localStorage.setItem('profilePicture', imageData);
                    sidebarProfilePicture.src = imageData;
                    alert('Profile picture updated successfully!');
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image.');
            }
        });
    };

    const loadSettingsContent = () => {
        contentDiv.innerHTML = `
        <h2>Edit Account Details</h2>
        <form id="settingsForm" class="settings-form">
            <div class="form-group">
                <label for="settingsEmail">Email</label>
                <input type="email" id="settingsEmail"
                    value="${localStorage.getItem('userEmail') || ''}" required>
            </div>
            <div class="form-group">
                <label for="settingsPassword">Password</label>
                <input type="password" id="settingsPassword"
                    value="${localStorage.getItem('userPassword') || ''}" required>
            </div>
            <button type="submit" class="btn">Save Changes</button>
        </form>
        `;

        const settingsForm = document.getElementById('settingsForm');
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newEmail = document.getElementById('settingsEmail').value;
            const newPassword = document.getElementById('settingsPassword').value;
            if (newEmail && newPassword) {
                localStorage.setItem('userEmail', newEmail);
                localStorage.setItem('userPassword', newPassword);
                alert('Account details updated successfully!');
            } else {
                alert('Please fill out all fields.');
            }
        });
    };

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            if (email && password) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
                alert('Registration successful. You can now log in.');
                window.location.href = 'login.html';
            } else {
                alert('Please fill out all fields for registration.');
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                alert('Login successful.');
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('errorMessage').innerText = 'Invalid email or password. Please try again.';
            }
        });
    }

    homeTab = document.getElementById('homeTab');
    homeTab.addEventListener('click', loadHomeContent);
    profileTab.addEventListener('click', loadProfileContent);
    settingsTab.addEventListener('click', loadSettingsContent);

    loadHomeContent();

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully.');
        window.location.href = 'login.html';
    });

    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
        sidebarProfilePicture.src = savedProfilePicture;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && window.location.pathname.includes('dashboard.html')) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }
});
