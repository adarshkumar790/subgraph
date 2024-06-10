import styles from "./Token.module.css"
import { getData } from "@/utils/subgraph";
export default async function Token(): Promise<JSX.Element> {
  let content: JSX.Element;

  try {
    const data = await getData();
    console.log("GraphQL Data: ===============>", data);

    if (data && data.tokens) {
      console.log("Main Data: ===============>", data);

      content = (
        <main className={styles.container}>
          <h1>Graph Data</h1>
          <div className={styles.lovelyData}>
            <h2>Trade Data</h2>
            {data.tokens.map((position, index) => (
              <div key={index} className={styles.position}>
                <div>Id: {position.id.slice(1,12)}</div>
                <div>Symbol: {position.symbol.slice(1,12)}</div>
                <div>Name: {String(position.name).slice(1, 12)}</div>
                <div>VolumeUSD: {position.volumeUSD}</div>
              </div>
            ))}
          </div>
        </main>
      );
    } else {
      console.log("Main Data: ===============> Undefined or incorrect structure");

      content = (
        <main className={styles.container}>
          <div>Data is undefined or has an incorrect structure</div>
        </main>
      );
    }
  } catch (error) {
    console.error(error);
    content = (
      <main className={styles.container}>
        <div>Error fetching data</div>
      </main>
    );
  }

  return content;
}
