import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generateShortUrl = async () => {
    try {
      // console.log(originalUrl);
      axios
        .post(`http://localhost:3000/url`, {
          URL: originalUrl,
        })
        .then((res) => {
          setShortUrl(`http://localhost:3000/${res.data.message}`);
        });
    } catch (error) {
      console.error("Error generating short URL:", error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    toast.success("Successfully copied!");

    // Reset the "Copied" state after a brief period
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen mx-auto mt-8">
      <h1 className="text-3xl font-semibold ">Short URL Generator</h1>
      <a href="" className="text-sm mb-4">
        By Shubhankit Jain
      </a>
      <div className="flex items-center mb-4">
        <label className="mr-2">Original URL:</label>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
        />
      </div>
      <button
        onClick={generateShortUrl}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Short URL
      </button>
      {shortUrl && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold mb-2">Short URL:</p>
          <div className="flex items-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline border-2 p-2 rounded-md border-blue-500"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
