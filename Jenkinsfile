pipeline {
  agent none
  stages {
    stage('Cypress') {
      parallel {
        stage('Tester1') {
          agent {
            dockerfile {
                filename 'Dockerfile.JenkinsAgent'
                dir 'build'
            }
          }
          steps {
            echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            sh 'google-chrome —version'
            sh '$(npm bin)/cypress verify'
          }
        }
        stage('Tester2') {
          agent {
            dockerfile {
                filename 'Dockerfile.JenkinsAgent'
                dir 'build'
            }
          }
          steps {
            echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            sh 'google-chrome —version'
            sh '$(npm bin)/cypress verify'
          }
        }
      }
    }
  }
}
