const bodyParser = require("body-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const express = require("express");
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "email", title: "Email" },
  ],
});

const addFromDataToCSV = ({ name, email }) => {
  const data = [
    {
      name: name,
      email: email,
    },
  ];

  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
};

app.post("/post", (request, response) => {
  addFromDataToCSV(request.body);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
