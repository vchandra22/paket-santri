pipeline {
    agent any

    parameters {
        booleanParam(name: 'NO_CACHE', defaultValue: false, description: 'Build Docker image without cache')
        booleanParam(name: 'PROMOTE_TO_PROD', defaultValue: false, description: 'Promote build ini ke Production?')
    }

    environment {
        REGISTRY = "88.222.245.252:5000"
        IMAGE_NAME = "paket-santri"
        VERSION = readFile('VERSION').trim()
        STAGING_TAG = "staging-v${VERSION}"
        PRODUCTION_TAG = "production-v${VERSION}"
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
                    // build dengan versi tag
                    sh "docker build ${cacheFlag} -t ${REGISTRY}/${IMAGE_NAME}:${STAGING_TAG} ."
                    // tag juga dengan staging-latest
                    sh "docker tag ${REGISTRY}/${IMAGE_NAME}:${STAGING_TAG} ${REGISTRY}/${IMAGE_NAME}:staging-latest"
                }
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login ${REGISTRY} -u "$DOCKER_USER" --password-stdin
                        docker push ${REGISTRY}/${IMAGE_NAME}:${STAGING_TAG}
                        docker push ${REGISTRY}/${IMAGE_NAME}:staging-latest
                    """
                }
            }
        }

        stage('Promote to Production') {
            when {
                expression { return params.PROMOTE_TO_PROD }
            }
            steps {
                script {
                    // checkout ke branch main
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'git@github.com:vchandra22/paket-santri.git']]])
                    def cacheFlag = params.NO_CACHE ? "--no-cache" : ""
                    // build dengan versi tag
                    sh "docker build ${cacheFlag} -t ${REGISTRY}/${IMAGE_NAME}:${PRODUCTION_TAG} ."
                    // tag juga dengan production-latest
                    sh "docker tag ${REGISTRY}/${IMAGE_NAME}:${PRODUCTION_TAG} ${REGISTRY}/${IMAGE_NAME}:production-latest"
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                        sh """
                            echo "$DOCKER_PASS" | docker login ${REGISTRY} -u "$DOCKER_USER" --password-stdin
                            docker push ${REGISTRY}/${IMAGE_NAME}:${PRODUCTION_TAG}
                            docker push ${REGISTRY}/${IMAGE_NAME}:production-latest
                        """
                    }
                }
            }
        }
    }
}
