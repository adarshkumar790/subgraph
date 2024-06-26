interface Tokens {
    id:String,
    symbol:String,
    name:String,
    volumeUSD:String,
  }
  
  interface GraphQLData {
    tokens: Tokens[];
  }
  
  export const getData: () => Promise<GraphQLData> = async () => {
    const startTime = Date.now();
    console.log("Fetching data started at:", startTime / 1000);
  
    const graphqlResponse = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });
  
    const endTime = Date.now();
    console.log("Fetching data finished at:", endTime / 1000);
    console.log("Time taken to fetch data:", (endTime - startTime) / 1000, "seconds");
  
    if (!graphqlResponse.ok) {
      throw new Error('Failed to fetch GraphQL data');
    }
  
    const { data } = await graphqlResponse.json() as { data: GraphQLData };
    console.log("GraphQL Data: ===============>", data);
  
    return data;
  };
  
  const graphqlQuery = `
    {
  tokens(orderBy: volumeUSD, orderDirection: desc, first: 5) {
    id
    symbol
    name
    volumeUSD 
  }
}
  `;
  
  //////////////////////////////pool///////////
  // interface Token {
  //   symbol: string;
  // }
  
  // interface Pool {
  //   id: string;
  //   token0: Token;
  //   token1: Token;
  //   volumeUSD: string;
  // }
  
  // interface GraphQLData {
  //   pools: Pool[];
  // }
  
  // const graphqlQuery1 = `
  // {
  //   pools(orderBy: volumeUSD, orderDirection: desc, first: 5) {
  //     id
  //     token0 {
  //       symbol
  //     }
  //     token1 {
  //       symbol
  //     }
  //     volumeUSD
  //   }
  // }
  // `;
  
  // export const getPool: () => Promise<GraphQLData> = async () => {
  //   const startTime = Date.now();
  //   console.log("Fetching data started at:", startTime / 1000);
  
  //   const graphqlResponse = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ query: graphqlQuery1 }), // Changed graphqlQuery to graphqlQuery1
  //   });
  
  //   const endTime = Date.now();
  //   console.log("Fetching data finished at:", endTime / 1000);
  //   console.log("Time taken to fetch data:", (endTime - startTime) / 1000, "seconds");
  
  //   if (!graphqlResponse.ok) {
  //     throw new Error('Failed to fetch GraphQL data');
  //   }
  
  //   const { data } = await graphqlResponse.json() as { data: GraphQLData };
  //   console.log("GraphQL Data: ===============>", data);
  
  //   return data;
  // };
  
  