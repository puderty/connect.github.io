import{E as n}from"./View-CZJ52Vmg.js";import{d as t,_ as o,c as s,r as c,o as i}from"./index-t5ByIVUM.js";import"./ConnectLayout-C2tMyHmU.js";const r=t({components:{EvmBaseView:n},setup(){return{chainId:"eip155:137",chainName:"Polygon",chainMethods:["wallet_switchEthereumChain","wallet_addEthereumChain","eth_sendTransaction_transfer","eth_sendTransaction_approve","eth_sendTransaction_mint","wallet_watchAsset","wallet_testRpc"]}}});function h(e,m,d,p,_,l){const a=c("EvmBaseView");return i(),s(a,{chainId:e.chainId,chainName:e.chainName,chainMethods:e.chainMethods},null,8,["chainId","chainName","chainMethods"])}const E=o(r,[["render",h]]);export{E as default};