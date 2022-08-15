import React from "react";
import { Select } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";

export default function Navbar() {
  const options = [
    {
      id: "rinkeby",
      label: "Rinkeby",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "kovan",
      label: "kovan",
      prefix: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    },
    {
      id: "hardhat",
      label: "Hardhat",
      prefix: "TXT",
    },
    {
      id: "goerli",
      label: "Goerli",
      //prefix: <SvgServer fill="#68738D" />,
    },
  ];
  return (
    <div className="lg:w-full md:w-full fixed top-0 left-0 shadow-md border-b border-black h-24 py-3 absolute ">
      <div className="flex flex-row items-center justify-between">
        {" "}
        <h1 className="text-3xl px-20">Staking App</h1>
        <div className="mt-5 lg:ml-96 md:16">
          <Select
            //style={{ marginLeft: "550px", marginTop: "10px" }}
            label="Select Chain"
            onBlurTraditional={function noRefCheck() {}}
            onChange={function noRefCheck() {}}
            onChangeTraditional={function noRefCheck() {}}
            options={options}
          />
        </div>
        <div className="mt-8 lg:mr-16 md:mr-16">
             <ConnectButton  />
        </div>
       
      </div>
    </div>
  );
}
