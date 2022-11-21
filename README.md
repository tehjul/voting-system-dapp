# Voting system dApp - React & Web3.js

![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)

![https://github.com/tehjul](https://img.shields.io/badge/Compiler-0.8.17-blue?style=plastic)

## ***About***

Contract deployed on goerli at address [0x0A0880681789FBEeA6f11Ba911CEA4A8e74Fe616](https://goerli.etherscan.io/address/0x0a0880681789fbeea6f11ba911cea4a8e74fe616).

Online dApp available [here](https://voting-system-dapp.vercel.app/).
Current owner is 0xdFCB30B9E7EF4384cEE523664DA13B2e8B9e4169. Please send a message with your public Ethereum address to tehjul#3453 on discord so I can transfer ownership to you.

## Installation
Install all dependencies :

```sh
# Truffle
cd truffle/
npm install
```
```sh
# Client
cd client/
npm install
```

## Launch dApp

Open 3 terminals :

### 1) Ganache
Launch a local blockchain.
```sh
ganache
```
### 2) Truffle
Compile and deploy on the local blockchain.
```sh
cd truffle/
truffle migrate --reset
```
### 3) Client
Launch the front-end of the app.
```sh
cd client/
npm start
```
