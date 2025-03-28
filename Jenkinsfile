pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages {
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
                    args '--user root --cap-add=SYS_ADMIN'
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
    agent any
    steps {
        script {
            echo "🔍 Monitoring server resources during the test..."
            
            // Run resource monitoring commands
            try {
                sh '''
                    # Monitoring top 10 processes by memory usage
                    echo "Top 10 processes by memory usage:"
                    ps aux --sort=-%mem | head -n 10
                    
                    # Memory usage
                    echo "Memory usage:"
                    free -h
                    
                    # System performance
                    echo "System performance stats (vmstat):"
                    vmstat 1 5
                    
                    # CPU usage (sar requires sysstat to be installed)
                    echo "CPU usage (sar):"
                    sar -u 1 5 || echo "sar command not available on this system."
                '''
            } catch (e) {
                echo "Error monitoring server resources: ${e}"
            }
        }
    }
}

    }

    // post {
    //     success {
    //         echo "✅ Deployment Successful! 🎉"
    //     }
    //     failure {
    //         echo "❌ Deployment Failed! Check logs for details."
    //     }
    // }
}
