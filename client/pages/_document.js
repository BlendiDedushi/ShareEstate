import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
                window.$crisp = [];
                window.CRISP_WEBSITE_ID = "551fc8d5-1910-45eb-bb17-cea9321e7c8a";
                (function () {
                  var d = document;
                  var s = d.createElement("script");
                  s.src = "https://client.crisp.chat/l.js";
                  s.async = 1;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `,
                }}
            />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
