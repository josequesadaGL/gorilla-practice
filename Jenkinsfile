pipeline {
  agent none
  stages {
    stage('Build') {
      failFast true
      stage('Tester1') {
        agent {
          dockerfile {
            filename 'Dockerfile.JenkinsAgent'
            dir 'build'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home -v /var/docker/jenkins/jenkins:/var/jenkins'
          }

        }
        steps {
          echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
          git "https://github.com/josequesadaGL/gorilla-practice.git"
          sh "ls -l"
          sh "npm install"
          sh "npm run cypress:test"
        }
      }
    }

  }
  triggers {
    cron('H H/4 * * *')
  }
}
