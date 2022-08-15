import { Button, useNotification } from "@web3uikit/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Abi from "../constants/Abi/stakeFactory.json";
import { contractAdrresses } from "../constants/contractAddresses/stakeFactory";
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
  const addressses = contractAdrresses[31337].contract;

  const dispatch = useNotification();
  const router = useRouter();

  const loadContract = async (stakeFactoryAddress) => {
    //await Moralis.authenticate;
    const getNoofStakeAddress = await Moralis.executeFunction({
      abi: Abi.abi,
      contractAddress: stakeFactoryAddress, //
      functionName: "getNoofStakers",
    });
    let stakeAddressArray = [];
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
      stakeAddressArray.push(stakeAddressB);
      setStakeContract(stakeAddressArray);
      //console.log(stakeAddressArray);
    }
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
      icon: "bell",
    });
  };

  const handleSucess = async (tx) => {
    await tx.wait(1);
    handleNewNotification();
    await loadContract(addressses);
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
  }, [isAuthenticated, isWeb3Enabled, ]);
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

          <div className="mt-10">
            <h2
              className="bg-slate-500 border-b border-black text-2xl flex flex-row justify-center w-80 leading-normal items-center hover:bg-slate-700"
              style={{ marginLeft: "-15px" }}
            >
              Deployed Stake Contracts
            </h2>
            {isAuthenticated || isWeb3Enabled ? (
              <div className="p-3 pt-5">
                {stakeContract?.map((address) => (
                  <div key={address}>
                    <Link href={`/stake-contract/${address}`}>
                      <a className="text-xl font-bold hover:text-sky-900">{address.slice(0,10)}....{address.slice(32,42)}</a>
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
