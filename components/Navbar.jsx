import React from "react";
import { Button } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";
import {CgFormatSlash} from "react-icons/cg"
import UAuth from '@uauth/js'


export default function Navbar() {

  const uauth = new UAuth({
      clientID: "fa1d4ab6-4d2e-420c-9db9-62035e081b8e",
      redirectUri: "http://localhost:3000",
      scope: "openid wallet email:optional"
    
  })


const unstoppable = async () => {
  try {
    const authorization = await uauth.loginWithPopup()
 
    console.log(authorization)
  } catch (error) {
    console.error(error)
  }
}


const logout = async () => {
  await uauth.logout()
  console.log('Logged out with Unstoppable')
}

  return (
    <div className="lg:w-full md:w-full fixed top-0 left-0 shadow-md border-b border-black h-24 py-3 absolute">
      <div className="flex flex-row items-center justify-between">
        {" "}
        <h1 className="text-3xl px-20">Staketh</h1>
        <div className="mt-8 lg:mr-48 md:mr-24">
             <ConnectButton text="Metamask" />
        </div>
        <CgFormatSlash/>
        <Button
        style={{marginRight:"100px"}}
        onClick={unstoppable}
        text="Login with Unstoppable"
        />
      </div>
    </div>
  );
}
