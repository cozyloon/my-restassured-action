# 🧪 Postman to RestAssured Converter Action

![GitHub Action](https://img.shields.io/badge/GitHub%20Action-purple?logo=github&style=flat)

Convert Postman collections to **RestAssured** test cases with optional **Allure** reporting support.

---

## 📌 Overview

This GitHub Action automates the conversion of Postman collections (`.json` files) into **Java RestAssured** test cases. It supports:

- **REST API** testing with generated Java code.
- **Allure Reporting** (optional).
- Seamless integration with CI/CD pipelines.

---

## 🚀 Features

✅ Convert Postman collections to RestAssured test cases  
✅ Supports OAuth2 Bearer Token Authentication  
✅ Automatic test generation with assertions  
✅ Optional **Allure** reporting for test execution

---

## 📂 Project Structure

. ├── Dockerfile ├── action.yml ├── entrypoint.sh ├── scripts/ │ └── convert.js └── package.json


---

## 🔧 Inputs

| Input Name        | Required | Default               | Description                              |
|-------------------|----------|-----------------------|------------------------------------------|
| `collection_path` | ✅       | N/A                   | Path to the Postman collection (.json). |
| `output_directory`| ❌       | `./generated-tests`   | Directory to store generated tests.      |
| `enable_allure`   | ❌       | `true`                | Enable Allure report generation.         |

---

## 📊 Outputs

| Output Name      | Description                           |
|------------------|---------------------------------------|
| `test_path`      | Path to the generated test files.     |

---

## ▶️ Usage

Add the following step to your GitHub Action workflow:

```yaml
name: Convert Postman to RestAssured

on:
  push:
    branches:
      - main

jobs:
  convert:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Run Postman to RestAssured Converter
        uses: cozyloon/my-restassured-action@v1.0.0
        with:
          collection_path: 'path/to/your-collection.json'
          output_directory: './generated-tests'
          enable_allure: 'true'

      - name: Upload RestAssured Tests
        uses: actions/upload-artifact@v3
        with:
          name: restassured-tests
          path: ./generated-tests
```
📊 Allure Reporting
If Allure is enabled, the action will:

Run mvn clean test with Allure integration.
Generate a report at allure-report/.
You can upload the report to GitHub as an artifact:

```
- name: Upload Allure Report
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report
```

🛠️ Development
Clone the repository:
```
git clone https://github.com/your-username/postman-to-restassured-action.git
cd postman-to-restassured-action
```

Install dependencies and run the converter locally:
```
npm install
node scripts/convert.js path/to/your-collection.json ./output
```

Build Docker image for local testing:
```
docker build -t postman-to-restassured .
```

Test locally using Docker:
```
docker run --rm -e INPUT_COLLECTION_PATH="path/to/your-collection.json" -e INPUT_OUTPUT_DIRECTORY="./generated-tests" postman-to-restassured
```

📣 Contributing
Contributions are welcome!

Fork the repository.
Create a new branch (feature/new-feature).
Submit a Pull Request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
```
Feel free to adjust any details such as the repository name or paths to better suit your project. Let me know if you'd like any further modifications! 😊
```
