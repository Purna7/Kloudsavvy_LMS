document.addEventListener('DOMContentLoaded', async () => {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
        return;
    }

    await loadDashboardData();
});

async function loadDashboardData() {
    try {
        const user = getUser();
        document.getElementById('userName').textContent = user.name;

        const enrolledCourses = await apiRequest('/courses/user/enrolled');
        
        // Calculate statistics
        let totalSessions = 0;
        let totalQuizzes = 0;
        let totalLabs = 0;

        // Get user progress
        const currentUser = await apiRequest('/auth/me');
        
        if (currentUser.user.progress) {
            currentUser.user.progress.forEach(p => {
                totalSessions += p.completedSessions?.length || 0;
                totalQuizzes += p.quizScores?.length || 0;
                totalLabs += p.labsCompleted?.length || 0;
            });
        }

        document.getElementById('enrolledCount').textContent = enrolledCourses.length;
        document.getElementById('completedSessions').textContent = totalSessions;
        document.getElementById('quizzesTaken').textContent = totalQuizzes;
        document.getElementById('labsCompleted').textContent = totalLabs;

        displayEnrolledCourses(enrolledCourses);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function displayEnrolledCourses(courses) {
    const container = document.getElementById('enrolledCourses');
    
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
