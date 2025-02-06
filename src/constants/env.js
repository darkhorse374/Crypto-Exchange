// export const SERVER_URL = "https://mglcoin.io/api/"
// export const SERVER_URL = "http://10.10.12.157:5000/api/"
export const SERVER_URL = "http://localhost:5000/api/"


export const networks=[
  {
    name:"Mainnet (Polygon)",
    url:"polygon-mainnet",
    explorer:"https://polygonscan.com/",
    routerAddr:"0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    baseTokenAddr:"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    usdAddr:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    usdDecimal:6,
    chainId:'137',
  },
  {name:"Tesnet (Polygon)",url:"polygon-testnet",explorer:"https://mumbai.polygonscan.com/"},
  {
    name:"Mainnet (BSC)",
    url:"bsc-mainnet",
    explorer:"https://bscscan.com/",
    routerAddr:"0x10ED43C718714eb63d5aA57B78B54704E256024E",
    baseTokenAddr:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    usdAddr:"0xe9e7cea3dedca5984780bafc599bd69add087d56",
    usdDecimal:18,
    chainId:'56',
  },
  {name:"Tesnet (BSC)",url:"bsc-testnet",explorer:"https://testnet.bscscan.com/"},
]
