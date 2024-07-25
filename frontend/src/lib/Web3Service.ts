import Web3 from "web3";
import { toast } from "react-toastify";
import ABI from "@/abi.json";

type AuthResponse = {
    account: string;
    isAdmin: boolean;
}

export async function authenticate() : Promise<AuthResponse | undefined> {

    if(!window.ethereum) {
        toast.error("Metamask not found. Please install Metamask and refresh the page.");
        return;
    }
    const web3 = new Web3(window.ethereum);

    try {
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts.length);
        if(accounts.length === 0) {
            console.log("No accounts found");
            toast.error("You need to connect Metamask to continue.");
            return;
        }
        const contract = new web3.eth.Contract(ABI, import.meta.env.VITE_CONTRACT_ADD, {
            from: accounts[0]
        });
        const ownerAddress = await contract.methods.owner().call();

        localStorage.setItem("account", accounts[0]);
        localStorage.setItem("isAdmin", (ownerAddress === accounts[0] ? "true" : "false") as string);

        toast.success("Connected to Metamask successfully.");
        
        return {
            account: accounts[0],
            isAdmin: ownerAddress === accounts[0] ? true : false
        } as AuthResponse;
    } catch (error) {
        console.error(error);
        toast.error("You need to connect Metamask to continue.");
        return;
    }
    
}