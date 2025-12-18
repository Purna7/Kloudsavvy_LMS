let currentCourse = null;
let currentTab = 'sessions';

document.addEventListener('DOMContentLoaded', async () => {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        window.location.href = '/pages/courses.html';
        return;
    }

    await loadCourseDetail(courseId);
});

async function loadCourseDetail(courseId) {
    try {
        currentCourse = await apiRequest(`/courses/${courseId}`);
        displayCourseDetail();
    } catch (error) {
        console.error('Error loading course:', error);
        document.getElementById('courseContent').innerHTML = '<p>Error loading course. Please try again later.</p>';
    }
}

function displayCourseDetail() {
    const content = document.getElementById('courseContent');
    
    content.innerHTML = `
        <div class="course-header">
            <h1>${currentCourse.title}</h1>
            <p>${currentCourse.description}</p>
            <div style="display: flex; gap: 2rem; margin-top: 1rem;">
                <span><strong>Category:</strong> ${currentCourse.category}</span>
                <span><strong>Level:</strong> ${currentCourse.level}</span>
                <span><strong>Duration:</strong> ${currentCourse.duration}</span>
                <span><strong>Instructor:</strong> ${currentCourse.instructor?.name || 'N/A'}</span>
            </div>
        </div>

        <div class="course-tabs">
            <button class="tab-btn active" onclick="switchTab('sessions')">📹 Sessions</button>
            <button class="tab-btn" onclick="switchTab('quizzes')">📝 Quizzes</button>
            <button class="tab-btn" onclick="switchTab('labs')">💻 Labs</button>
        </div>

        <div id="sessionsTab" class="tab-content active">
            ${displaySessions()}
        </div>

        <div id="quizzesTab" class="tab-content">
            ${displayQuizzes()}
        </div>

        <div id="labsTab" class="tab-content">
            ${displayLabs()}
        </div>
    `;
}

function displaySessions() {
    if (!currentCourse.sessions || currentCourse.sessions.length === 0) {
        return '<p>No sessions available yet.</p>';
    }

    const sortedSessions = [...currentCourse.sessions].sort((a, b) => (a.order || 0) - (b.order || 0));

    return `
        <div class="session-list">
            ${sortedSessions.map((session, index) => `
                <div class="session-item" onclick="playSession('${session._id}', '${session.videoUrl}')">
                    <div class="session-title">${index + 1}. ${session.title}</div>
                    <p>${session.description || ''}</p>
                    <span style="color: #666; font-size: 0.9rem;">⏱️ ${session.duration || 'N/A'}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function displayQuizzes() {
    return `
        <div id="quizzesList">
            <p>Loading quizzes...</p>
        </div>
    `;
}

function displayLabs() {
    return `
        <div id="labsList">
            <p>Loading labs...</p>
        </div>
    `;
}

function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');

    // Load content if needed
    if (tabName === 'quizzes') {
        loadQuizzes();
    } else if (tabName === 'labs') {
        loadLabs();
    }
}

async function loadQuizzes() {
    try {
        const quizzes = await apiRequest(`/quizzes/course/${currentCourse._id}`);
        const container = document.getElementById('quizzesList');
        
        if (quizzes.length === 0) {
            container.innerHTML = '<p>No quizzes available yet.</p>';
            return;
        }

        container.innerHTML = quizzes.map(quiz => `
            <div class="quiz-card">
                <h3>${quiz.title}</h3>
                <p>${quiz.description || ''}</p>
                <div style="margin-top: 1rem;">
                    <span>Questions: ${quiz.questions.length}</span> | 
                    <span>Time Limit: ${quiz.timeLimit} minutes</span> | 
                    <span>Passing Score: ${quiz.passingScore}%</span>
                </div>
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="startQuiz('${quiz._id}')">
                    Take Quiz
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading quizzes:', error);
        document.getElementById('quizzesList').innerHTML = '<p>Error loading quizzes.</p>';
    }
}

async function loadLabs() {
    try {
        const labs = await apiRequest(`/labs/course/${currentCourse._id}`);
        const container = document.getElementById('labsList');
        
        if (labs.length === 0) {
            container.innerHTML = '<p>No labs available yet.</p>';
            return;
        }

        container.innerHTML = labs.map(lab => `
            <div class="lab-card">
                <h3>${lab.title}</h3>
                <p>${lab.description}</p>
                <div style="margin-top: 1rem;">
                    <span><strong>Difficulty:</strong> ${lab.difficulty}</span> | 
                    <span><strong>Estimated Time:</strong> ${lab.estimatedTime}</span>
                </div>
                <div style="margin-top: 1rem;">
                    <strong>Instructions:</strong>
                    <p style="white-space: pre-line;">${lab.instructions}</p>
                </div>
                ${lab.tasks && lab.tasks.length > 0 ? `
                    <div style="margin-top: 1rem;">
                        <strong>Tasks:</strong>
                        <ol>
                            ${lab.tasks.sort((a, b) => a.order - b.order).map(task => `
                                <li>${task.description}</li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="completeLab('${lab._id}')">
                    Mark as Completed
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading labs:', error);
        document.getElementById('labsList').innerHTML = '<p>Error loading labs.</p>';
    }
}

function playSession(sessionId, videoUrl) {
    if (videoUrl) {
        alert(`Playing session: ${videoUrl}\n\nIn a production environment, this would open a video player.`);
    } else {
        alert('Video URL not available for this session.');
    }
    
    // Mark session as completed
    markSessionComplete(sessionId);
}

async function markSessionComplete(sessionId) {
    try {
        await apiRequest(`/courses/${currentCourse._id}/sessions/${sessionId}/complete`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error marking session as complete:', error);
    }
}

function startQuiz(quizId) {
    alert('Quiz feature coming soon! This would open the quiz interface.');
}

async function completeLab(labId) {
    try {
        await apiRequest(`/labs/${labId}/complete`, {
            method: 'POST'
        });
        alert('Lab marked as completed!');
    } catch (error) {
        alert('Error marking lab as complete: ' + error.message);
    }
}
