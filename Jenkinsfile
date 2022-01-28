pipeline {
  agent none
  stages {
    stage('Build') {
      agent {
        dockerfile {
          label 'jenkinsAgent'
        }
      }
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'apt install ./google-chrome-stable_current_amd64.deb -y'
        sh 'google-chrome —version'
      }
    }
  }
}
