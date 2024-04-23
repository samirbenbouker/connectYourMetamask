import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from "next/image";

import imageEth from "../public/ether_logo.png"
import creator from "../public/creator.png"

const Home = () => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [connect, setConnect] = useState(false);
    const [balance, setBalance] = useState('');

    const FAIL_MESSAGE = "Please install Metamask & connect your Metamask"

    const PROVIDER = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

    // will check if client have installed metamask or similary application using eth blockchain
    const checkIfWalletConnected = async () => {
        if (typeof window !== "undefined") {
            if (!window.ethereum) return

            // if have metamask installed will get him account
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            console.log(accounts)

            // user can have more than 1 account will get the first one
            // if dont have any account will return a fail message
            if (accounts.length) setCurrentAccount(accounts[0])
            else console.log(FAIL_MESSAGE)

            const ETHERSCAN_SBI_MINNER_ADDRESS = "0x8B4de256180CFEC54c436A470AF50F9EE2813dbB"
            const balance = await PROVIDER.getBalance(ETHERSCAN_SBI_MINNER_ADDRESS)
            const balanceInETH = `${ethers.formatEther(balance)} ETH\n`
            setBalance(balanceInETH)
        }

    }

    const CWallet = async () => {
        if (typeof window !== "undefined") {
            if (!window.ethereum) console.log(FAIL_MESSAGE)

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(accounts[0])

            window.location.reload()
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    })

    useEffect(() => {
        async function accountChanged() {
            window.ethereum.on("accountsChanged", async function () {
                const accounts = await window.ethereum.request({ method: "eth_accounts" })

                if (accounts.length) setCurrentAccount(accounts[0])
                else window.location.reload()
            })
        }

        accountChanged()
    }, [])

    return (
        <div className="card-container">
            {!currentAccount ? "" : <span className="pro">PRO</span>}

            <Image src={creator} alt="profile" width={80} height={80} />
            <h3>Check Ether</h3>

            {
                !currentAccount
                    ? (
                        <div>
                            <div className="message">
                                <p>{FAIL_MESSAGE}</p>
                            </div>
                            <Image src={imageEth} alt="ether" width={100} height={100} />
                            <p>Welcome to ether account balance checker</p>
                        </div>
                    )
                    : (
                        <div>
                            <h6>
                                Verified <span className="tick">&#10004;</span>
                            </h6>
                            <Image src={imageEth} alt="ether" width={100} height={100} />
                            <p>Ether account and balance checker <br /> find account details</p>
                            <div className="buttons">
                                <button className="primary ghost" onClick={() => { }}>
                                    Ether account details
                                </button>
                            </div>
                        </div>
                    )
            }

            {
                !currentAccount && !connect
                    ? (
                        <div className="buttons">
                            <button className="primary" onClick={() => CWallet()}>Connect Wallet</button>
                        </div>
                    )
                    : <div className="skills">
                        <h6>Your Eth</h6>
                        <ul>
                            <li>Account</li>
                            <li>{currentAccount.substring(0, 4)}...{currentAccount.slice(-4)}</li>
                            <br />
                            <li>Balance</li>
                            <li>{balance}</li>
                        </ul>
                    </div>
            }

        </div>
    )
}

export default Home;