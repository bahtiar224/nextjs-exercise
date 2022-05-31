import { Head, Html, Main, NextScript } from "next/document";


export default function Document(){
    return (
        <Html>
            <Head>
                <title>Training - Document JS</title>
                <link rel="icon" href="/fish.jpg"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}