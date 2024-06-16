"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { ClipLoader } from "react-spinners"; // Import a spinner component

const agroProducts = [
  {
    id: 1,
    name: "Tomato",
    category: "Vegetables",
    price: 2.5, // Price per kilogram in USD
    inStock: true,
    description: "Fresh organic tomatoes, rich in vitamins and minerals.",
    supplier: "Green Farms Ltd.",
    origin: "California, USA",
  },
  {
    id: 2,
    name: "Wheat",
    category: "Grains",
    price: 1.2, // Price per kilogram in USD
    inStock: true,
    description: "High-quality wheat suitable for bread and pasta.",
    supplier: "Agro Suppliers Inc.",
    origin: "Kansas, USA",
  },
  {
    id: 3,
    name: "Apple",
    category: "Fruits",
    price: 3.0, // Price per kilogram in USD
    inStock: false,
    description: "Juicy and sweet apples, perfect for snacks and desserts.",
    supplier: "Fruit Harvest Co.",
    origin: "Washington, USA",
  },
  {
    id: 4,
    name: "Corn",
    category: "Grains",
    price: 1.5, // Price per kilogram in USD
    inStock: true,
    description: "Fresh corn kernels, great for cooking and snacking.",
    supplier: "Farm Fresh Produce",
    origin: "Iowa, USA",
  },
  {
    id: 5,
    name: "Spinach",
    category: "Vegetables",
    price: 2.0, // Price per kilogram in USD
    inStock: true,
    description: "Nutritious and fresh spinach, ideal for salads and cooking.",
    supplier: "Healthy Greens LLC",
    origin: "Florida, USA",
  },
];

const ChatAI = () => {
  const supabase = createClientComponentClient();
  const [respond, setRespond] = useState("");
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const API_KEY = process.env.NEXT_SECRET_OPENAI_API_KEY; // Replace with your actual API key

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    try {
      const { data, error }: any = await supabase.from("products").select();
      if (error) throw error;
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const promptAwal =
      "kamu adalah seorang customer service untuk sebuah e-commerce agro yang akan menjawab masalah masalah dan memberikan informasi dalam bidang agro, dan jika ada pertanyaan diluar bidang agro, ingatkan customer bahwa anda adalah cs agro";

    const APIBody = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: promptAwal,
        },
        {
          role: "user",
          content: `pertanyaan dari user: ${prompt}`,
        },
      ],
    };

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${API_KEY}`);

      const raw = JSON.stringify(APIBody);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setPrompt("");

      // Format response content with line breaks
      const formattedResponse = data.choices[0].message.content
        .replace(/\n/g, "<br />")
        .replace(/(\d+\.\s)/g, "<strong>$1</strong>");

      displayResponse(formattedResponse);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const displayResponse = (text: any) => {
    setRespond("");
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length - 1) {
        setRespond((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 20);
  };

  return (
    <div className="flex flex-col pt-28 p-10 h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded relative">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75">
              <ClipLoader size={50} color={"#3cb371"} loading={isLoading} />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: respond }} />
        </div>
        <div className="flex items-center gap-5 mt-4">
          <input
            className="bg-white rounded-full w-full px-4 py-2 border-gray-300 border"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tuliskan yang mau anda tanyakan disini..."
            disabled={isLoading} // Disable input when loading
          />
          <button type="submit" disabled={isLoading}>
            <IoSend className="w-7 h-7 text-center text-blue-500" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatAI;
