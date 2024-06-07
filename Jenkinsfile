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
                    sh 'sudo rm -rf node_modules package-lock.json'
                    
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside('-u root') {
                        sh 'npm install --unsafe-perm'
                        sh '''
                        echo "Node.js version:"
                        node -v
                        echo "npm version:"
                        npm -v
                        echo "Installed packages:"
                        ls -la node_modules
                        echo "es-errors package:"
                        ls -la node_modules/es-errors
                        '''
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).run('-d -p 3003:3000')
                }
            }
        }
    }
}