pipeline {
    agent none
    
    stages {
        stage('Install Dependencies') {
            agent { label 'Jenkins_Agent_1' }
            steps {
                // Fetch the 'main' branch explicitly
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Muddssir44/My-node-task-manager/tree/main']]])

                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            agent { label 'Jenkins_Agent_2' }
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Application') {
            agent { label 'Jenkins_Agent_3' }
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy Application') {
            agent { label 'Jenkins_Agent_4' }
            environment {
                SECRET_KEY = credentials('my-secret-key')
            }
            steps {
                sh 'echo Deploying the application...'
                sh 'echo Using secret: $SECRET_KEY'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
