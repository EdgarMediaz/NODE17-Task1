const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const app = http.createServer(async (request, response) => {
  const requestMethod = request.method;
  const requestUrl = request.url;
  response.setHeader("Content-Type", "application/json");

  if (requestUrl === "/apiv1/tasks") {
    const jsonPath = path.resolve("./data.json");
    const jsonFile = await fs.readFile(jsonPath, "utf8");
    if (requestMethod === "GET") {
      response.writeHead("200");
      response.write(jsonFile);
    }
    if (requestMethod === "POST") {
      request.on("data", (data) => {
        const newTask = JSON.parse(data);
        const arr = JSON.parse(jsonFile);
        arr.push(newTask);
        // console.log(arr);
        fs.writeFile(jsonPath, JSON.stringify(arr))
      });
      if (requestMethod === 'PUT') {
        
      }
    }
  } else {
    response.writeHead("503");
  }

  response.end();
});

const PORT = 8000;
app.listen(PORT);

console.log("Servidor Corriendo");
