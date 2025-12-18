require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');
const Course = require('./server/models/Course');
const Quiz = require('./server/models/Quiz');
const Lab = require('./server/models/Lab');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kloudsavvy_lms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Quiz.deleteMany({});
    await Lab.deleteMany({});
    console.log('Cleared existing data');

    // Create sample instructor
    const instructor = await User.create({
      name: 'John Doe',
      email: 'instructor@kloudsavvy.com',
      password: 'instructor123',
      role: 'instructor'
    });
    console.log('Created instructor');

    // Create sample student
    const student = await User.create({
      name: 'Jane Smith',
      email: 'student@kloudsavvy.com',
      password: 'student123',
      role: 'student'
    });
    console.log('Created sample student');

    // Create sample courses
    const azureCourse = await Course.create({
      title: 'Azure Cloud Fundamentals',
      description: 'Learn the fundamentals of Microsoft Azure Cloud platform. This comprehensive course covers Azure services, resource management, virtual machines, storage, networking, and security.',
      category: 'Azure Cloud',
      instructor: instructor._id,
      duration: '40 hours',
      level: 'Beginner',
      isPublished: true,
      sessions: [
        {
          title: 'Introduction to Azure Cloud',
          videoUrl: 'https://example.com/video1',
          duration: '45 minutes',
          order: 1,
          description: 'Overview of Azure Cloud platform and services'
        },
        {
          title: 'Azure Virtual Machines',
          videoUrl: 'https://example.com/video2',
          duration: '60 minutes',
          order: 2,
          description: 'Creating and managing Azure VMs'
        },
        {
          title: 'Azure Storage Solutions',
          videoUrl: 'https://example.com/video3',
          duration: '50 minutes',
          order: 3,
          description: 'Understanding Azure storage options'
        }
      ]
    });

    const devopsCourse = await Course.create({
      title: 'Azure DevOps Complete Guide',
      description: 'Master Azure DevOps for continuous integration and deployment. Learn Git, Azure Repos, Pipelines, Boards, and Artifacts.',
      category: 'Azure DevOps',
      instructor: instructor._id,
      duration: '35 hours',
      level: 'Intermediate',
      isPublished: true,
      sessions: [
        {
          title: 'Introduction to Azure DevOps',
          videoUrl: 'https://example.com/devops1',
          duration: '40 minutes',
          order: 1,
          description: 'Overview of Azure DevOps services'
        },
        {
          title: 'CI/CD Pipelines',
          videoUrl: 'https://example.com/devops2',
          duration: '75 minutes',
          order: 2,
          description: 'Building automated pipelines'
        }
      ]
    });

    const dockerCourse = await Course.create({
      title: 'Docker for Beginners',
      description: 'Learn containerization with Docker. Build, ship, and run applications in containers.',
      category: 'Docker',
      instructor: instructor._id,
      duration: '25 hours',
      level: 'Beginner',
      isPublished: true,
      sessions: [
        {
          title: 'Docker Basics',
          videoUrl: 'https://example.com/docker1',
          duration: '55 minutes',
          order: 1,
          description: 'Introduction to Docker and containers'
        },
        {
          title: 'Docker Images and Containers',
          videoUrl: 'https://example.com/docker2',
          duration: '65 minutes',
          order: 2,
          description: 'Working with Docker images and containers'
        }
      ]
    });

    const kubernetesCourse = await Course.create({
      title: 'Kubernetes Orchestration',
      description: 'Master container orchestration with Kubernetes. Deploy, scale, and manage containerized applications.',
      category: 'Kubernetes',
      instructor: instructor._id,
      duration: '45 hours',
      level: 'Advanced',
      isPublished: true,
      sessions: [
        {
          title: 'Kubernetes Architecture',
          videoUrl: 'https://example.com/k8s1',
          duration: '50 minutes',
          order: 1,
          description: 'Understanding Kubernetes components'
        },
        {
          title: 'Pods and Deployments',
          videoUrl: 'https://example.com/k8s2',
          duration: '70 minutes',
          order: 2,
          description: 'Creating and managing pods'
        }
      ]
    });

    const terraformCourse = await Course.create({
      title: 'Infrastructure as Code with Terraform',
      description: 'Learn to automate infrastructure deployment using Terraform. Manage cloud resources efficiently.',
      category: 'Terraform',
      instructor: instructor._id,
      duration: '30 hours',
      level: 'Intermediate',
      isPublished: true,
      sessions: [
        {
          title: 'Terraform Basics',
          videoUrl: 'https://example.com/terraform1',
          duration: '45 minutes',
          order: 1,
          description: 'Introduction to Infrastructure as Code'
        }
      ]
    });

    const ansibleCourse = await Course.create({
      title: 'Ansible Automation',
      description: 'Automate IT infrastructure with Ansible. Configuration management and application deployment.',
      category: 'Ansible',
      instructor: instructor._id,
      duration: '28 hours',
      level: 'Intermediate',
      isPublished: true,
      sessions: [
        {
          title: 'Ansible Fundamentals',
          videoUrl: 'https://example.com/ansible1',
          duration: '50 minutes',
          order: 1,
          description: 'Getting started with Ansible'
        }
      ]
    });

    console.log('Created sample courses');

    // Create sample quizzes
    const azureQuiz = await Quiz.create({
      course: azureCourse._id,
      title: 'Azure Cloud Fundamentals Quiz',
      description: 'Test your knowledge of Azure Cloud basics',
      questions: [
        {
          question: 'What does IaaS stand for?',
          options: [
            'Internet as a Service',
            'Infrastructure as a Service',
            'Integration as a Service',
            'Information as a Service'
          ],
          correctAnswer: 1,
          explanation: 'IaaS stands for Infrastructure as a Service, providing virtualized computing resources over the internet.'
        },
        {
          question: 'Which Azure service is used for storing files?',
          options: [
            'Azure VM',
            'Azure Storage',
            'Azure DNS',
            'Azure Monitor'
          ],
          correctAnswer: 1,
          explanation: 'Azure Storage is the service for storing files, blobs, tables, and queues.'
        },
        {
          question: 'What is the Azure Resource Manager?',
          options: [
            'A billing tool',
            'A deployment and management service',
            'A monitoring service',
            'A backup service'
          ],
          correctAnswer: 1,
          explanation: 'ARM is the deployment and management service for Azure resources.'
        }
      ],
      passingScore: 70,
      timeLimit: 15
    });

    const dockerQuiz = await Quiz.create({
      course: dockerCourse._id,
      title: 'Docker Basics Quiz',
      description: 'Test your understanding of Docker fundamentals',
      questions: [
        {
          question: 'What is a Docker container?',
          options: [
            'A virtual machine',
            'A lightweight, standalone executable package',
            'A cloud storage service',
            'A monitoring tool'
          ],
          correctAnswer: 1,
          explanation: 'A Docker container is a lightweight, standalone, executable package of software.'
        },
        {
          question: 'Which command is used to run a Docker container?',
          options: [
            'docker start',
            'docker execute',
            'docker run',
            'docker launch'
          ],
          correctAnswer: 2,
          explanation: 'The "docker run" command is used to create and start a container.'
        }
      ],
      passingScore: 70,
      timeLimit: 10
    });

    console.log('Created sample quizzes');

    // Create sample labs
    const azureLab = await Lab.create({
      course: azureCourse._id,
      title: 'Create an Azure Virtual Machine',
      description: 'Hands-on lab to create and configure an Azure VM',
      instructions: 'In this lab, you will:\n1. Create a resource group\n2. Deploy a virtual machine\n3. Connect to the VM\n4. Configure basic security',
      estimatedTime: '60 minutes',
      difficulty: 'Easy',
      tasks: [
        { description: 'Create a new resource group in Azure Portal', order: 1 },
        { description: 'Deploy a Windows Server 2022 VM', order: 2 },
        { description: 'Configure network security group rules', order: 3 },
        { description: 'Connect to the VM using RDP', order: 4 }
      ],
      resources: [
        { title: 'Azure Portal', url: 'https://portal.azure.com', type: 'link' },
        { title: 'VM Documentation', url: 'https://docs.microsoft.com/azure/virtual-machines', type: 'documentation' }
      ]
    });

    const dockerLab = await Lab.create({
      course: dockerCourse._id,
      title: 'Build and Run Your First Docker Container',
      description: 'Create a simple web application Docker container',
      instructions: 'In this lab, you will:\n1. Write a Dockerfile\n2. Build a Docker image\n3. Run the container\n4. Test the application',
      estimatedTime: '45 minutes',
      difficulty: 'Easy',
      tasks: [
        { description: 'Create a simple Node.js application', order: 1 },
        { description: 'Write a Dockerfile', order: 2 },
        { description: 'Build the Docker image', order: 3 },
        { description: 'Run the container and access the application', order: 4 }
      ]
    });

    const k8sLab = await Lab.create({
      course: kubernetesCourse._id,
      title: 'Deploy Application to Kubernetes',
      description: 'Deploy a containerized application to a Kubernetes cluster',
      instructions: 'In this lab, you will:\n1. Set up a local Kubernetes cluster\n2. Create deployment manifests\n3. Deploy the application\n4. Expose the application with a service',
      estimatedTime: '90 minutes',
      difficulty: 'Hard',
      tasks: [
        { description: 'Install and start Minikube', order: 1 },
        { description: 'Create a deployment YAML file', order: 2 },
        { description: 'Apply the deployment to the cluster', order: 3 },
        { description: 'Create and apply a service manifest', order: 4 },
        { description: 'Access the deployed application', order: 5 }
      ]
    });

    console.log('Created sample labs');

    console.log('\n=== Seed Data Summary ===');
    console.log('Sample Login Credentials:');
    console.log('Student - Email: student@kloudsavvy.com, Password: student123');
    console.log('Instructor - Email: instructor@kloudsavvy.com, Password: instructor123');
    console.log('\nCourses Created:', await Course.countDocuments());
    console.log('Quizzes Created:', await Quiz.countDocuments());
    console.log('Labs Created:', await Lab.countDocuments());
    console.log('\nSeed completed successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
