pipeline {
    agent any

    parameters {
        booleanParam(name: 'NO_CACHE', defaultValue: false, description: 'Build Docker image without cache')
    }

    environment {
        REGISTRY = "88.222.245.252:5000"
        IMAGE_NAME = "paket-santri"
        STAGING_TAG = "staging-v${BUILD_NUMBER}"
        PRODUCTION_TAG = "production-v${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = "docker-private-registry"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Staging Image') {
            steps {
                script {
                    def cacheFlag = params.NO_CACHE ? "--no-cache" : ""
                    sh "docker build ${cacheFlag} -t ${REGISTRY}/${IMAGE_NAME}:${STAGING_TAG} ."
                }
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login ${REGISTRY} -u "$DOCKER_USER" --password-stdin
                        docker push ${REGISTRY}/${IMAGE_NAME}:${STAGING_TAG}
                    """
                }
            }
        }

        stage('Promote to Production') {
            steps {
                script {
                    input message: "Promote build ${BUILD_NUMBER} ke Production?"
                    // checkout to branch main
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'git@github.com:vchandra22/paket-santri.git']]])
                    def cacheFlag = params.NO_CACHE ? "--no-cache" : ""
                    sh "docker build ${cacheFlag} -t ${REGISTRY}/${IMAGE_NAME}:${PRODUCTION_TAG} ."
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                        sh """
                            echo "$DOCKER_PASS" | docker login ${REGISTRY} -u "$DOCKER_USER" --password-stdin
                            docker push ${REGISTRY}/${IMAGE_NAME}:${PRODUCTION_TAG}
                        """
                    }
                }
            }
        }
    }
}
