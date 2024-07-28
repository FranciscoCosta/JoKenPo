import Web3 from "web3";
import { toast } from "react-toastify";
import ABI from "@/abi.json";

type AuthResponse = {
  account: string;
  isAdmin: boolean;
};

const ADAPTER_ADDRESS = import.meta.env.VITE_CONTRACT_ADD;

export const getWeb3 = async () => {
  console.log("Getting web3");
  if (!window.ethereum) {
    toast.error("Metamask not found. Please install Metamask and refresh the page.");
    return null;
  }
  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return web3;
};

export const getContract = async (web3) => {
  if (!web3) {
    web3 = await getWeb3();
    if (!web3) return null;
  }
  return new web3.eth.Contract(ABI, ADAPTER_ADDRESS, {
    from: localStorage.getItem("account") || undefined,
  });
};

export async function authenticate(): Promise<AuthResponse | undefined> {
  const web3 = await getWeb3();
  if (!web3) return;

  try {
    const accounts = await web3.eth.requestAccounts();
    if (accounts.length === 0) {
      console.log("No accounts found");
      toast.error("You need to connect Metamask to continue.");
      return;
    }
    
    const contract = await getContract(web3);
    if (!contract) return;

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
  }
}

export async function getSettingsContract() {
  const contract = await getContract();
  if (!contract) {
    toast.error("Failed to load contract");
    return null;
  }

  try {
    const address = await contract.methods.getAddress().call();
    if (/^(0x0+)$/i.test(address)) {
      toast.warning("Default settings will be used");
      return {
        bid: Web3.utils.toWei("0.01", "ether"),
        comission: 10,
        address: address,
      };
    } else {
      const bid = await contract.methods.getBid().call();
      const comission = await contract.methods.getComission().call();
      return {
        bid: bid,
        comission: comission,
        address: address,
      };
    }
  } catch (error) {
    console.error("Error fetching contract methods:", error);
    toast.error("Failed to fetch contract settings");
    return null;
  }
}
