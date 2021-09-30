const { renderData, fetchFlights } = require("./solution");

// Please run your solution from this file
fetchFlights().then(renderData);

console.log("Hello from %csrc/index.js", "font-weight:bold");
