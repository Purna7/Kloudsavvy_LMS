document.addEventListener('DOMContentLoaded', async () => {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
        return;
    }

    await loadEnrolledCourses();
});

async function loadEnrolledCourses() {
    try {
        const courses = await apiRequest('/courses/user/enrolled');
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('coursesContainer').innerHTML = '<p>Error loading courses. Please try again later.</p>';
    }
}

function displayCourses(courses) {
    const container = document.getElementById('coursesContainer');
    
    if (courses.length === 0) {
        container.innerHTML = '<p>You are not enrolled in any courses yet. <a href="/">Browse courses</a> to get started!</p>';
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-thumbnail">
                ${getCategoryIcon(course.category)}
            </div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-level">Level: ${course.level}</span>
                    <span class="course-duration">⏱️ ${course.duration}</span>
                </div>
                <a href="/pages/course-detail.html?id=${course._id}" class="btn btn-primary" style="margin-top: 1rem; width: 100%; text-align: center;">
                    View Course
                </a>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'Azure Cloud': '☁️',
        'Azure DevOps': '🔧',
        'Terraform': '🏗️',
        'Docker': '🐳',
        'Kubernetes': '⚓',
        'Ansible': '🤖',
        'Other': '📚'
    };
    return icons[category] || '📚';
}
