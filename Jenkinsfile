pipeline {
  agent any
  environment {
    CYPRESS_RECORD_KEY = "${CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${CYPRESS_AUTH_TOKEN}"
  }
  stages {
    parallel{
      stage('Validate Chrome setup') {
        steps {
          sh "google-chrome --version"
        }
      }
      stage('Setup Cypress environment') {
        steps {
          sh "npm install -y"
        }
      }
    }
    stage('Run automated tests') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh "npm run cypress:run --record false --ci-build-id ${env.BUILD_ID}"
        }
      }
    }
    stage('Build reports') {
      steps {
        sh "npm run processReports"
      }
    }
  }
  triggers {
    cron('H/15 * * * *')
  }
}
