# universal-provider


## 安装及初始化

请确保更新到 6.88.0 版本，即可开始接入：将 OKX Connect 集成到您的 DApp 中，可以使用 npm:

`npm install @okxconnect/universal-provider`

连接钱包之前，需要先创建一个对象，用于后续连接钱包、发送交易等操作。

`OKXUniversalProvider.init({metaData: {name, icon}})`

**请求参数**

- metaData - object
    - name - string: 应用名称，不会作为唯一表示
    - icon - string: 应用图标的 URL。必须是 PNG、ICO 等格式，不支持 SVG 图标。最好传递指向 180x180px PNG 图标的 url。

**返回值**

- OKXUniversalProvider

**示例**

```typescript
import {OKXUniversalProvider} from "@okxconnect/universal-provider";

const okxUniversalProvider = await OKXUniversalProvider.init({
    dappMetaData: {
        name: "application name",
        icon: "application icon url"
    },
})
```

## 连接钱包

连接钱包去获取钱包地址，作为标识符和用于签名交易的必要参数;

`okxUniversalProvider.connect(connectParams: ConnectParams);`

**请求参数**

- connectParams - ConnectParams
    - namespaces - [namespace: string]: ConnectNamespace ; 请求连接的必要信息， EVM系的key为"eip155"
      ，如果请求的链中，有任何一个链钱包不支持的话，钱包会拒绝连接；
        - chains: string[]; 链id信息,
        - rpcMap?: [chainId: string]: string; rpc 信息，配置了rpc url才能请求链上rpc信息；
        - defaultChain?: string; 默认链
    - optionalNamespaces - [namespace: string]: ConnectNamespace; 请求连接的可选信息， EVM系的key为"eip155"
      ，如果对应的链信息钱包不支持，依然可以连接；
        - chains: string[]; 链id信息,
            - rpcMap?: [chainId: string]: string; rpc 信息；
            - defaultChain?: string; 默认链
    - sessionConfig: object
        - redirect: string 连接成功后的跳转参数，如果是Telegram中的Mini App，这里可以设置为Telegram的deeplink: "tg://resolve"

**返回值**

- Promise<`SessionTypes.Struct | undefined`>
    - topic: string; 会话标识；
    - namespaces: Record<string, Namespace>; 成功连接的namespace 信息；
        - chains: string[]; 连接的链信息；
        - accounts: string[]; 连接的账户信息；
        - methods: string[]; 当前namespace下，钱包支持的方法；
        - rpcMap?: [chainId: string]: string; rpc 信息；
        - defaultChain?: string; 当前会话的默认链
    - sessionConfig?: SessionConfig
        - dappInfo: object DApp 信息；
            - name:string
            - icon:string
        - redirect?:string, 连接成功后的跳转参数；

**示例**

```typescript
var session = await okxUniversalProvider.connect({
    namespaces: {
        eip155: {
            chains: ["eip155:1", "eip155:66", "eip155:55"],
            rpcMap: {
                1: "https://rpc" // set your own rpc url
            },
            defaultChain: "1"
        }
    },
    optionalNamespaces: {
        eip155: {
            chains: ["eip155:43114"]
        }
    },
    sessionConfig: {
        redirect: "tg://resolve"
    }
})
```

## 发送签名和交易

向钱包发送消息的方法，支持签名，交易，rpc请求;

`okxUniversalProvider.request(requestArguments, chain);`

**请求参数**

- requestArguments - object
    - method: string; 请求的方法名，
    - params?: `unknown[]  | Record<string, unknown> | object | undefined;` 请求的方法对应的参数；
- chain: string, 请求方法执行的链，建议传该参数，如果未传的话，会被设置为当前的defaultChain；

**返回值**

根据不同方法的执行结果，会返回不同的参数，具体参数参照下面的示例；

- personal_sign
    - Promise - object
        - method:string personal_sign, 请求方法；
        - result:string 签名结果;

- eth_signTypedData_v4
    - Promise - object
        - method:string eth_signTypedData_v4, 请求方法；
        - result:string 签名结果

- eth_sendTransaction
    - Promise - object
        - method:string eth_sendTransaction, 请求方法；
        - result:string 签名结果

- eth_requestAccounts
    - Promise - string[] 返回默认chainId的地址;

- eth_chainId
    - Promise - string 返回默认链id;

- wallet_switchEthereumChain
    - Promise - object
        - method:string wallet_switchEthereumChain,请求方法；
        - result:string 切换的链id 如: ""eip155:137"

- wallet_addEthereumChain
    - Promise - object
        - method:string wallet_addEthereumChain 请求方法；
        - result:string 添加的链信息，如: "eip155:122:0xf2f3e73be57031114dd1f4e75c1dd87658be7f0e"

- wallet_watchAsset
    - Promise - object
        - method:string wallet_watchAsset 请求方法；
        - result:boolean 是否添加成功；

**示例**

