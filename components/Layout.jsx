import { Button } from "@web3uikit/core";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex mt-24">
        <div className="w-96 h-screen border-r border-black pt-10 ">
          <Button
            text="Deploy New Stake Contract"
            theme="outline"
            size="large"
          />

          <div className="mt-10  ">
            <h2
              className="bg-slate-500 border-b border-black text-2xl  justify-center w-96 hover:bg-slate-700"
              style={{ marginLeft: "-15px" }}
            >
              Deployed Stake Contracts
            </h2>
          </div>
        </div>
        <div className="flex h-screen ">
          <div className="justify-center">
            <h1 className="text-2xl">About</h1>
            <h1 className="text-xl">How To Stake</h1>
          </div>
        </div>
      </div>
    </>
  );
}
