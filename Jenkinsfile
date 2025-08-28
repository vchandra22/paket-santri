pipeline {
    agent any

    environment {
        IMAGE_NAME = "vchandra22/paket-santri"
        IMAGE_TAG = "v1.0.${BUILD_NUMBER}"
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

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                        docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Image berhasil di-push ke Docker Hub: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Build atau Push gagal!"
        }
    }
}
