import { client } from './client'
import contractAbi from '../abi.json'

// calls the smart contract

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!

export async function readMessage(): Promise<string> {
  try {
    const data = await client.readContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'getMessage',
    })
    console.log("📋 Contract says:", data)
    return data as string
  } catch (error) {
    console.error("Error reading contract:", error)
    return "Error reading message from contract"
  }
}