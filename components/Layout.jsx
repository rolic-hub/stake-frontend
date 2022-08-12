import { Button } from "@web3uikit/core";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex mt-20">
        <div className="w-96 h-screen border-r border-black pt-10 " >
            <Button 
            text="Deploy New Stake Contract"
            theme="outline"
            size="large"/>

            <div className="mt-10  ">
                <h2 className="bg-slate-500 border-b border-black text-2xl flex flex-row justify-center w-96 hover:bg-slate-700"
                style={{marginLeft:"-15px"}}>Deployed Stake Contracts</h2>
               
            </div>
        </div>
        <div className="flex h-screen ">
          <p>About This Project </p>
        </div>
      </div>
    </>
  );
}
