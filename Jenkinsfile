pipeline {
  agent any
  stages {
    stage('Cypress automation') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "google-chrome --version"
        sh "npm install -y"
        sh "npm run cypress:all --record false --ci-build-id ${env.BUILD_ID}"
      }
    }
  }
  triggers {
    cron('H/15 * * * *')
  }
}
