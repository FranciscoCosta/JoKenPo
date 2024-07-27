import Web3 from "web3";
import { toast } from "react-toastify";
import ABI from "@/abi.json";

type AuthResponse = {
    account: string;
    isAdmin: boolean;
};

const ADAPTER_ADDRESS = import.meta.env.VITE_CONTRACT_ADD;

export const getWeb3 = async () => {
    if (!window.ethereum) {
        toast.error("Metamask not found. Please install Metamask and refresh the page.");
        return;
    }
    const web3 = new Web3(window.ethereum);
    return web3;
};

export const getContract = async (web3?: Web3) => {
    if (!web3) {
        web3 = await getWeb3();
    }
    return new web3.eth.Contract(ABI, ADAPTER_ADDRESS, { from: localStorage.getItem("account") || undefined });
};

export async function authenticate(): Promise<AuthResponse | undefined> {
    const web3 = await getWeb3();

    try {
        const accounts = await web3.eth.requestAccounts();
        if (accounts.length === 0) {
            console.log("No accounts found");
            toast.error("You need to connect Metamask to continue.");
            return;
        }
        
        const contract = new web3.eth.Contract(ABI, ADAPTER_ADDRESS, {
            from: accounts[0],
        });
        const ownerAddress = await contract.methods.owner().call();

        localStorage.setItem("account", accounts[0]);
        localStorage.setItem("owner", ownerAddress);
        localStorage.setItem("isAdmin", (ownerAddress.toLowerCase() === accounts[0].toLowerCase()).toString());

        toast.success("Connected to Metamask successfully.");

        return {
            account: accounts[0],
            isAdmin: ownerAddress.toLowerCase() === accounts[0].toLowerCase(),
        };
    } catch (error) {
        console.error(error);
        toast.error("You need to connect Metamask to continue.");
        return;
    }
}
