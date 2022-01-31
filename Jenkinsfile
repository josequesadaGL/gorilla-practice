pipeline {
  agent none
  triggers{ cron('H/30 * * * *') }
  stages {
    stage('Cypress') {
      failFast true
      parallel {
        stage('Tester1') {
          agent {
            dockerfile {
                filename 'Dockerfile.JenkinsAgent'
                dir 'build'
                args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home'
                customWorkspace '/var/jenkins_home'
            }
          }
          steps {
            echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            sh 'git clone https://github.com/josequesadaGL/gorilla-practice.git'
            sh 'cd /gorilla-practice/'
            sh 'npm install'
            sh 'npm run test'
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
            sh 'npm run test'
          }
        }
      }
    }
  }
}
