pipeline {
  agent any
  environment {
    CYPRESS_RECORD_KEY = "${CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${CYPRESS_AUTH_TOKEN}"
  }
  stages {
    stage('Setup dependencies'){
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
    }
    stage('Run automated tests') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "npm run cypress:run --record false --ci-build-id ${env.BUILD_ID}"
      }
    }
  }
  post{
    always {
      echo "Generating reports"
      sh "npm run processReports"
    }
    failure {
      emailext body: '<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}',
        subject: 'Build Failed - ${env.BUILD_NUMBER}',
        to: 'jose.quesada@gorillalogic.com'
        attachmentsPattern: '**/mochawesome-report/*'
    }
  }
  triggers {
    cron('H/15 * * * *')
  }
}
