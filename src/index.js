import puppeteer from "@cloudflare/puppeteer";

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    /*
     * Generate CV PDF dynamically.
     */

    if (url.pathname === "/assets/cv.pdf") {

      const browser =
        await puppeteer.launch(env.BROWSER);


      try {

        const page =
          await browser.newPage();


        /*
         * Load the dedicated print version
         * from the deployed website itself.
         */

        const cvUrl =
          `${url.origin}/cv/`;


        await page.goto(
          cvUrl,
          {
            waitUntil: "networkidle0"
          }
        );


        const pdf =
          await page.pdf({

            format: "A4",

            printBackground: true,

            preferCSSPageSize: true,

            margin: {
              top: "0mm",
              right: "0mm",
              bottom: "0mm",
              left: "0mm"
            }

          });


        return new Response(
          pdf,
          {
            headers: {

              "Content-Type":
                "application/pdf",

              "Content-Disposition":
                'attachment; filename="Matteo-Cavalli-CV.pdf"',

              "Cache-Control":
                "public, max-age=3600"

            }
          }
        );


      } finally {

        await browser.close();

      }

    }


    /*
     * Everything else is served from
     * the static Jekyll build.
     */

    return env.ASSETS.fetch(request);

  }

};
