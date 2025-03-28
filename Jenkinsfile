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
                    echo "📥 Checking out source code..."
                    checkout scm
                    sh 'ls -la'  // ตรวจสอบว่าโค้ดถูกดึงมาแล้ว
                }
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Check Dependencies') {
            steps {
                script {
                    echo "🔍 Checking installed dependencies..."
                    sh '''
                    if [ ! -d "node_modules" ]; then
                        echo "⚠️ node_modules directory is missing! Running npm install..."
                        npm install
                    else
                        echo "✅ node_modules exists!"
                    fi
                    ls -la node_modules/
                    '''
                }
            }
        }

        stage('Build Project') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "🏗️ Building the project..."
                    sh 'npx react-scripts build'
                }
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "🚀 Deploying to Netlify..."
                    sh '''
                    npx netlify deploy --prod --dir=dist \
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
