import{E as n}from"./View-DNryD_NT.js";import{d as t,_ as s,c as o,r as c,o as i}from"./index-B_XLZHpA.js";import"./ConnectLayout-DoQGgMzj.js";const r=t({components:{EvmBaseView:n},setup(){return{chainId:"eip155:56",chainName:"BNB",chainMethods:["wallet_switchEthereumChain","wallet_addEthereumChain","eth_sendTransaction_transfer","eth_sendTransaction_approve","wallet_watchAsset","wallet_testRpc"]}}});function h(e,m,p,d,_,l){const a=c("EvmBaseView");return i(),o(a,{chainId:e.chainId,chainName:e.chainName,chainMethods:e.chainMethods},null,8,["chainId","chainName","chainMethods"])}const B=s(r,[["render",h]]);export{B as default};