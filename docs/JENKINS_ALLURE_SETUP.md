# Allure Setup for Jenkins CI/CD

## Jenkins Configuration Steps

### 1. Install Required Jenkins Plugins
- **Allure Jenkins Plugin** - For generating and displaying Allure reports
- **NodeJS Plugin** - For Node.js support
- **Pipeline Plugin** - If using Jenkins pipelines

### 2. Configure Global Tools in Jenkins
1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Add **NodeJS** installation:
   - Name: `NodeJS`
   - Version: Latest LTS (18.x or 20.x)
   - Check "Install automatically"

### 3. Configure Allure in Jenkins
1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Find **Allure Commandline** section
3. Add Allure installation:
   - Name: `Allure`
   - Version: Latest (e.g., 2.24.0)
   - Check "Install automatically"

### 4. Alternative: Manual Allure Installation on Jenkins Agent
If automatic installation doesn't work, install manually on Jenkins agents:

#### For Linux/Mac:
```bash
# Download and install Allure
curl -o allure-2.24.0.tgz -L https://github.com/allure-framework/allure2/releases/download/2.24.0/allure-2.24.0.tgz
tar -zxf allure-2.24.0.tgz
sudo mv allure-2.24.0 /opt/allure
sudo ln -s /opt/allure/bin/allure /usr/local/bin/allure
```

#### For Windows:
```cmd
# Download from: https://github.com/allure-framework/allure2/releases
# Extract to C:\allure
# Add C:\allure\bin to PATH environment variable
```

### 5. Pipeline Configuration
Use the provided `Jenkinsfile` in your repository, or configure build steps:

#### Build Steps:
1. **Execute Shell/Batch Command**: `npm ci`
2. **Execute Shell/Batch Command**: `npx playwright install --with-deps`
3. **Execute Shell/Batch Command**: `npm run test:ci`

#### Post-build Actions:
1. **Allure Report**:
   - Path: `allure-results`
2. **Archive Artifacts**:
   - Files: `allure-results/**/*`

### 6. Troubleshooting

#### Error: "Can't find allure commandline"
**Solutions:**
1. Verify Allure is installed in Global Tool Configuration
2. Check Jenkins agent has Allure in PATH
3. Use the safe scripts provided in `/scripts` folder
4. Install Allure manually on Jenkins agent

#### Error: "JAVA_HOME not set"
**Solution:**
```bash
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk
```

#### Error: Allure results not found
**Solution:**
- Ensure tests are generating results in `allure-results` folder
- Check Playwright config has allure-playwright reporter
- Verify the results path in Jenkins job configuration

### 7. Environment Variables for CI
Set these in Jenkins job or pipeline:

```bash
CI=true
NODE_ENV=test
```

### 8. Local Testing
Before pushing to Jenkins, test locally:

```bash
# Run tests and generate report
npm run test:ci

# Check if allure-results folder is created
ls -la allure-results/

# Generate report manually
npm run allure:generate:safe
```

## Jenkins Pipeline Example

```groovy
pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
        allure 'Allure'
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
        }
    }
    
    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
```

## Support
If you continue to have issues, check:
1. Jenkins logs for detailed error messages
2. Allure plugin version compatibility
3. Java version on Jenkins agent (Allure requires Java 8+)
