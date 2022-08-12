import React from "react";
import { Select } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";

export default function Navbar() {
  const options = [
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "emoji",
      label: "Emoji",
      prefix: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    },
    {
      id: "txt",
      label: "TXT",
      prefix: "TXT",
    },
    {
      id: "dapp",
      label: "dApp",
      //prefix: <SvgServer fill="#68738D" />,
    },
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
    {
      id: "discord",
      label: "Discord",
      //prefix: <SvgDiscord fill="#68738D" />,
    },
  ];
  return (
    <div className="w-full fixed top-0 left-0 shadow-md border-b border-black h-24 py-3 absolute ">
      <div className=" flex items-center justify-between">
        {" "}
        <h1 className="text-3xl px-20">Staking App</h1>
        <Select
          style={{ marginLeft: "550px", marginTop:"10px" }}
          //label="Label Text"
          onBlurTraditional={function noRefCheck() {}}
          onChange={function noRefCheck() {}}
          onChangeTraditional={function noRefCheck() {}}
          options={options}
        />
        <ConnectButton style={{marginRight:"100px", marginTop:"20px"}} />
      </div>
    </div>
  );
}
