import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Mint from "./components/mint";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="bg-red-50 h-screen text-center">
      <div className="text-3xl text-blue-500 font-bold pt-3">Mint Your Free NFT</div>
      <ConnectMenu />
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="mt-5">
        <div>Connected account:</div>
        <div>{address}</div>
        <div className="my-5">
          <Mint/>
        </div>
        <button className="border p-3 mt-3 rounded-md hover:cursor-pointer hover:bg-red-500" 
        onClick={()=>{disconnect()}}>Disconnect</button>
      </div>
    );
  }

  return (
    <button className="border p-3 mt-3 rounded-md hover:cursor-pointer hover:bg-green-500" type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect your wallet
    </button>
  );
}


export default App;
