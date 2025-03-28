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
                    sh 'ls -la'  // เช็คว่าโค้ดถูกดึงมาแล้ว
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
                    sh '''
                    npm install
                    npm install -g netlify-cli
                    netlify --version  # ตรวจสอบว่า Netlify CLI ใช้งานได้
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
                    sh 'npm run build'
                }
            }
        }

        stage('Check Build Directory') {
            steps {
                script {
                    echo "🔍 Checking if build directory exists..."
                    sh '''
                    if [ -d "dist" ]; then
                        echo "✅ Build directory exists!"
                        ls -la dist/
                    else
                        echo "❌ Build directory missing! Build might have failed."
                        exit 1
                    fi
                    '''
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
                    withEnv(["NETLIFY_AUTH_TOKEN=${NETLIFY_AUTH_TOKEN}", "NETLIFY_SITE_ID=${NETLIFY_SITE_ID}"]) {
                        sh '''
                        netlify deploy --prod --dir=dist \
                        --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                        '''
                    }
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
