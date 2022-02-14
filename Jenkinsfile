pipeline {
  agent none
  stages {
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
        checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/josequesadaGL/gorilla-practice.git']]
                ])
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
