pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/bhanugoud98/bad-asses-tracker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh '''
                    curl -X POST https://api.render.com/deploy/srv-d0fnlebuibrs73etctug?key=-LnwbmDZxXM
                '''
            }
        }
    }
}

