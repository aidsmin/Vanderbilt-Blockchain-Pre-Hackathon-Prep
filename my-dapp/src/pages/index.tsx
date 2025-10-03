import Head from "next/head";
import { useState, useEffect } from "react";
import { readMessage } from "@/utils/contract";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const contractMessage = await readMessage();
        setMessage(contractMessage);
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setMessage("Failed to load message");
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, []);

  return (
    <>
      <Head>
        <title>Smart Contract dApp</title>
        <meta name="description" content="A dApp that reads from a smart contract" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#0a0a0a",
        color: "white",
        padding: "2rem"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          Smart Contract Message
        </h1>
        
        {loading ? (
          <p style={{ fontSize: "1.2rem" }}>Loading message from blockchain...</p>
        ) : (
          <div style={{ 
            backgroundColor: "#f0f0f0", 
            color: "#333",
            padding: "1.5rem", 
            borderRadius: "12px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "600px"
          }}>
            📋 Contract says: "{message}"
          </div>
        )}
        
        <p style={{ 
          fontSize: "0.9rem", 
          color: "#888", 
          marginTop: "2rem",
          textAlign: "center",
          wordBreak: "break-all"
        }}>
          Contract: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
        </p>
      </div>
    </>
  );
}
