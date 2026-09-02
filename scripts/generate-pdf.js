const http = require("http");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");


const MIME = {

  ".html": "text/html; charset=utf-8",

  ".css": "text/css",

  ".js": "application/javascript",

  ".svg": "image/svg+xml",

  ".png": "image/png",

  ".jpg": "image/jpeg",

  ".jpeg": "image/jpeg",

  ".ico": "image/x-icon",

  ".json": "application/json",

  ".woff": "font/woff",

  ".woff2": "font/woff2",

  ".xml": "application/xml",

  ".pdf": "application/pdf",

};


function serveStatic(rootDir) {

  return http.createServer((req, res) => {

    let urlPath =
      decodeURIComponent(
        req.url.split("?")[0]
      );


    if (urlPath.endsWith("/")) {

      urlPath +=
        "index.html";

    }


    const filePath =
      path.join(
        rootDir,
        urlPath
      );


    if (!filePath.startsWith(rootDir)) {

      res.writeHead(403);

      return res.end(
        "Forbidden"
      );

    }


    fs.readFile(
      filePath,
      (err, data) => {

        if (err) {

          res.writeHead(404);

          return res.end(
            "Not found: " + urlPath
          );

        }


        const ext =
          path.extname(
            filePath
          );


        res.writeHead(
          200,
          {
            "Content-Type":
              MIME[ext] ||
              "application/octet-stream"
          }
        );


        res.end(data);

      }
    );

  });

}


function today() {

  const d =
    new Date();


  const year =
    d.getFullYear();


  const month =
    String(
      d.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      d.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;

}


(async () => {

  const sitePath =
    path.resolve(
      __dirname,
      "..",
      "_site"
    );


  const cvHtmlPath =
    path.join(
      sitePath,
      "cv",
      "index.html"
    );


  const outputDir =
    path.join(
      sitePath,
      "assets"
    );


  const datedOutputPath =
    path.join(
      outputDir,
      `${today()}-Matteo-Cavalli-CV.pdf`
    );


  const stableOutputPath =
    path.join(
      outputDir,
      "cv.pdf"
    );


  if (!fs.existsSync(cvHtmlPath)) {

    console.error(
      `Cannot find ${cvHtmlPath}. Run "jekyll build" before generating the PDF.`
    );

    process.exit(1);

  }


  if (!fs.existsSync(outputDir)) {

    fs.mkdirSync(
      outputDir,
      {
        recursive: true
      }
    );

  }


  const server =
    serveStatic(
      sitePath
    );


  await new Promise(
    (resolve) =>
      server.listen(
        0,
        "127.0.0.1",
        resolve
      )
  );


  const port =
    server.address().port;


  const browser =
    await puppeteer.launch({

      headless: "new",

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ],

    });


  try {

    const page =
      await browser.newPage();


    await page.goto(

      `http://127.0.0.1:${port}/cv/`,

      {
        waitUntil:
          "networkidle0"
      }

    );


    await page.pdf({

      path:
        datedOutputPath,

      format:
        "A4",

      printBackground:
        true,

      margin: {

        top: "0mm",

        bottom: "0mm",

        left: "0mm",

        right: "0mm",

      },

      preferCSSPageSize:
        true,

    });


    fs.copyFileSync(

      datedOutputPath,

      stableOutputPath

    );


    console.log(
      `PDF generated: ${datedOutputPath}`
    );


    console.log(
      `Stable copy: ${stableOutputPath}`
    );


  } finally {

    await browser.close();

    server.close();

  }

})();