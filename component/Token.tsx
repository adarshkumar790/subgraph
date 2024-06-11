import { getData } from "@/utils/subgraph";

export default async function Token(): Promise<JSX.Element> {
  let content: JSX.Element;

  try {
    const data = await getData();
    console.log("GraphQL Data: ===============>", data);

    if (data && data.tokens) {
      console.log("Main Data: ===============>", data);

      content = (
        <main className="container mx-auto p-7">
          <h1 className="text-2xl font-bold mb-4">Token</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-200 w-1/4">Id</th>
                  <th className="py-2 px-4  border-b border-gray-200 w-1/4">Symbol</th>
                  <th className="py-2 px-4 border-b border-gray-200 w-1/4">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 w-1/4">VolumeUSD</th>
                </tr>
              </thead>
              <tbody>
                {data.tokens.map((position, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 border-b border-gray-200">{position.id.slice(0, 20)}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{position.symbol}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{position.name}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{position.volumeUSD.slice(0, 15)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      );
    } else {
      console.log("Main Data: ===============> Undefined or incorrect structure");

      content = (
        <main className="container mx-auto p-4">
          <div className="text-red-500">Data is undefined or has an incorrect structure</div>
        </main>
      );
    }
  } catch (error) {
    console.error(error);
    content = (
      <main className="container mx-auto p-4">
        <div className="text-red-500">Error fetching data</div>
      </main>
    );
  }

  return content;
}
