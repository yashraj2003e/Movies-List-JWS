const dom = require("xmldom").DOMParser;
const path = require("path");
const fs = require("fs");

const fileName = "movies.txt";
const filePath = path.join(__dirname, fileName);

const fileContent = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);

const userName = fileContent[0].trim();
const userPass = fileContent[1].trim();

async function getData() {
  try {
    const response = await fetch(
      "http://localhost:8080/MoviesList-1.0-SNAPSHOT/CheckDataService",
      {
        method: "POST",
        body: `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
                    <SOAP-ENV:Header/>
                        <S:Body>
                            <ns2:ValidateUserData xmlns:ns2="http://movieslist.example.com/">
                                    <arg0>${userName}</arg0>
                                    <arg1>${userPass}</arg1>
                            </ns2:ValidateUserData>
                        </S:Body>
                </S:Envelope>`,
        headers: {
          "Content-type": "text/xml",
        },
      }
    );

    const data = await response.text();
    const doc = new dom().parseFromString(data, "application/xml");
    console.log(doc.getElementsByTagName("return")[0].textContent);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getData();
