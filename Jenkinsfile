pipeline {
    agent any  // Ensure an agent is available for the entire pipeline

    environment {
        GIT_CURL_VERBOSE = '1'
        GIT_TRACE_PACKET = '1'
        GIT_TRACE = '1'
        GIT_TRACE_PERFORMANCE = '1'
    }

    stages {
        stage('Checkout') {
            agent { label 'Jenkins_Agent_1' }
            steps {
                retry(3) {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/Muddssir44/My-node-task-manager.git', 
                            credentialsId: '777ff811-2d26-4fd6-9ded-56d610c7b11f'
                        ]],
                        extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, depth: 0, timeout: 10]]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            agent { label 'Jenkins_Agent_1' }
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            agent { label 'Jenkins_Agent_2' }
            steps {
                bat 'npm test'
            }
        }

        stage('Deploy Application') {
            agent { label 'Jenkins_Agent_4' }
            environment {
                SECRET_KEY = credentials('Muddassir371')  // Ensure this credential exists in Jenkins
            }
            steps {
                bat 'echo Deploying the application...'
                bat 'echo Using secret key for deployment'  // Avoid printing sensitive data directly
            }
        }
    }

    post {
        always {
            node('Jenkins_Agent_1') {  // Ensure that the cleanWs() is inside a node with a specified label
                cleanWs()  // Clean the workspace after the pipeline finishes
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
