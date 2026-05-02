pipeline {
    agent any

    tools {
        nodejs 'node-24'
    }

    stages {
        stage('1. Build') {
            steps {
                echo 'Stage 1: Build - compiling and packaging using npm'
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('2. Unit & Integration Tests') {
            steps {
                echo 'Stage 2: Running unit and integration tests using Jest'
                bat 'npm test'
            }
        }

        stage('3. Code Analysis') {
            steps {
                echo 'Stage 3: Running static code analysis using ESLint'
                bat 'npm run lint'
            }
        }

        stage('4. Security Scan') {
            steps {
                echo 'Stage 4: Scanning dependencies for vulnerabilities using npm audit'
                bat 'npm audit --audit-level=high || exit 0'
            }
        }

        stage('5. Deploy to Staging') {
            steps {
                echo 'Stage 5: Deploying to local staging server (http://localhost:8001)'
                bat 'if not exist D:\\project\\cicd\\www\\staging mkdir D:\\www\\staging'
                bat 'xcopy /E /I /Y dist\\* D:\\project\\cicd\\www\\staging\\'
            }
        }

        stage('6. Integration Tests on Staging') {
            steps {
                echo 'Stage 6: Running integration tests against staging URL'
                bat 'curl -f http://localhost:8001/index.html'
                bat 'curl -f http://localhost:8001/js/script.min.js'
                bat 'curl -f http://localhost:8001/css/style.min.css'
            }
        }

        stage('7. Deploy to Production') {
            steps {
                echo 'Stage 7: Awaiting approval for production deployment'
                input message: 'Deploy to production?', ok: 'Deploy'
                bat 'if not exist D:\\project\\cicd\\www\\production mkdir D:\\project\\cicd\\www\\production'
                bat 'xcopy /E /I /Y dist\\* D:\\project\\cicd\\www\\production\\'
                echo 'Deployed to http://localhost:8000'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed - check the logs above for details.'
        }
    }
}