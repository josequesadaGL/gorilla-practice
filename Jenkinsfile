pipeline {
  agent none
  stages {
    stage('Code Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/josequesadaGL/gorilla-practice.git']]
                ])
            }
        }
    stage('Cypress test') {
      agent {
        dockerfile {
          filename 'Dockerfile.JenkinsAgent'
          dir 'build'
          args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home -v /var/docker/jenkins/jenkins:/var/jenkins'
        }
      }
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "ls -l"
        sh "npm install"
        sh "npm run cypress:test"
      }
    }
  }
  triggers {
    cron('H H/4 * * *')
  }
}
