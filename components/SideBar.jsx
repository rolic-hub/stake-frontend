import { Button, useNotification } from "@web3uikit/core";
import Link from "next/link";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Abi from "../constants/Abi/stakeFactory.json";
import contractAdrresses from "../constants/contractAddresses/stakeFactory";
import { useState, useEffect } from "react";

export default function SideBar() {
  const [stakeContract, setStakeContract] = useState([]);
  const {
    isAuthenticated,
    isWeb3Enabled,
    authenticate,
    Moralis,
    chainId: chainIdHex,
  } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const addressses = contractAdrresses[chainId]["contract"];
  //const addressses = "0xd79b1585531e57A8d239ADc5262398279b4F5c91";
  const dispatch = useNotification();

  const loadContract = async (stakeFactoryAddress) => {
    //await Moralis.authenticate;
    const getNoofStakeAddress = await Moralis.executeFunction({
      abi: Abi.abi,
      contractAddress: stakeFactoryAddress, //
      functionName: "getNoofStakers",
    });
    let stakeAddress = [];
    const noOfStakeAddress = getNoofStakeAddress.toString();
    for (let index = 0; index < noOfStakeAddress; index++) {
      const stakeAddresses = await Moralis.executeFunction({
        abi: Abi.abi,
        contractAddress: stakeFactoryAddress, //
        functionName: "getStakeAddresses",
        params: {
          _index: index,
        },
      });

      const stakeAddressB = stakeAddresses.toString();
      stakeAddress.push(stakeAddressB);
      setStakeContract(stakeAddress);
    }
  };

  const {
    runContractFunction: createStakeContract,
    data,
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
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSucess = async () => {
    await tx.wait(1);
    handleNewNotification();
    await loadContract();
  };

  useEffect(() => {
    const load = async () => {
      await loadContract(addressses);
    };
    if (isAuthenticated || isWeb3Enabled) {
      load();
    } else {
      login();
    }
    console.log(chainIdHex);
  }, []);
  return (
    <>
      <div className="flex mt-24">
        <div className="w-96 h-screen border-r border-black p-10">
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

          <div className="mt-10  ">
            <h2
              className="bg-slate-500 border-b border-black text-2xl flex flex-row justify-center w-80 leading-normal items-center hover:bg-slate-700"
              style={{ marginLeft: "-15px" }}
            >
              Deployed Stake Contracts
            </h2>
            {isAuthenticated || isWeb3Enabled ? (
              <div>
                {stakeContract.map((address) => {
                  <Link href={`/stake-contract/${address}`}>{address}</Link>;
                })}
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
