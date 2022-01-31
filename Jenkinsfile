pipeline {
  agent none
  stages {
    stage('Cypress') {
      // steps {
        // echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        // sh 'apt install ./google-chrome-stable_current_amd64.deb -y'
        // sh 'google-chrome —version'
      // }
    
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
          }
        }
      }
    }
  }
}
