pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
  }
  environment {
    CYPRESS_RECORD_KEY = "${CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${CYPRESS_AUTH_TOKEN}"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout([
         $class: 'GitSCM',
         branches: scm.branches,
         doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
         extensions: scm.extensions + [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'gorilla-logic']],
         userRemoteConfigs: scm.userRemoteConfigs
        ])
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
            echo("Change: ${env.CHANGE_ID}")
            // sh 'npm install -y'
          }
        }

      }
    }

    stage('Run automated tests') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        // sh "npm run chrome --record false --ci-build-id ${env.BUILD_ID}"
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
    success {
      script {
        if (env.CHANGE_ID) {
          pullRequest.removeLabel('Fail')
          pullRequest.addLabel('Pass')
        }
      }
    }
    failure {
      script {
        if (env.CHANGE_ID) {
          pullRequest.removeLabel('Pass')
          pullRequest.addLabel('Fail')
        }
      }
    }

  }
  triggers {
    cron('H/15 * * * *')
  }
}