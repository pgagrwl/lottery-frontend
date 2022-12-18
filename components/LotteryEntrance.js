import { useWeb3Contract } from "react-moralis"

import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")

    // const { runContractFunction: enterLottery } = useWeb3Contract({
    //     abi : abi,
    //     contractAddress : contractAddress ,
    //     functionName: enterLottery ,
    //     params : {},
    //     msgValue:
    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                // const entranceFeeFromCall = await getEntranceFee()
                // console.log(entranceFeeFromCall)
                const entranceFeeFromCall = await getEntranceFee()
                // console.log(getEntranceFee())
                // const recentWinnerFromCall = await getRecentWinner()
                setEntranceFee(entranceFeeFromCall)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Entrance Fee is <div>{entranceFee}</div>
        </div>
    )
}
