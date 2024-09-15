/* groovylint-disable GStringExpressionWithinString */
pipeline {
    agent { label 'master' }

    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }

    stages {
        stage('Pre-Preparation') {
            steps {
                cleanWs()
            }
        }

        stage('Preparation') {
            steps {
                // Get some code from a GitHub repository
                git 'https://github.com/MBebars/jenkins_nodejs_example.git'
            }
        }

        stage('Build') {
            steps {
                /* groovylint-disable-next-line GStringExpressionWithinString, LineLength */
                withCredentials([usernamePassword(credentialsId: 'MBebarsDocker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'docker build . -f Dockerfile -t ${USER}/nodejs_sample:v2.${BUILD_NUMBER}'
                    sh 'docker login -u ${USER} -p ${PASS}'
                    sh 'docker push ${USER}/nodejs_sample:v2.${BUILD_NUMBER}'
                }
            }
        }

        stage('CD') {
            steps {
                /* groovylint-disable-next-line DuplicateMapLiteral, LineLength */
                withCredentials([usernamePassword(credentialsId: 'MBebarsDocker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'docker rm -f jenkins_example'
                    sh 'docker run -d -p 3000:3000 --name jenkins_example ${USER}/nodejs_sample:v2.${BUILD_NUMBER}'
                }
            }
        }
    }
    post{
        success {
            slackSend(
                channel: "jenkins",
                color: "good",
                /* groovylint-disable-next-line LineLength */
                message: "${env.JOB_NAME} is successfully with build no. ${env.BUILD_NUMBER} URL: (<${env.BUILD_URL}|Open>) ${BUILD_STATUS}"
            )
        }
    }
}
