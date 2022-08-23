import React, { useState } from "react";
import { Button } from "@web3uikit/core";
import UAuth from "@uauth/js";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import picture from "../assests/default-small.png";
//import { Metamask } from "@web3uikit/icons";
import metamaskP from "../assests/download.png";

export default function Navbar() {
  const [isMetamask, setIsMetamask] = useState(false);
  const [isUdLogin, setIsUdLogin] = useState(false);
  const [accountAddress, setAccount] = useState(null);
  const { account, enableWeb3, isWeb3Enabled, Moralis } = useMoralis();

  const uauth = new UAuth({
    clientID: "fa1d4ab6-4d2e-420c-9db9-62035e081b8e",
    redirectUri: "https://stake-frontend-rolic-hub.vercel.app",
    scope: "openid wallet email:optional",
  });

  const metamask = async () => {
    setIsMetamask(true);
    await enableWeb3();
  };

  const unstoppable = async () => {
    try {
      setIsUdLogin(true);
      const authorization = await uauth.loginWithPopup();
      setAccount(authorization.idToken.wallet_address);
      console.log(authorization);
      account = authorization.idToken.wallet_address;
      window.localStorage.setItem(
        "unstoppable",
        authorization.idToken.wallet_address
      );
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await uauth.logout();
    console.log("Logged out with Unstoppable");
  };

  return (
    <div className="lg:w-full md:w-full fixed top-0 left-0 shadow-md border-b border-black h-20 py-3 absolute">
      <div className="flex flex-row items-center justify-between">
        {" "}
        <h1 className="text-3xl px-20">Staketh</h1>
        {account !== null || accountAddress !== null ? (
          <div className="mt-4 lg:mr-48 md:mr-24 flex flex-row">
            {isMetamask && (
              <button className="bg-green-700 text-white p-2">
                {account.slice(0, 6)}...{account.slice(35, 42)}
              </button>
            )}
            {isUdLogin && (
              <button className="bg-green-700 text-white p-2" onClick={logout}>
                {accountAddress.slice(0, 7)}...{accountAddress.slice(35, 42)}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-2 lg:mr-48 md:mr-24 flex flex-row">
            <Button
              style={{ marginLeft: "150px" }}
              size="large"
              theme="colored"
              color="green"
              onClick={metamask}
              text={
                <p className="flex flex-row">
                  <Image src={metamaskP} height="30" width="30" alt="metamask" />
                  Login with Metamask
                </p>
              }
            />
            <p className="text-2xl text-bold ml-3 mr-3">or</p>
            <Button
              size="large"
              theme="colored"
              color="green"
              style={{ marginRight: "150px" }}
              onClick={unstoppable}
              text={
                <p className="flex flex-row">
                  <Image src={picture} height="30" width="30" alt="ud" /> Login
                  with Unstoppable
                </p>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
