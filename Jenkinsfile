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
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CREDENTIALS) {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push("latest")
                    }
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
