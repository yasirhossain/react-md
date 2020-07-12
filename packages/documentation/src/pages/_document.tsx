/* eslint-disable react/no-danger */
import React, { ReactElement } from "react";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import Cookie from "js-cookie";

import Analytics from "components/Analytics";
import { ThemeMode, toTheme } from "components/Theme";

interface MyDocumentProps {
  theme: ThemeMode;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    let theme: ThemeMode = "os";
    if (ctx && ctx.req) {
      theme = toTheme(ctx.req.cookies.theme ?? "os");
    } else if (typeof window !== "undefined") {
      theme = toTheme(Cookie.get("theme") || "os");
    }

    return {
      ...initialProps,
      theme,
    };
  }

  public render(): ReactElement {
    const { theme } = this.props;
    return (
      <html
        lang="en"
        dir="ltr"
        className={theme === "os" ? undefined : `${theme}-theme`}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
          <script
            dangerouslySetInnerHTML={{ __html: "window.Prism={manual:true}" }}
          />
        </body>
      </html>
    );
  }
}
