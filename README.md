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
        uses: your-username/postman-to-restassured-action@v1
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

