pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "Checking out source code..."
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    echo "Building the project..."
                    sh 'npm run build'
                }
            }
        }

        stage('Check Build Directory') {
            steps {
                script {
                    echo "Checking if build directory exists..."
                    sh 'ls -la dist/'
                }
            }
        }

        stage('Deploy to Netlify') {
            steps {
                script {
                    echo "Deploying to Netlify..."
                    sh '''
                    npm install -g netlify-cli
                    netlify deploy --prod --dir=dist \
                    --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! 🎉"
        }
        failure {
            echo "❌ Deployment Failed! Check logs for details."
        }
    }
}
