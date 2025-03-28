pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

     stages {
    //     // Checkout the code
    //     stage('Checkout Code') {
    //         steps {
    //             script {
    //                 echo "📥 Checking out source code..."
    //                 checkout scm
    //                 sh 'ls -la'  // ตรวจสอบว่าโค้ดถูกดึงมาแล้ว
    //             }
    //         }
    //     }

    //     // Install dependencies
    //     stage('Install Dependencies') {
    //         agent {
    //             docker {
    //                 image 'node:18-alpine'
    //                 reuseNode true
    //             }
    //         }
    //         steps {
    //             script {
    //                 echo "📦 Installing dependencies..."
    //                 sh 'npm install'
    //             }
    //         }
    //     }

    //     // Check if dependencies are installed
    //     stage('Check Dependencies') {
    //         steps {
    //             script {
    //                 echo "🔍 Checking installed dependencies..."
    //                 sh '''
    //                 if [ ! -d "node_modules" ]; then
    //                     echo "⚠️ node_modules directory is missing! Running npm install..."
    //                     npm install
    //                 else
    //                     echo "✅ node_modules exists!"
    //                 fi
    //                 ls -la node_modules/
    //                 '''
    //             }
    //         }
    //     }

        // Build the project
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "🏗️ Building the project..."
                    sh '''
                    npm install
                    npx react-scripts build'''
                }
            }
        }

        // Run tests (if applicable)
        stage('Test') {
             agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "🔬 Running tests..."
                    sh 'npm test'  // ปรับคำสั่งให้เป็นคำสั่งที่ใช้ทดสอบโปรเจคของคุณ
                }
            }
        }

        // Deploy to Netlify
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
                    npx netlify deploy --prod --dir=build \
                    --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                    '''
                }
            }
        }

        // Post deploy actions, e.g., notify Slack, send emails, etc.
        stage('Post Deploy') {
            steps {
                script {
                    echo "📝 Post deploy actions"
                    // ตัวอย่างการทำ post-deploy actions เช่น notify หรืออื่นๆ
                    // sh 'curl -X POST -d "message=Deploy Completed" https://slack-webhook-url'
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
