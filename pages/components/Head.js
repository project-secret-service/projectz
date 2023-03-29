import Head from "next/head";

export default function TheHead(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  );
}
