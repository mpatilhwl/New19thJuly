@echo off
REM CI-friendly Allure report generation script for Windows

echo Checking for Allure installation...

REM Check if allure is available
allure --version >nul 2>&1
if %errorlevel% == 0 (
    echo Allure found, generating report...
    allure generate allure-results --clean -o allure-report
    echo Allure report generated successfully!
    
    REM If running locally, open the report
    if not defined CI (
        echo Opening Allure report...
        allure open allure-report
    )
) else (
    echo Allure commandline not found. Installing via npm...
    npm install -g allure-commandline
    
    allure --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Allure installed successfully, generating report...
        allure generate allure-results --clean -o allure-report
        echo Allure report generated successfully!
    ) else (
        echo Failed to install Allure commandline. Please install manually:
        echo npm install -g allure-commandline
        exit /b 1
    )
)
