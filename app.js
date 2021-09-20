// const env = "test";
// const chainId = 256;
// const mainSymbol = "HT";
// const etherscanUrl = "https://testnet.hecoinfo.com";
// const contractAddress = "0xf3d9ffd38dec872d66ff23382927de87a029a43c";

const env = "mainnet";
const chainId = 42161;
const mainSymbol = "ETH";
const etherscanUrl = "https://arbiscan.io";
const contractAddress = "0x796aa66f965a663016efd6731f4724c0a8e80314";

const price = 0.05;

const chainId0X = "0xa4b1";
const chainName = "ARBITRUM Mainnet";
const rpcUrls = "https://arb1.arbitrum.io/rpc";

const testChainId0X = "0x100";
const testChainName = "HT Testnet";
const testRpcUrls = "https://http-testnet.huobichain.com";



let provider = null;
let accountAddress;

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenId",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "_tokenURI",
        type: "string[]",
      },
    ],
    name: "addTokenId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getCidByTokenId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintPrice_",
        type: "uint256",
      },
    ],
    name: "setMintPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.onload = () => {
  var animateButton = function (e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };
  document.getElementById("subContent-info").innerHTML = `Only 100 collectible ArbiPunk on #Arbitrum. <br />here are no bonding curves here. Buying an Arbipunk costs 0.05 ${mainSymbol}. There are no price tiers.`
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
  }

  window?.ethereum?.on("disconnect", () => {
    window.location.reload();
  });

  window?.ethereum?.on("networkChanged", () => {
    window.location.reload();
  });

  window?.ethereum?.on("chainChanged", () => {
    window.location.reload();
  });

  const connectWallet = async () => {
    await window.ethereum.enable();
    if (Number(window.ethereum.chainId) !== chainId) {
      return failedConnectWallet();
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts");
    accountAddress = accounts[0];
    document.getElementById("address-button").innerHTML = `${accountAddress.slice(0, 4)}...${accountAddress.slice(accountAddress.length - 4, accountAddress.length)}`;
    document.getElementById("copy-button").innerHTML = "COPY LINK";

    const inputValuePC = document.getElementById("amount-input").value;
    const inputValueMobile = document.getElementById("amount-input-mobile").value;
    const inputValue = inputValuePC || inputValueMobile;
    var mintBtnText = `MINT (${Number(inputValue) ? price * Number(inputValue) : price} ${mainSymbol})`;
    console.debug("mintBtnText", mintBtnText);
    document.getElementById("mint-button").innerHTML = mintBtnText;
    document.getElementById("mint-button-mobile").innerHTML = mintBtnText;
  };

  const failedConnectWallet = () => {
    document.getElementById("address-button").innerHTML = "Error Network";
  };

  const getTotalPrice = (price,inputValue)=>{
    return new Decimal(inputValue).mul(price).toString();
  } 

  const switchNetwork = async () => {
    if (env === "test") {
      window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: testChainId0X,
              chainName: testChainName,
              nativeCurrency: {
                name: testChainName,
                symbol: mainSymbol,
                decimals: 18,
              },
              rpcUrls: [testRpcUrls],
              blockExplorerUrls: [etherscanUrl],
            },
          ],
        })
        .then(() => {
          connectWallet();
        })
        .catch(() => {
          failedConnectWallet();
        });
    } else {
      window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId0X,
              chainName: chainName,
              nativeCurrency: {
                name: mainSymbol,
                symbol: mainSymbol,
                decimals: 18,
              },
              rpcUrls: [rpcUrls],
              blockExplorerUrls: [etherscanUrl],
            },
          ],
        })
        .then(() => {
          connectWallet();
        })
        .catch(() => {
          failedConnectWallet();
        });
    }
  };

  connectWallet();

  const handleMint = async () => {
    $.toast().reset("all");
    if (!provider) {
      connectWallet();
    } else {
      const inputValue = document.getElementById("amount-input").value;
      try {
        document.getElementById("mint-button").innerHTML = "Minting...";
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        if (!inputValue || Math.round(inputValue) !== Number(inputValue)) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Enter an integer！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        } else if (Number(inputValue) > 10) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Max amount 10！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        }
        const ImageContract = new ethers.Contract(contractAddress, abi, signer);
        const amountRaw = ethers.utils.parseUnits(`${price * Number(inputValue)}`, 18).toString();
        const balanceRaw = await provider.getBalance(account);
        const balance = ethers.utils.formatUnits(balanceRaw, 18);
        if (Number(balance) < price * inputValue) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Insufficient balance！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        const estimateGas = await ImageContract.estimateGas.claim(inputValue, {
          value: amountRaw,
        });
        const gasLimit = Math.floor(estimateGas.toNumber() * 2);

        const response = await ImageContract.claim(inputValue, {
          value: amountRaw,
          gasLimit,
        });
        $.toast({
          heading: "Minting",
          text: "Start to minting！",
          position: "top-center",
          showHideTransition: "fade",
          hideAfter: 10000,
          icon: "info",
        });
        const result = await response.wait();
        $.toast().reset("all");
        $.toast({
          heading: "Success",
          text: "Minted Success!",
          showHideTransition: "slide",
          position: "top-center",
          icon: "success",
        });
        document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
        window.open(`${etherscanUrl}/token/${contractAddress}?a=${accountAddress}`);
      } catch (e) {
        console.error("e", e);
        document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
        if (e?.data?.message?.includes("Token is not enough")) {
          return $.toast({
            heading: "Error",
            text: "Token is not enough！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        $.toast({
          heading: "Error",
          text: "Please try again！",
          showHideTransition: "fade",
          position: "top-center",
          icon: "error",
        });
      }
    }
  };

  const handleCopy = () => {
    if (!provider) {
      switchNetwork();
    } else {
      navigator.clipboard.writeText(window.location.href).then(
        function () {
          document.getElementById("copy-button").innerHTML = "COPIED";
          setTimeout(() => {
            document.getElementById("copy-button").innerHTML = "COPY LINK";
          }, 2000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    }
  };

  const handleMintMobile = async () => {
    $.toast().reset("all");
    if (!provider) {
      connectWallet();
    } else {
      try {
        var inputValue = document.getElementById("amount-input-mobile").value;
        document.getElementById("mint-button-mobile").innerHTML = "Minting...";
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        if (!inputValue || Math.round(inputValue) !== Number(inputValue)) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Enter an integer！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        } else if (Number(inputValue) > 10) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Max amount 10！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        }
        const ImageContract = new ethers.Contract(contractAddress, abi, signer);
        const amountRaw = ethers.utils.parseUnits(`${price * Number(inputValue)}`, 18).toString();
        const balanceRaw = await provider.getBalance(account);
        const balance = ethers.utils.formatUnits(balanceRaw, 18);
        if (Number(balance) < price * inputValue) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
          return $.toast({
            heading: "Error",
            text: "Insufficient balance！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        const estimateGas = await ImageContract.estimateGas.claim(inputValue, {
          value: amountRaw,
        });
        const gasLimit = Math.floor(estimateGas.toNumber() * 2);

        const response = await ImageContract.claim(inputValue, {
          value: amountRaw,
          gasLimit,
        });
        $.toast({
          heading: "Minting",
          text: "Start to minting！",
          position: "top-center",
          showHideTransition: "fade",
          hideAfter: 10000,
          icon: "info",
        });
        const result = await response.wait();
        $.toast().reset("all");
        $.toast({
          heading: "Success",
          text: "Minted Success!",
          showHideTransition: "slide",
          position: "top-center",
          icon: "success",
        });
        document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
        window.open(`${etherscanUrl}/${result.transactionHash}`);
      } catch (e) {
        console.error("e", e);
        document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
        if (e?.data?.message?.includes("Token is not enough")) {
          return $.toast({
            heading: "Error",
            text: "Token is not enough！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        $.toast({
          heading: "Error",
          text: "Please try again！",
          showHideTransition: "fade",
          position: "top-center",
          icon: "error",
        });
      }
    }
  };

  document.getElementById("address-button").addEventListener("click", switchNetwork);
  document.getElementById("switch-button").addEventListener("click", switchNetwork);

  document.getElementById("copy-button").addEventListener("click", handleCopy);

  document.getElementById("mint-button").addEventListener("click", handleMint);
  document.getElementById("mint-button-mobile").addEventListener("click", handleMintMobile);

  $("#amount-input").on("input propertychange", () => {
    var inputValue = document.getElementById("amount-input").value;
    document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
    document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
    document.getElementById("amount-input-mobile").value = inputValue;
  });
  $("#amount-input-mobile").on("input propertychange", () => {
    var inputValue = document.getElementById("amount-input-mobile").value;
    document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
    document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? getTotalPrice(price,inputValue) : price} ${mainSymbol})`;
    document.getElementById("amount-input").value = inputValue;
  });
};
