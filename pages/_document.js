import { Head, Html, Main, NextScript } from "next/document";


export default function Document(){
    return (
        <Html>
            <Head>
                <title>Training - NextJS</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}