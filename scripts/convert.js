const fs = require('fs');
const path = require('path');

function convertToRestAssured(collectionPath, outputDir) {
    if (!fs.existsSync(collectionPath)) {
        throw new Error(`Postman collection not found: ${collectionPath}`);
    }

    const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
    const requests = collection.item;

    console.log(`Generating RestAssured tests for: ${collection.info.name}`);

    requests.forEach((requestItem, index) => {
        const method = requestItem.request.method.toUpperCase();
        const url = requestItem.request.url.raw;
        const headers = requestItem.request.header || [];
        const body = requestItem.request.body?.raw || '';
        const statusCode = requestItem?.response?.[0]?.status || 200;
        const auth = requestItem.request.auth?.bearer?.[0]?.value || '';
        const queryParams = requestItem.request.url.query || [];

        const javaTestCode = `
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ${sanitizeClassName(requestItem.name)}Test {

    @Test
    public void test_${method}_${index}() {
        RestAssured.baseURI = "${getBaseUri(url)}";
        
        given()
            .headers(${formatHeaders(headers)})
            .queryParams(${formatQueryParams(queryParams)})
            .auth().oauth2("${auth}")
            .body(${JSON.stringify(body)})
        .when()
            .${method.toLowerCase()}("${getEndpoint(url)}")
        .then()
            .statusCode(${statusCode})
            .log().all();
    }
}
        `;

        const outputFile = path.join(outputDir, `${sanitizeClassName(requestItem.name)}Test.java`);
        fs.writeFileSync(outputFile, javaTestCode);
        console.log(`✅ Generated: ${outputFile}`);
    });
}

function sanitizeClassName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '');
}

function formatHeaders(headers) {
    return headers.map(header => `"${header.key}", "${header.value}"`).join(", ");
}

function formatQueryParams(queryParams) {
    return queryParams.map(param => `"${param.key}", "${param.value}"`).join(", ");
}

function getBaseUri(url) {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
}

function getEndpoint(url) {
    return new URL(url).pathname;
}

const [, , collectionPath, outputDir] = process.argv;
convertToRestAssured(collectionPath, outputDir);
