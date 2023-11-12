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
                sh 'rm -rf admin-dashboard-CI-CD-integration'
                sh 'git clone -b main https://github.com/anisossss/admin-dashboard-CI-CD-integration.git'
            }
        }
        stage('Init'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build'){
            steps {
                sh 'docker build -t anisossss/admin-dashboard-CI-CD-integration:$BUILD_ID admin-dashboard-CI-CD-integration/. '
            }
        }
        stage('Deliver'){
            steps {
                sh 'docker push anisossss/admin-dashboard-CI-CD-integration:$BUILD_ID'
            }
        }
        stage('Cleanup'){
            steps {
                sh 'docker rmi anisossss/admin-dashboard-CI-CD-integration:$BUILD_ID'
                sh 'docker logout'
            }
        }
    }
}
