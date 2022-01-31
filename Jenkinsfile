pipeline {
  agent none
  triggers{ cron('H/30 * * * *') }
  stages {
    stage('Cypress') {
      parallel {
        stage('Tester1') {
          agent {
            dockerfile {
                filename 'Dockerfile.JenkinsAgent'
                dir 'build'
                args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home'
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
                args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home'
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
