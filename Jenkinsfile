pipeline {
    agent none
    
    stages {
        stage('Install Dependencies') {
            agent { label 'Jenkins_Agent_1' } // Run this stage on Agent_1
            steps {
                // Checkout the Node.js application code from GitHub
                checkout scm

                // Install dependencies using npm
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            agent { label 'Jenkins_Agent_2' } // Run this stage on Agent_2
            steps {
                // Run tests
                sh 'npm test'
            }
        }
        
        stage('Build Application') {
            agent { label 'Jenkin_Agent_3' } // Run this stage on Agent_3
            steps {
                // Build the application
                sh 'npm run build'
            }
        }
        
        stage('Deploy Application') {
            agent { label 'Jenkin_Agent_4' } // Run this stage on Agent_4
            environment {
                // Use the secret securely (stored in Jenkins credentials)
                SECRET_KEY = credentials('my-secret-key')
            }
            steps {
                // Deploy the application (you can change this to your actual deploy command)
                sh 'echo Deploying the application...'
                
                // Accessing the secret key
                sh 'echo Using secret: $SECRET_KEY'
            }
        }
    }
    
    post {
        always {
            // Clean up after the pipeline run
            cleanWs()
        }
        success {
            // Notify about the successful run
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Notify about a failure in the pipeline
            echo 'Pipeline failed!'
        }
    }
}
