"use client";

import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi"; // Added useBalance
import Pool from "./_components/Pool";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PoolsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { address: connectedAccount } = useAccount();
    
    // Added to fetch ETH balance
    const { data: ethBalanceData } = useBalance({
        address: connectedAccount,
    });

    // Get contract info for all pools and tokens
    const { data: ETHTokenAPoolInfo } = useDeployedContractInfo({ contractName: "ETHTokenAPool" });
    const { data: ETHTokenBPoolInfo } = useDeployedContractInfo({ contractName: "ETHTokenBPool" });
    const { data: TokenATokenBPoolInfo } = useDeployedContractInfo({ contractName: "TokenATokenBPool" });
    const { data: TokenAInfo } = useDeployedContractInfo({ contractName: "TokenA" });
    const { data: TokenBInfo } = useDeployedContractInfo({ contractName: "TokenB" });

    // Read user token balances
    const { data: userTokenABalance } = useScaffoldReadContract({
        contractName: "TokenA",
        functionName: "balanceOf",
        args: [connectedAccount],
    });

    const { data: userTokenBBalance } = useScaffoldReadContract({
        contractName: "TokenB",
        functionName: "balanceOf",
        args: [connectedAccount],
    });

    // Read user liquidity positions
    const { data: userETHTokenALiquidity } = useScaffoldReadContract({
        contractName: "ETHTokenAPool",
        functionName: "getLiquidity",
        args: [connectedAccount],
    });

    const { data: userETHTokenBLiquidity } = useScaffoldReadContract({
        contractName: "ETHTokenBPool",
        functionName: "getLiquidity",
        args: [connectedAccount],
    });

    const { data: userTokenATokenBLiquidity } = useScaffoldReadContract({
        contractName: "TokenATokenBPool",
        functionName: "getLiquidity",
        args: [connectedAccount],
    });

    useEffect(() => {
        if (
            ethBalanceData && // Added ETH balance check
            ETHTokenAPoolInfo &&
            ETHTokenBPoolInfo &&
            TokenATokenBPoolInfo &&
            TokenAInfo &&
            TokenBInfo &&
            userTokenABalance !== undefined &&
            userTokenBBalance !== undefined &&
            userETHTokenALiquidity !== undefined &&
            userETHTokenBLiquidity !== undefined &&
            userTokenATokenBLiquidity !== undefined
        ) {
            setIsLoading(false);
        }
    }, [
        ethBalanceData, // Added to dependency array
        ETHTokenAPoolInfo,
        ETHTokenBPoolInfo,
        TokenATokenBPoolInfo,
        TokenAInfo,
        TokenBInfo,
        userTokenABalance,
        userTokenBBalance,
        userETHTokenALiquidity,
        userETHTokenBLiquidity,
        userTokenATokenBLiquidity
    ]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-4xl font-bold mb-8">Swap Pools</h1>
                <p className="text-xl">Loading pools data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Swap Pools</h1>

            <div className="bg-base-200 p-4 rounded-lg mb-8">
                <h2 className="text-2xl font-medium mb-4">Your Balances</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-base-100 p-4 rounded-lg text-center">
                        <p className="text-lg font-medium">ETH</p>
                        <p className="text-lg">
                            <span className="text-xl">💰</span> {ethBalanceData ? parseFloat(ethBalanceData.formatted).toFixed(4) : "0.0000"} ETH
                        </p>
                    </div>
                    <div className="bg-base-100 p-4 rounded-lg text-center">
                        <p className="text-lg font-medium">TokenA (TKA)</p>
                        <p className="text-lg">
                            <span className="text-xl">🔴</span> {parseFloat(formatEther(userTokenABalance || 0n)).toFixed(4)} TKA
                        </p>
                    </div>
                    <div className="bg-base-100 p-4 rounded-lg text-center">
                        <p className="text-lg font-medium">TokenB (TKB)</p>
                        <p className="text-lg">
                            <span className="text-xl">🔵</span> {parseFloat(formatEther(userTokenBBalance || 0n)).toFixed(4)} TKB
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <Pool
                    poolName="ETHTokenAPool"
                    poolType="eth-token"
                    poolAddress={ETHTokenAPoolInfo?.address || ""}
                    tokenAName="TokenA"
                    tokenAAddress={TokenAInfo?.address || ""}
                    userTokenABalance={userTokenABalance || 0n}
                    userLiquidity={userETHTokenALiquidity || 0n}
                />

                <Pool
                    poolName="ETHTokenBPool"
                    poolType="eth-token"
                    poolAddress={ETHTokenBPoolInfo?.address || ""}
                    tokenAName="TokenB"
                    tokenAAddress={TokenBInfo?.address || ""}
                    userTokenABalance={userTokenBBalance || 0n}
                    userLiquidity={userETHTokenBLiquidity || 0n}
                />

                <Pool
                    poolName="TokenATokenBPool"
                    poolType="token-token"
                    poolAddress={TokenATokenBPoolInfo?.address || ""}
                    tokenAName="TokenA"
                    tokenAAddress={TokenAInfo?.address || ""}
                    tokenBName="TokenB"
                    tokenBAddress={TokenBInfo?.address || ""}
                    userTokenABalance={userTokenABalance || 0n}
                    userTokenBBalance={userTokenBBalance || 0n}
                    userLiquidity={userTokenATokenBLiquidity || 0n}
                />
            </div>
        </div>
    );
};

export default PoolsPage;