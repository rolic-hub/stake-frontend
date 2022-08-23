//import { Button } from "@web3uikit/core";
import SideBar from "./SideBar";
import {Minus} from '@web3uikit/icons'
import Image from 'next/image'
import description from "../src/assests/description.png"


export default function Layout() {
  return (
    <div>
      <SideBar />
      <div className="h-11">

      </div>
      <div
        className="flex h-screen lg:w-2/3 md:w-1/2 ml-auto mr-16 "
        style={{ marginTop: "-870px" }}
      >
        <div className="lg:mt-16 md:mt-24 text-center pl-24 pr-24 absolute">
          <h1 className="text-2xl p-2 font-bold">About</h1>
          <p>
            The Staketh is a simple staking protocol currently on the ethereum 
            blockchain it allows users to stake their Eth and gain interest
            based on if the total staked is above or equal to the threshold.
            connect your wallet and deposit to stake.
            <br></br>
            Supported chain - rinkeby test net
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
           <p className="ml-5 p-3">
            The first component tells us if the stake is open or closed,
            the next one tells us how long before the stake is closed
            <br></br>
            Then we have the total amount staked against the threshold set, 
            followed by the deposit button, first input the amount you want to stake before clicking the deposit 
            <br></br>
            Once the time limit has expired click the withdraw function 
            to withdraw your Eth,
            Lastly we have the table displaying the stakers address and amount staked
           </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
