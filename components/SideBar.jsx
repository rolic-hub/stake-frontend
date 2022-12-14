import { Button, useNotification } from "@web3uikit/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Abi from "../constants/Abi/stakeFactory.json";
import { contractAdrresses } from "../constants/contractAddresses/stakeFactory";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { sendEtagResponse } from "next/dist/server/send-payload";

export default function SideBar() {
  const [stakeContract, setStakeContract] = useState([]);
  const [unstoppable, setUnstoppable] = useState(null);
  const {
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    authenticate,
    Moralis,
    chainId: chainIdHex,
  } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const addressses = contractAdrresses[4].contract;

  const dispatch = useNotification();
  const router = useRouter();

  const loadContract = async (stakeFactoryAddress, ethprovider) => {
    const provider = new ethers.providers.Web3Provider(ethprovider)
    const signer = await provider.getSigner()
   const contractInstance = new ethers.Contract(stakeFactoryAddress, Abi.abi, signer)
   
    const getNoofStakeAddress = await contractInstance.getNoofStakers()
    let stakeAddressArray = [];

    const noOfStakeAddress = getNoofStakeAddress.toString();
  
    for (let index = 0; index < noOfStakeAddress; index++) {
    const stakeAddresses = await contractInstance.getStakeAddresses(index)
      const stakeAddressB = stakeAddresses.toString();
      stakeAddressArray.push(stakeAddressB);

      //console.log(stakeAddressArray);
    }
    setStakeContract(stakeAddressArray);
  };
  const handleClick = (urlinput) => {
    router.push(urlinput);
  };

  const {
    runContractFunction: createStakeContract,
    data: tx,
    isFetching,
  } = useWeb3Contract({
    abi: Abi.abi,
    contractAddress: addressses,
    functionName: "createStake",
    params: {},
  });
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log into stake App" }).catch(
        function (error) {
          console.log(error);
        }
      );
    }
  };

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Created new stake contract",
      title: "Transaction Notification",
      position: "topR",
      //icon: "bell",
    });
  };

  const handleSucess = async (tx) => {
    await tx.wait(1);
    handleNewNotification();
    await loadContract(addressses);
  };

  useEffect(() => {
    const unstoppable = localStorage.getItem("unstoppable");
    setUnstoppable(unstoppable);
    if (isAuthenticated || isWeb3Enabled || unstoppable !== null) {
      loadContract(addressses, window.ethereum);
    }
  }, [isAuthenticated, isWeb3Enabled, addressses]);
  return (
    <>
      <div className="flex mt-24 h-screen">
        <div className="w-96 h-full border-r border-black p-10">
          <Button
            style={{ marginTop: "20px" }}
            text={
              isFetching ? (
                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
              ) : (
                "Deploy New Stake Contract"
              )
            }
            theme="outline"
            size="large"
            disabled={isFetching}
            onClick={async () => {
              await createStakeContract({
                onSuccess: handleSucess,
                onError: (error) => {
                  console.log(error);
                },
              });
            }}
          />

          <div className="mt-10">
            <h2
              className="bg-slate-500 border-b border-black text-2xl flex flex-row justify-center w-80 leading-normal items-center hover:bg-slate-700"
              style={{ marginLeft: "-15px" }}
            >
              Deployed Stake Contracts
            </h2>
            {isAuthenticated || isWeb3Enabled || unstoppable !== null ? (
              <div className="p-3 pt-5">
                {stakeContract.map((address) => (
                  <div className="p-2" key={address}>
                    <Link href={`/stake-contract/${address}`}>
                      <a
                        onClick={() =>
                          handleClick(`/stake-contract/${address}`)
                        }
                        className="text-xl font-bold hover:text-sky-900"
                      >
                        {address.slice(0, 10)}....{address.slice(32, 42)}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>Connect Wallet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
