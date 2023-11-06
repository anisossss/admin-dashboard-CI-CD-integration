pipeline {
    agent any
    triggers { pollSCM('*/5 * * * *') 
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')

    }
    stages {
        stage('Checkout'){
            agent any
            steps {
                sh 'rm -rf backend-dashboard-nodejs'
                sh 'git clone -b main https://github.com/anisossss/admin-dashboard-CI-CD-integration.git'
                sh 'cd backend-dashboard-nodejs'
            }
        }
        stage('Init'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build'){
            steps {
                sh 'docker build -t anisossss/backend-dashboard-nodejs:$BUILD_ID backend-dashboard-nodejs/. '
            }
        }
        stage('Deliver'){
            steps {
                sh 'docker push anisossss/backend-dashboard-nodejs:$BUILD_ID'
            }
        }
        stage('Cleanup'){
            steps {
                sh 'docker rmi anisossss/backend-dashboard-nodejs:$BUILD_ID'
                sh 'docker logout'
            }
        }
    }
}
