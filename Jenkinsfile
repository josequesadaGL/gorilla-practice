pipeline {
  agent any
  stages {
    stage('Setup dependencies') {
      when {
        branch 'main'
      }
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
      when {
        branch 'main'
      }
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh "npm run chrome --record false --ci-build-id ${env.BUILD_ID}"
      }
    }

  }
  environment {
    CYPRESS_RECORD_KEY = "${CYPRESS_RECORD_KEY}"
    CYPRESS_PROJECT_ID = "${CYPRESS_PROJECT_ID}"
    CYPRESS_AUTH_TOKEN = "${CYPRESS_AUTH_TOKEN}"
  }
  post {
    always {
      echo 'Generating reports'
      sh 'npm run processReports'
    }

    failure {
      emailext(mimeType: 'text/html', body: '${FILE, path="/mochawesome-report/mochawesome.html"}', subject: 'Build Failed - ${env.BUILD_NUMBER}', to: 'jose.quesada@gorillalogic.com', attachmentsPattern: '**/mochawesome-report/*')
    }

  }
  triggers {
    cron('H/15 * * * *')
  }
}