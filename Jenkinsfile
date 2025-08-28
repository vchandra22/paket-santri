pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'DOCKER_NO_CACHE',
            defaultValue: false,
            description: 'Build Docker image without cache (docker build --no-cache)'
        )
    }

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
                    def noCacheFlag = params.DOCKER_NO_CACHE ? '--no-cache' : ''
                    sh "docker build ${noCacheFlag} -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
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