```typescript

let chain = 'eip155:1'
var data = {}

// 在chain链上执行 personalSign
data = {"method": "personal_sign", "params": {"message": "0x48656c6c6f204170704b697421"}}
var personalSignResult = await okxUniversalProvider.request(data, chain)
//personalSignResult:  
//"0xe8d34297c33a619321cef88e0f0373d13c75f66f35dc8157346d4720bb3e8071247a0cdcd155256197720a1eb1bcdc68aae333fbe6d972060ffde84833ceba151c"

// 在chain链上执行 eth_signTypedData_v4
data = {
    "method": "eth_signTypedData_v4",
    "params": {"typedDataJson": "{\"domain\":{\"name\":\"Ether Mail\",\"version\":\"1\",\"chainId\":1,\"verifyingContract\":\"0xcccccccccccccccccccccccccccccccccccccccc\"},\"message\":{\"from\":{\"name\":\"Cow\",\"wallet\":\"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826\"},\"to\":{\"name\":\"Bob\",\"wallet\":\"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB\"},\"contents\":\"Hello, Bob!\"},\"primaryType\":\"Mail\",\"types\":{\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}],\"Person\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"wallet\",\"type\":\"address\"}],\"Mail\":[{\"name\":\"from\",\"type\":\"Person\"},{\"name\":\"to\",\"type\":\"Person\"},{\"name\":\"contents\",\"type\":\"string\"}]}}"}
}
var signTypeV4Result = await okxUniversalProvider.request(data, chain)
//signTypeV4Result:  
//"0xa8bb3c6b33a119d2d567c7632195c21988df778006082742125a591f5c633f716107883a37f7de6531a6312a5f69022135bf46fe5ab77905b62c82b3395f985e1b"

// 在chain链上执行 sendTransaction,
data = {
    "method": "eth_sendTransaction",
    "params": {"gasPrice": "0x17003f6530", "nonce": "0x0d30", "data": "0x", "value": "0x00", "gasLimit": "0x5208"}
}
var sendTransactionResult = await okxUniversalProvider.request(data, chain)
// {"method":"eth_sendTransaction","result":"0x1ccf2c4a3d689067fc2acac04749b3489eaa3eaaea8dfc37398edfec98fe24f4"}

// 获取默认链的地址信息；
data = {"method": "eth_requestAccounts"} 
var ethRequestAccountsResult = await okxUniversalProvider.request(data,chain)
//ethRequestAccountsResult   ["0xf2f3e73be57031114dd1f4e75c1dd87658be7f0e"]

// 获取默认链信息；
data = {"method": "eth_chainId"}
var chainIdResult = await okxUniversalProvider.request(data,chain)
//chainIdResult   1

// 切换链；
data = {"method": "wallet_switchEthereumChain", "params": {"chainId": "1"}}
var switchResult = await okxUniversalProvider.request(data,chain)
// {"method":"wallet_switchEthereumChain","result":"eip155:137"}


// 添加链
data = {
    "method": "wallet_addEthereumChain",
    "params": {
        "blockExplorerUrls": ["https://explorer.fuse.io"],
        "chainId": "0x7a",
        "chainName": "Fuse",
        "nativeCurrency": {"name": "Fuse", "symbol": "FUSE", "decimals": 18},
        "rpcUrls": ["https://rpc.fuse.io"]
    }
}
var addEthereumChainResult = await okxUniversalProvider.request(data,chain)
//addEthereumChainResult   
// {"requestId":"1727623372236","method":"wallet_addEthereumChain","result":"eip155:122:0xf2f3e73be57031114dd1f4e75c1dd87658be7f0e"}

// 在chain链 watchAsset 添加币种
data = {
    "method": "wallet_watchAsset",
    "params": {
        "type": "ERC20",
        "options": {
            "address": "0xeB51D9A39AD5EEF215dC0Bf39a8821ff804A0F01",
            "symbol": "LGNS",
            "image": "https://polygonscan.com/token/images/originlgns_32.png",
            "decimals": 9
        }
    }
}
var watchAssetResult = await okxUniversalProvider.request(data,chain)
// watchAssetResult   
// {"method":"wallet_watchAsset","result":"true"}


// 在chain链 执行 requestRpc
data = {"method": "eth_getBalance", "params": ["0x8D97689C9818892B700e27F316cc3E41e17fBeb9", "latest"]}
var getBalanceResult = await okxUniversalProvider.request(data,chain)
// getBalanceResult:  "0xba862b54effa"

```

## 设置默认网络

在连接多个网络的状况下,如果开发者没有明确指定当前操作所在网络,则通过默认网络进行交互。

'setDefaultChain(chain, rpcUrl?)'

**示例**

```typescript
okxUniversalProvider.setDefaultChain("eip155:1", "rpcurl")
```

## 断开钱包连接

断开已连接钱包,并删除当前会话,如果要切换连接钱包,请先断开当前钱包。

```typescript
okxUniversalProvider.disconnect();
```