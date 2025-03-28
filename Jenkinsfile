pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('nfp_JKU541H1MZmJTSEAovcBC7jqYrgN7FwC82f8')
        NETLIFY_SITE_ID = credentials('6e49260a-030e-4f06-995a-3337d587c017')
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                    netlify deploy --prod --dir=dist \
                    --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                    '''
                }
            }
        }

        stage('Post Deploy') {
            steps {
                script {
                    sh 'curl -s -o /dev/null -w "%{http_code}" https://your-netlify-site.netlify.app'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}
