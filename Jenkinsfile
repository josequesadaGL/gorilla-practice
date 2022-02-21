pipeline {
  agent any
  environment {
    CYPRESS_RECORD_KEY = "${env.CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${env.CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${env.CYPRESS_AUTH_TOKEN}"
  }
  stages {
    stage('Clean reports') {
      steps {
        sh "npm run cleanReports"
      }
    }
    stage('Setup dependencies') {
      parallel {
        stage('Validate Chrome setup') {
          steps {
            sh 'google-chrome --version'
          }
        }
        stage('Setup Cypress environment') {
          steps {
            sh 'npm install -y'
          }
        }
      }
    }
    stage('Run automated tests') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "npm run chrome --record false --ci-build-id ${env.BUILD_ID}"
      }
    }
    stage('Process reports') {
      steps {
        sh "npm run processReports"
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'mochawesome-report/'
      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: 'mochawesome-report',
        reportFiles: 'mochawesome.html',
        reportName: "Test Report"
      ])
    }
  }
  triggers {
    cron('H/60 * * * *')
  }
}
