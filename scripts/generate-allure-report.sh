#!/bin/bash

# CI-friendly Allure report generation script

echo "Checking for Allure installation..."

# Check if allure is available
if command -v allure &> /dev/null; then
    echo "Allure found, generating report..."
    allure generate allure-results --clean -o allure-report
    echo "Allure report generated successfully!"
    
    # If running locally, open the report
    if [ -z "$CI" ]; then
        echo "Opening Allure report..."
        allure open allure-report
    fi
else
    echo "Allure commandline not found. Installing via npm..."
    npm install -g allure-commandline
    
    if command -v allure &> /dev/null; then
        echo "Allure installed successfully, generating report..."
        allure generate allure-results --clean -o allure-report
        echo "Allure report generated successfully!"
    else
        echo "Failed to install Allure commandline. Please install manually:"
        echo "npm install -g allure-commandline"
        exit 1
    fi
fi
