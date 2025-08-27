pipeline {
    agent any

    environment {
        IMAGE_NAME = "vchandra22/paket-santri"
        REGISTRY_URL = "https://index.docker.io/v1/"
        REGISTRY_CREDENTIALS = "docker-hub-credentials"
        IMAGE_TAG = "v1.0.0"
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
                    appImage = docker.build("${env.IMAGE_NAME}:${env.IMAGE_TAG}")
                }
            }
        }

        stage('Install & Build') {
            steps {
                script {
                    appImage.inside {
                        sh 'composer install --no-interaction --prefer-dist --optimize-autoloader'
                        sh 'npm install --legacy-peer-deps'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    appImage.inside {
                        sh 'php artisan test'
                    }
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry(env.REGISTRY_URL, env.REGISTRY_CREDENTIALS) {
                        appImage.push(env.IMAGE_TAG)
                        appImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh "docker system prune -af --volumes"
            }
        }
    }
}
