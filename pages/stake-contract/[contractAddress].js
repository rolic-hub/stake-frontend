import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
//import Abi from "../../constants/Abi/stakeFactory.json";
import AbiStake from "../../constants/Abi/stake.json";
import { ethers } from "ethers";

export default function Contract() {
  const [stakersN, setStakersN] = useState([]);
  const router = useRouter();
  const { contractAddress } = router.query;
  const { Moralis, authenticate, isAuthenticated, isWeb3Enabled } =
    useMoralis();

  const {
    runContractFunction: depositFunction,
    data,
    isFetching,
  } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "deposit",
    msgValue: ethers.utils.parseEther("2"),
    params: {},
  });
  const {
    runContractFunction: withdrawFunction,
    data: tx,
    isFetching: isLoading,
  } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "withdraw",
    params: {},
  });
  const { runContractFunction: threshold } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "getThreshold",
    params: {},
  });
  const { runContractFunction: totalStake } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "getAmountStaked",
    params: {},
  });
  const listOfStakers = async () => {
    //const options = {abi: AbiStake.abi,  }
    const stakeLenght = await Moralis.executeFunction({
      functionName: "getStakelength",
      contractAddress: contractAddress,
      abi: AbiStake.abi,
    });
    const stakers = stakeLenght.toString();
    let stakersArray = [];

    for (let index = 0; index < stakers; index++) {
      const staker = await Moralis.executeFunction({
        functionName: "getStaker",
        contractAddress: contractAddress,
        abi: AbiStake.abi,
        params: {
          _index: index,
        },
      });
      const stakerA = staker.toString();
      stakersArray.push(stakerA);
      setStakersN(stakersArray);
    }
  };

  const { runContractFunction: timeLeft } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "getDeadline",
    params: {},
  });

  const { runContractFunction: stakersBalance } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "balances",
    params: {
      address: "222",
    },
  });

  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <SideBar />
      <div>
        <div className="flex h-screen"></div>
      </div>
    </>
  );
}
