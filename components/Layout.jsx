//import { Button } from "@web3uikit/core";
import SideBar from "./SideBar";
import {Minus} from '@web3uikit/icons'
import Image from 'next/image'
import description from "../assests/description.png"




export default function Layout() {
  return (
    <div>
      <SideBar />
      <div
        className="flex h-screen lg:w-2/3 md:w-1/2 ml-auto mr-16 "
        style={{ marginTop: "-870px" }}
      >
        <div className="mt-16 text-center pl-24 pr-24">
          <h1 className="text-2xl p-7 font-bold">About</h1>
          <p>
            The Stake App is a simple staking protocol currently on the ethereum
            blockchain it allows users to stake their Eth and gain interest
            based on if the total staked is above or equal to the threshold.
            <br></br>
            <br></br>
            Note- Compatability with other blockchains coming soon
          </p>
          <h1 className="text-xl pt-10 pb-5">How To Stake</h1>
          <div className="text-start">
          <div>
                          To Stake your Eth  ----<br></br>
            <br></br>
            <p className="flex flex-row">
            <Minus fontSize='20px' style={{marginTop: "10px", marginRight: "10px"}}/>
            First of all click on the deployed stake contract on the   sidebar and if they are none click on deploy new stake contract
            </p>
            <p className="flex flex-inline">
            <Minus fontSize='20px' style={{marginTop: "10px", marginRight: "10px"}}/>
           Then you should see the stake contract page as below
            </p>
           <Image className="p-4" src={description} alt="stake-page" height={900}/>
           <p className="ml-16 p-3">
            The first component tells us if the stake is open or closed <br></br>
            The next one tells us how long before the stake is closed
            <br></br>
            The next tells us the total amount staked against the threshold set 
            <br></br>
            Next the deposit button - input the amount you want to stake and click deposit 
            <br></br>
            Once the time limit has expired click the withdraw function 
            to withdraw your Eth
            <br></br>
            Lastly we have the table displaying the stakers address and amount staked
           </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
