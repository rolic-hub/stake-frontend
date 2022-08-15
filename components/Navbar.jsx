import React from "react";
import { Select } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";

export default function Navbar() {
  return (
    <div className="lg:w-full md:w-full fixed top-0 left-0 shadow-md border-b border-black h-24 py-3 absolute ">
      <div className="flex flex-row items-center justify-between">
        {" "}
        <h1 className="text-3xl px-20">Staking App</h1>
        <div className="mt-8 lg:mr-48 md:mr-24">
             <ConnectButton  />
        </div>
       
      </div>
    </div>
  );
}
