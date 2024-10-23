pipeline {
    agent none
    
    stages {
        stage('Install Dependencies') {
            agent { label 'Jenkins_Agent_1' }
            steps {
                // Checkout the Node.js application code from GitHub
                checkout scm

                // Install dependencies using npm on Windows
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            agent { label 'Jenkins_Agent_2' }
            steps {
                // Run tests on Windows
                bat 'npm test'
            }
        }
        
        stage('Build Application') {
            agent { label 'Jenkins_Agent_3' }
            steps {
                // Build the application on Windows
                bat 'npm run build'
            }
        }
        
        stage('Deploy Application') {
            agent { label 'Jenkins_Agent_4' }
            environment {
                // Use the secret securely (stored in Jenkins credentials)
                SECRET_KEY = credentials('my-secret-key')
            }
            steps {
                // Deploy the application
                bat 'echo Deploying the application...'
                
                // Accessing the secret key
                bat 'echo Using secret: %SECRET_KEY%'
            }
        }
    }
    
    post {
        always {
            agent { label 'Jenkins_Agent_1' }  // Ensure there is an agent for the post condition
            steps {
                // Clean up after the pipeline run
                cleanWs()
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
