pipeline {
    agent any

    environment {
        IMAGE_NAME = "vchandra22/paket-santri"        // ganti dengan Docker Hub repo kamu
        IMAGE_TAG = "${env.BRANCH_NAME == 'main' ? 'latest' : 'staging'}"
        REGISTRY_CREDENTIALS = "docker-hub-credentials" // ID credentials Jenkins
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
                    appImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Install Dependencies & Build Assets') {
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

        stage('Run Laravel Tests') {
            steps {
                script {
                    appImage.inside {
                        sh 'php artisan test'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CREDENTIALS) {
                        // Push berdasarkan branch (latest/staging)
                        appImage.push(IMAGE_TAG)
                        // Push juga dengan BUILD_NUMBER (untuk tracking/rollback)
                        appImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        // OPSIONAL: Deploy ke Kubernetes setelah push
        stage('Deploy to Kubernetes') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                        kubectl --kubeconfig=$KUBECONFIG set image deployment/laravel-app \
                            laravel-app=${IMAGE_NAME}:${IMAGE_TAG} -n laravel
                    """
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
