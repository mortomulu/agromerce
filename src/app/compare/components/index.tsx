"use client"
import Layout from "@/components/layout/layout";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/index';
import { useEffect, useState } from 'react';

const Compare = () => {
  const [loading, setLoading] = useState(true);
  const messages: string = useSelector((state: RootState) => state.messages.content);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [messages]);

  const rows = messages.split('|').map(row => row.trim()).filter(row => row !== '');
  const formattedMessages = rows.map(row => {
    const columns = row.split('|').map(col => col.trim()).filter(col => col !== '');
    return columns;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Compare Page</h1>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Messages:</h2>
            <table className="table-auto">
              <tbody>
                {formattedMessages.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">{col}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
