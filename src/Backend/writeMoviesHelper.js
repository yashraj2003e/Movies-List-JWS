const dom = require("xmldom").DOMParser;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./movies.txt");

const fileContent = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);

const moviesName = fileContent[0].trim();

async function sendMovies() {
  try {
    const response = await fetch(
      "http://localhost:8080/MoviesList-1.0-SNAPSHOT/SaveDataService",
      {
        method: "POST",
        body: `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
                <SOAP-ENV:Header/>
                    <S:Body>
                        <ns2:saveList xmlns:ns2="http://movieslist.example.com/">
                            <arg0>${moviesName}</arg0>
                        </ns2:saveList>
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

sendMovies();
