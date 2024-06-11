import { getPool } from "@/utils/subgraph";

export default async function Pool(): Promise<JSX.Element> {
  let content: JSX.Element;

  try {
    const data = await getPool();
    console.log("GraphQL Data: ===============>", data);

    if (data && data.pools) {
      console.log("Main Data: ===============>", data);

      content = (
        <main className="container mx-auto p-4">
          <h5 className="text-2xl font-bold mb-6 text-gray-800">Pool Data</h5>
          <div className="flex justify-center overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-6 border-b border-gray-300 text-left">Id</th>
                  <th className="py-3 px-6 border-b border-gray-300 text-left">Token0</th>
                  <th className="py-3 px-6 border-b border-gray-300 text-left">Token1</th>
                  <th className="py-3 px-6 border-b border-gray-300 text-left">VolumeUSD</th>
                </tr>
              </thead>
              <tbody>
                {data.pools.map((pool, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-6 border-b border-gray-300">{pool.id.slice(0, 20)}</td>
                    <td className="py-3 px-6 border-b border-gray-300">{pool.token0.symbol}</td>
                    <td className="py-3 px-6 border-b border-gray-300">{pool.token1.symbol}</td>
                    <td className="py-3 px-6 border-b border-gray-300">{pool.volumeUSD.slice(0, 20)}</td>
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
