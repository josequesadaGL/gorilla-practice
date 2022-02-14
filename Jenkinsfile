pipeline {
  agent any
  environment {
    CYPRESS_RECORD_KEY = "${CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${CYPRESS_AUTH_TOKEN}"
  }
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
