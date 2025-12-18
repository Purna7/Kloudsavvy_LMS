document.addEventListener('DOMContentLoaded', async () => {
    loadCourses();
});

async function loadCourses() {
    try {
        const courses = await apiRequest('/courses');
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('coursesGrid').innerHTML = '<p>Error loading courses. Please try again later.</p>';
    }
}

function displayCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (courses.length === 0) {
        coursesGrid.innerHTML = '<p>No courses available yet. Check back soon!</p>';
        return;
    }

    coursesGrid.innerHTML = courses.map(course => `
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
                <button onclick="enrollCourse('${course._id}')" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
                    ${isLoggedIn() ? 'Enroll Now' : 'Login to Enroll'}
                </button>
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

async function enrollCourse(courseId) {
    if (!isLoggedIn()) {
        alert('Please login to enroll in courses');
        window.location.href = '/pages/login.html';
        return;
    }

    try {
        await apiRequest(`/courses/${courseId}/enroll`, {
            method: 'POST'
        });
        alert('Successfully enrolled in course!');
        window.location.href = '/pages/dashboard.html';
    } catch (error) {
        alert(error.message || 'Failed to enroll in course');
    }
}
