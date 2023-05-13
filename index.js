const express = require('express');
const app = express();
const port = 3000;
const PDFDocument = require('pdfkit');
const fs = require("fs");

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/download', (req, res) => {
  const name = "output"

  const doc = new PDFDocument({size: 'A4'});
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`${name}.pdf`));
    doc
      .font('assets/fonts/MN PhatKaphrao.ttf')
      .fontSize(15)
      .text('01 Jan. 2023', {align: 'right'});
    doc
      .fontSize(25)
      .text('Example Text');
    // Finalize PDF file
    doc.end();

  res.send(`PDF Generated. (${name}.pdf)`);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});