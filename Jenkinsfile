pipeline {
  agent any
  environment {
    CYPRESS_RECORD_KEY = 'fe77ef76-0f9b-4690-8e32-eba83fb9a533'
    CYPRESS_PROJECT_ID = 'woj44y'
    CYPRESS_AUTH_TOKEN = 'Basic YXV0bzphdXRv'
  }
  stages {
    stage('Cypress automation') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "google-chrome --version"
        sh "npm install -y"
        sh "npm run cypress:all --ci-build-id ${env.BUILD_ID}"
      }
    }
  }
  triggers {
    cron('H H/4 * * *')
  }
}
