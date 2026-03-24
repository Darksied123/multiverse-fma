# Comprehensive Guide for Setting up Multiverse FMA on Windows

## Introduction
This guide provides step-by-step instructions for setting up the Multiverse FMA project on a Windows environment using PowerShell and Command Prompt. It covers the basic setup, troubleshooting, and virtual environment (venv) integration.

## Prerequisites
- Windows 10 or later
- Python 3.6 or later
- Git

### Install Python
1. Download the latest version of Python from the [official website](https://www.python.org/downloads/).
2. Run the installer and ensure you check the box that says "Add Python to PATH".
3. Verify installation by running the following command in PowerShell:
   ```powershell
   python --version
   ```

### Install Git
1. Download Git from the [official website](https://git-scm.com/download/win).
2. Install Git with the default settings.
3. Verify installation by running the following command:
   ```powershell
   git --version
   ```

## Cloning the Repository
Use the Command Prompt or PowerShell to clone the repository:
```powershell
git clone https://github.com/Darksied123/multiverse-fma.git
cd multiverse-fma
```

## Setting Up a Virtual Environment
To create a virtual environment and activate it:
1. **Open PowerShell or Command Prompt in the repository directory**
2. Run the following command:
   ```powershell
   python -m venv venv
   ```
3. Activate the virtual environment:
   - For PowerShell:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - For Command Prompt:
     ```cmd
     .\venv\Scripts\activate
     ```

## Installing Dependencies
Once the virtual environment is activated, install the required packages:
```powershell
git pull # Updates the repository if there are changes
pip install -r requirements.txt
```

## Running the Application
To run the application, execute:
```powershell
python app.py
```

## Troubleshooting
- **Issue: Python or Git commands not recognized**  
  *Solution:* Ensure that Python and Git are added to your PATH environment variable during installation.

- **Issue: Activation script not permitted**  
  *Solution:* You may receive an error regarding the execution policy. To allow script execution, run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

- **Issue: Installation errors**  
  *Solution:* Ensure your `requirements.txt` file contains the correct packages and versions. Update pip if necessary:
   ```powershell
   python -m pip install --upgrade pip
   ```

## Conclusion
Following these steps should help you successfully set up the Multiverse FMA project on Windows. For further support, please refer to the issues section of the [GitHub repository](https://github.com/Darksied123/multiverse-fma/issues).  

Feel free to contribute to this guide if you find areas that need improvement!