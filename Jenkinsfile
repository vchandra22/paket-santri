pipeline {
    agent any

    environment {
        IMAGE_NAME = "vchandra22/paket-santri"
        IMAGE_TAG = "v1.0.0"
        REGISTRY_CREDENTIALS = "docker-hub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Install & Build') {
            steps {
                sh "docker run --rm -v \$PWD:/app -w /app ${IMAGE_NAME}:${IMAGE_TAG} composer install --no-interaction --prefer-dist --optimize-autoloader"
                sh "docker run --rm -v \$PWD:/app -w /app ${IMAGE_NAME}:${IMAGE_TAG} npm install --legacy-peer-deps"
                sh "docker run --rm -v \$PWD:/app -w /app ${IMAGE_NAME}:${IMAGE_TAG} npm run build"
            }
        }

        stage('Run Tests') {
            steps {
                sh "docker run --rm -v \$PWD:/app -w /app ${IMAGE_NAME}:${IMAGE_TAG} php artisan test"
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.REGISTRY_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        always {
            sh "docker system prune -af --volumes"
        }
    }
}
