"use client"
import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

const UNISWAP_V3_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';


interface Token {
  id: string;
  symbol: string;
  name: string;
}

interface PoolDayData {
  date: string;
  volumeUSD: string;
}

interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  volumeUSD: string;
  totalValueLockedUSD: string;
  poolDayData: PoolDayData[];
}

interface PoolResponse {
  pools: Pool[];
}

const POOL_QUERY = gql`
  {
    pools(first: 5, orderBy: volumeUSD, orderDirection: desc) {
      id
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
      volumeUSD
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        date
        volumeUSD
      }
    }
  }
`;

const Pool = (): JSX.Element => {
  const [data, setData] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await request<PoolResponse>(UNISWAP_V3_SUBGRAPH_URL, POOL_QUERY);
        setData(response.pools);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  const calculateAPR = (pool: Pool): string => {
    const volume24h = parseFloat(pool.poolDayData[0]?.volumeUSD || '0');
    const liquidity = parseFloat(pool.totalValueLockedUSD);
    if (liquidity > 0) {
      const apr = ((volume24h / liquidity) * 365 * 100).toFixed(2);
      return `${apr}%`;
    }
    return 'N/A';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Top Pools by 24-Hour Trading Volume</h1>
      <div className="flex justify-center overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 border-b border-gray-300 text-left">Id</th>
              <th className="py-3 px-6 border-b border-gray-300 text-left">Token0</th>
              <th className="py-3 px-6 border-b border-gray-300 text-left">Token1</th>
              <th className="py-3 px-6 border-b border-gray-300 text-left">VolumeUSD</th>
              <th className="py-3 px-6 border-b border-gray-300 text-left">1 Day APR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pool, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b border-gray-300">{pool.id.slice(0, 20)}</td>
                <td className="py-3 px-6 border-b border-gray-300">{pool.token0.symbol}</td>
                <td className="py-3 px-6 border-b border-gray-300">{pool.token1.symbol}</td>
                <td className="py-3 px-6 border-b border-gray-300">{parseFloat(pool.volumeUSD).toFixed(2)}</td>
                <td className="py-3 px-6 border-b border-gray-300">{calculateAPR(pool)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Pool;
