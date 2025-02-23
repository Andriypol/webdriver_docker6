# WebdriverIO Project

![WebdriverIO](https://img.shields.io/badge/-WebdriverIO-EA5906?style=flat&logo=webdriverio&logoColor=white)

## 📌 Project Overview
WebdriverIO project [WebdriverIO](https://webdriver.io/), [Docker](https://www.docker.com/), GitHub Actions and Pages.

## 🛠️ Installation
Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.
#### 1.Clone the repository
```sh
git clone https://github.com/Andriypol/webdriver_docker6.git
cd webdriver_docker6
```
#### 2.Install dependencies
```sh
npm install
```

## ▶️ Running Tests

### Run all tests
```sh
npm run test:chrome
npm run test:firefox
npm run test:all
```

## 📊 Generating Test Reports
To generate a test report after running tests:
```sh
npx allure-commandline generate allure-results --clean -o allure-report
```
## 📊 DockerHub image
To generate a test report after running tests:
```sh
andriip1315/webdriverio-chrome-firefox:latest
```
