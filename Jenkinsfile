pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Make sure NodeJS is configured in Jenkins Global Tool Configuration
    }
    
    environment {
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                        sh 'npx playwright install --with-deps'
                    } else {
                        bat 'npm ci'
                        bat 'npx playwright install --with-deps'
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test'
                    } else {
                        bat 'npm run test'
                    }
                }
            }
            post {
                always {
                    // Archive test results
                    archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
                    
                    // Publish test results
                    publishTestResults testResultsPattern: 'test-results/junit.xml'
                }
            }
        }
    }
    
    post {
        always {
            // Generate and publish Allure report
            script {
                try {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                } catch (Exception e) {
                    echo "Allure report generation failed: ${e.getMessage()}"
                    echo "Allure results are archived as artifacts instead"
                }
            }
            
            // Clean workspace
            cleanWs()
        }
    }
}
