pipeline {
    agent any  

    environment {
        GIT_CURL_VERBOSE = '1'
        GIT_TRACE_PACKET = '1'
        GIT_TRACE = '1'
        GIT_TRACE_PERFORMANCE = '1'
    }

    stages {
        stage('Checkout') {
            agent { label 'Agent_1' }
            steps {
                retry(3) {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/Muddssir44/My-node-task-manager.git', 
                            credentialsId: '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'
                        ]],
                        extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, depth: 0, timeout: 10]]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            agent { label 'Agent_1' }
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            agent { label 'Agent_2' }
            steps {
                bat 'npm test'
            }
        }

        stage('Deploy Application') {
            agent { label 'Agent_3' }
            environment {
                SECRET_FILE = credentials('My_Env_File')  
            }
            steps {
                bat 'echo Deploying the application...'
                bat 'type %SECRET_FILE%'  
             
            }
        }
    }

    post {
        always {
            node('Agent_1') { 
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
