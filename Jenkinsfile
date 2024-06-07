pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node-hello-world'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                    
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside('-u root') {
                        
                        sh 'npm install --unsafe-perm'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Stop and remove Docker container') {
            steps {
                script {
                    def PORT = 3000
                    def CONTAINER_ID = sh(
                        script: "docker ps -q --filter 'expose=${PORT}/tcp'",
                        returnStdout: true
                    ).trim()
                    
                    if (CONTAINER_ID) {
                        echo "Stopping container using port $PORT..."
                        sh "docker stop $CONTAINER_ID"
                        echo "Removing container using port $PORT..."
                        sh "docker rm $CONTAINER_ID"
                    } else {
                        echo "No container found using port $PORT."
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).run('-d -p 3000:3000')
                }
            }
        }
    }
}