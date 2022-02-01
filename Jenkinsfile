pipeline {
  agent none
  stages {
    stage('Cypress') {
      failFast true
      when{ branch 'main' }
      parallel {
        stage('Tester1') {
          agent {
            dockerfile {
              filename 'Dockerfile.JenkinsAgent'
              dir 'build'
              args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home -v /var/docker/jenkins/jenkins:/var/jenkins'
            }

          }
          steps {
            sh ("""pwd""")
            echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            sh ("""npm run test""")
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
  triggers {
    cron('H/30 * * * *')
  }
}
