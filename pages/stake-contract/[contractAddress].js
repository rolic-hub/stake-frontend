import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
//import Abi from "../../constants/Abi/stakeFactory.json";
import AbiStake from "../../constants/Abi/stake.json";
import { ethers } from "ethers";
import { Button, Input, Table, useNotification } from "@web3uikit/core";
import { Blockie } from "@web3uikit/web3";
import { ArrowCircleLeft } from "@web3uikit/icons";

export default function Contract() {
  const [stakersN, setStakersN] = useState([]);
  const [thresholdA, setThreshold] = useState(0);
  const [totalStaked, setTotalstaked] = useState(0);
  const [deadlineT, setDeadline] = useState({
    dy: "00",
    hr: "00",
    mins: "00",
    secs: "00",
  });
  const [depositInput, setDepositInput] = useState(0);
  const [stakeSet, setStakeset] = useState(null);
  const [stakeApp, setStakeApp] = useState("");
  const [cssStakestate, setCssstate] = useState("font-bold");
  const [stakersBalance, setStakersbalance] = useState([]);
  const [unstoppable, setunstoppable] = useState(null);
  const router = useRouter();
  const { contractAddress } = router.query;
  const { Moralis, authenticate, isAuthenticated, isWeb3Enabled } =
    useMoralis();
  let intervalno = useRef();

  const dispatch = useNotification();

  const { runContractFunction: depositFunction, isFetching } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "deposit",
    msgValue: ethers.utils.parseEther(depositInput.toString() || "0"),
    params: {},
  });
  const {
    runContractFunction: withdrawFunction,
    data,
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
  const listOfStakers = async (contractA, ethprovider) => {
    //const options = {abi: AbiStake.abi,  }
    const provider = new ethers.providers.Web3Provider(ethprovider);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractA,
      AbiStake.abi,
      signer
    );
    const stakeLenght = await contractInstance.getStakelength();
    const stakers = stakeLenght.toString();
    let stakersArray = [];

    for (let index = 0; index < stakers; index++) {
      const staker = await contractInstance.getStaker(index);

      const stakerA = staker.toString();
      if (stakersArray.includes(stakerA)) {
        // console.log("already added");
      } else {
        stakersArray.push(stakerA);
      }
    }
    setStakersN(stakersArray);

    let balanceArray = [];

    stakersArray.forEach(async (element) => {
      const balanceStaker = await contractInstance.getStakersBalance(element);
      const balanceString = balanceStaker.toString();
      if (balanceArray.includes(balanceString)) {
        // console.log("already added");
      } else {
        balanceArray.push(balanceString);
      }
    });
    //console.log(balanceArray)
    setStakersbalance(balanceArray);
  };

  const { runContractFunction: timeLeft } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "getDeadline",
    params: {},
  });
  const { runContractFunction: stakeState } = useWeb3Contract({
    abi: AbiStake.abi,
    contractAddress: contractAddress,
    functionName: "_stakeState",
    params: {},
  });

  const handleNewNotification = (messageT) => {
    dispatch({
      type: "info",
      message: messageT,
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleDepositSucess = async (txReciept) => {
    const message = "staking sucessful!";
    await txReciept.wait(1);
    handleNewNotification(message);
    await viewFunctionResults();
  };

  const handleWithdrawSucess = async (tx) => {
    const message = "withdrawal sucessful!";
    await tx.wait(1);
    handleNewNotification(message);
    await viewFunctionResults();
  };

  const viewFunctionResults = async () => {
    const getThreshold = (await threshold()).toString();
    const getTotalstake = (await totalStake()).toString();
    const deadline = (await timeLeft()).toString();
    const _stakeStake = (await stakeState()).toString();

    setThreshold(getThreshold);
    setTotalstaked(getTotalstake);
    setStakeset(_stakeStake);
    stateOfstake();
    setTimer(deadline);
  };

  const setTimer = (deadline) => {
    intervalno = setInterval(() => {
      const now = new Date();
      const nowInSeconds = now.getTime();
      const timeR = deadline * 1000;

      const finalT = new Date(nowInSeconds + timeR);

      //console.log(finalT);
      const finalTseconds = finalT.getTime();

      const distance = finalTseconds - nowInSeconds;
      const days = Math.floor((distance / (1000 * 60 * 60 * 24)) % 30);
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setDeadline({ dy: days, hr: hours, mins: minutes, secs: seconds });
      if (distance < 0) {
        clearInterval(intervalno.current);

        setDeadline({ dy: "00", hr: "00", mins: "00", secs: "00" });
      }
    }, 1000);
  };

  const stateOfstake = () => {
    if (stakeSet == 0) {
      setStakeApp("Stake is Closed");
      setCssstate("font-bold text-red-600");
    } else if (stakeSet == 1) {
      setStakeApp("Stake is open");
      setCssstate("font-bold text-green-600");
    } else if (stakeSet == 2 || stakeSet == 3) {
      setStakeApp("withdrawal in progress....");
      setCssstate("font-bold text-blue-600");
    }
  };
  const moveBack = () => {
    router.push("/");
  };

  useEffect(() => {
    if (isAuthenticated || isWeb3Enabled) {
      listOfStakers(contractAddress, window.ethereum);
      viewFunctionResults();
    }
  }, [isAuthenticated, isWeb3Enabled, contractAddress]);
  useEffect(() => {
    const unstoppable = localStorage.getItem("unstoppable");
    setunstoppable(unstoppable);
    stateOfstake();
  }, [stakeSet]);

  // useEffect(() => {
  //   const startTimer = async() => {
  //     const deadline = await timeLeft().catch((error) => {
  //       console.log(error)
  //     })
  //     setTimer(deadline)
  //   }
  //  startTimer()

  // }, [])

  return (
    <div>
      <Navbar />
      <div>
        <SideBar />
        <div
          className="flex h-screen w-2/3 ml-auto"
          style={{ marginTop: "-830px" }}
        >
          <ArrowCircleLeft
            onClick={moveBack}
            style={{ marginTop: "70px" }}
            fontSize="50px"
          />
          {isAuthenticated || isWeb3Enabled || unstoppable !== null ? (
            <div className="mt-28 text-center pl-24 pr-24">
              <p className={cssStakestate}>{stakeApp}</p>
              {stakeSet == 0 ? (
                <p></p>
              ) : (
                <p className="mt-8 font-bold">
                  <span>
                    {deadlineT.dy}d {deadlineT.hr}hr {deadlineT.mins}m{" "}
                    {deadlineT.secs}s
                  </span>{" "}
                  Left
                </p>
              )}

              <p className="mt-8 ml-4 text-xl">
                {ethers.utils.formatUnits(totalStaked, 18)} Eth /{" "}
                {ethers.utils.formatUnits(thresholdA, 18)} Eth
                <p>Amount staked (Eth) / Threshold (Eth) </p>
              </p>
              <div className="flex flex-row p-10">
                <Button
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  text={
                    isFetching ? (
                      <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                    ) : (
                      "Make deposit"
                    )
                  }
                  theme="colored"
                  color="red"
                  size="large"
                  disabled={isFetching || stakeSet == 0}
                  onClick={async () => {
                    await depositFunction({
                      onSuccess: handleDepositSucess,
                      onError: (error) => {
                        console.log(error);
                      },
                    });
                  }}
                />
                <Input
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  name="Eth Amount"
                  placeholder="Input amount to stake in (ETH)"
                  type="number"
                  onChange={(event) => {
                    setDepositInput(event.target.value);
                  }}
                />
              </div>
              <Button
                style={{ marginTop: "3px", marginLeft: "50px" }}
                text={
                  isLoading ? (
                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                  ) : (
                    "Withdraw stake"
                  )
                }
                theme="primary"
                size="large"
                disabled={isLoading}
                onClick={async () => {
                  await withdrawFunction({
                    onSuccess: handleWithdrawSucess,
                    onError: (error) => {
                      console.log(error);
                    },
                  });
                }}
              />
              <div className="mt-12 ml-8">
                {stakersN.length > 0 ? (
                  <Table
                    columnsConfig="250px 1fr"
                    data={[
                      [
                        <span>
                          {stakersN.map((address) => (
                            <p key={address} className="flex p-3 ">
                              <Blockie seed={address} />
                              <p className="ml-4">
                                {address.slice(0, 5)}...{address.slice(37, 42)}
                              </p>
                            </p>
                          ))}
                        </span>,
                        <span>
                          {stakersBalance.map((balance) => (
                            <p key={balance} className="p-3">
                              {ethers.utils.formatUnits(balance, 18)} Eth
                            </p>
                          ))}
                        </span>,
                      ],
                    ]}
                    header={[
                      <span>Address of staker</span>,
                      <span>Amount Staked</span>,
                    ]}
                    justifyCellItems="center"
                    isColumnSortable={[false, true]}
                    maxPages={2}
                    onRowClick={function noRefCheck() {}}
                    pageSize={3}
                  />
                ) : (
                  <div className="text-xl mt-8 ml-4">No Stake has been made</div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center pl-24 pr-24">
              Web3 Not Enabled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
