# okxconnectsdk

## 什么是okxconnectsdk?

本指南将帮助您在Ton 链下，将OKX Connect集成到您的移动端环境下的dapp中；接入OKXTonConnect 后，可以在手机端（浏览器以及telegram等环境）直接和okx app钱包交互；

## 安装

`npm install okxconnectsdk
或
yarn add okxconnectsdk`

## OKXTonConnect

`import {OKXTonConnect} from "okxconnectsdk";
new OKXTonConnect({metaData: {name, icon, url}})`

**描述**

初始化OKXTonConnect 对象

**请求参数**

- metaData - object
    - name - string: 应用名称，不会作为唯一表示
    - icon - string: 应用图标的 URL。必须是 PNG、ICO 等格式，不支持 SVG 图标。最好传递指向 180x180px PNG 图标的 url。
    - url - string: 应用链接

**返回值**
- okxTonConnect - OKXTonConnect

**示例**
```typescript
const okxTonConnect = new TonConnect({metaData: {
        name:"your application name",
        icon:"application icon url",
        url:"application url"
    }});
```

## connect()

`connect(request): Promise<string>;`

**描述**

连接钱包

**请求参数**

- request - object (可选)
    - tonProof - string (可选) : 签名信息；
    - redirect - string (可选) : 处理完钱包事件，返回的app 所需要的deeplink，例如：在Telegram 环境下，此字段需要传递Telegram 的deeplink，当在钱包签名完成后，欧易app 会通过此deeplink 打开Telegram程序；
    - openUniversalLink - boolean (可选) : 链接钱包时,是否通过Universal link 唤起OKX App客户端；设置为true 的情况下，用户发起链接钱包时，会拉起 OKX App客户端，并弹出确认页面，如果手机未安装OKX App客户端，跳转到下载页；

**返回值**

- Promise - string: pc 端可以根据该字段生成二维码，OKX App客户端在web3 中扫描生成的二维码，连接DApp；

**建议**
- 在H5环境下设置openUniversalLink为true；
- 在PC环境下设置openUniversalLink为false，并根据返回的universalLink 生成二维码，可以用OKX App客户端扫码链接，在连接成功后，取消二维码弹窗；

**示例**

```typescript
try{
    okxTonConnect.connect({
        tonProof:"signmessage",
        redirect:"tg://resolve",
        openUniversalLink:true
    })
}catch(error){
    if (error.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
        alert('User reject');
    } else if(error.code === OKX_CONNECT_ERROR_CODES.ALREADY_CONNECTED_ERROR){
        alert('Already connect');
    }else{
        alert('Unknown error happened');
    }
}
```

## restoreConnection()

`restoreConnection(): Promise<void>`

**描述**

恢复连接，初始化连接器并调用restoreConnection，如果用户之前连接过钱包，连接器将恢复连接，在页面重新创建或者刷新的时候需要调用此方法，用来恢复之前的链接；

**请求参数**

无

**返回值**

无

**示例**

```typescript
okxTonConnect.restoreConnection()
```

## onStatusChange()

`onStatusChange(
callback: (walletInfo: Wallet | null) => void,
errorsHandler?: (err: OkxConnectError) => void
): () => void;`

**描述**

监听钱包状态变化，钱包连接成功（connect），或者连接恢复成功(restoreConnection)，以及断开连接(disconnect)，都可以在该回调中获取到钱包信息；onStatusChange 可以调用多次，添加多个监听回调，返回值是一个方法，直接调用可以直接移除当前监听；

**请求参数**

- callback - (walletInfo: Wallet | null) => void : 钱包状态发生变化时候，该callback 会被调用；
  - walletinfo - object
    - device - object
      - appName - string : 钱包名称
      - platform - string : 钱包的平台，（androdi | ios）
      - appVersion - string : 钱包版本号
      - maxProtocolVersion - number : 
      - features - string[] : 支持的方法，当前版本是 sendTransaction
    - account - Account
      - address - string : TON address raw (`0:<hex>`) 
      - chain - "-239"
      - walletStateInit - string : Base64 (not url safe) encoded stateinit cell for the wallet contract
      - publicKey - string : HEX string without 0x
    - connectItems - object
      - name - string : "ton_proof"
      - proof - object
        - timestamp - number : 时间戳
        - domain - object
          - lengthBytes - number : AppDomain Length
          - value - string : app domain name (as url part, without encoding)
        - payload - string: ase64-encoded signature
        - signature - string: payload from the request
  
- errorsHandler - (err: OkxConnectError) => void : 钱包状态发生变化出现异常的时候，该errorsHandler 会被调用；
  - err - TonConnectError
    - code - number 
    - message - string

**返回值**

- () => void : 当不再需要监听更新时，执行该方法以节省资源。

**示例**

```typescript
const unsubscribe = okxTonConnect.onStatusChange(
    walletInfo => {
        console.log('Connection status:', walletInfo);
    }
);
unsubscribe()
```

## sendTransaction()

`sendTransaction(
transaction: SendTransactionRequest,
options?: {
onRequestSent?: () => void;
}): Promise<SendTransactionResponse>;`

**描述**

发送交易

**请求参数**

- transaction - objet 
  - validUntil - number :unix 时间戳。该时刻之后交易将无效
  - from - string : DApp发送交易的发送者地址，默认为当前连接的钱包地址；
  - messages - object[] : (信息数组）： 1-4 条从钱包合约到其他账户的输出消息。所有消息按顺序发送出去，但 钱包无法保证消息会按相同顺序被传递和执行。
    - address - string : 消息目的地
    - amount - string : 要发送的数量。
    - stateInit - string (可选) : 以 Base64 编码的原始cell BoC。
    - payload - string : 以 Base64 编码的原始cell BoC。
- options - object
  - onRequestSent - () => void : 当签名请求发送后，该方法会被调用；

**返回值**

- Promise - `{boc: string}`: 签名结果

**示例**

```typescript
import {OkxConnectError} from "./okx-connect.error";

let transactionRequest = {
  "valid_until": Math.floor(Date.now() / 1000) + 360,
  "from": "0:348bcf827469c5fc38541c77fdd91d4e347eac200f6f2d9fd62dc08885f0415f",
  "messages": [
    {
      "address": "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
      "amount": "20000000",
      "stateInit": "base64bocblahblahblah==" //deploy contract
    }, {
      "address": "0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3",
      "amount": "60000000",
      "payload": "base64bocblahblahblah==" //transfer nft to new deployed account 0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F
    }
  ]
}

let requestionOptions = {
  onRequestSent: () => {
  }
}
try {
  const result = await okxTonConnect.sendTransaction(transaction, requestionOptions);
} catch (error) {
  if (error.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
    alert('You rejected the transaction.');
  } else if (error.code === OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR) {
    alert('Not connect');
  } else {
    alert('Unknown error happened');
  }
}
```

## event

**描述**

在以下事件发生时，会发送对应事件通知，Dapp可以根据需要添加监听，来处理对应的逻辑；

**event事件**

| 事件名称                                   | 触发时机                 |
|----------------------------------------|----------------------|
| OKX_TON_CONNECTION_STARTED             | 当用户开始连接钱包时           |
| OKX_TON_CONNECTION_COMPLETED           | 当用户成功连接钱包时           |
| OKX_TON_CONNECTION_ERROR               | 当用户取消连接或连接过程中出现错误时   |
| OKX_TON_CONNECTION_RESTORING_STARTED   | 当 dApp 开始恢复连接时       |
| OKX_TON_CONNECTION_RESTORING_COMPLETED | 当 dApp 成功恢复连接时       |
| OKX_TON_CONNECTION_RESTORING_ERROR     | 当 dApp 无法恢复连接时       |
| OKX_TON_DISCONNECTION                  | 当用户开始断开钱包连接时         |
| OKX_TON_TRANSACTION_SENT_FOR_SIGNATUR  | 当用户发送交易以供签名时         |
| OKX_TON_TRANSACTION_SIGNED             | 当用户成功签署交易时           |
| OKX_TON_TRANSACTION_SIGNING_FAILED     | 当用户取消交易签名或签名过程中出现错误时 |

**示例**

```typescript
window.addEventListener(OKX_TON_CONNECTION_STARTED, (event) => {
    console.log('Transaction init', event.detail);
});
```

## disconnect

**描述**

断开与已连接钱包的连接并删除当前会话，如果要切换已连接的钱包，请先断开当前钱包的连接。

**示例**

```typescript
try{
    await okxTonConnect.disconnect()
}catch(error){
    if(error.code === OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR){
        alert('Not connect');
    }else{
        alert('Unknown error happened', e);
    }
}
```

## account

**描述**

获取当前链接的account

**示例**

```typescript
import {Account} from "./account";
var connect: Account = okxTonConnect.account()
```

## wallet

**描述**

获取当前链接的wallet

**示例**

```typescript
import {Wallet} from "./wallet";
var connect: Wallet = okxTonConnect.wallet()
```

## connected

**描述**

获取当前是否有连接钱包

**示例**

```typescript
var connect:boolean = okxTonConnect.connected()
```

## error

**描述**

在链接，交易，恢复链接，断开链接的过程中可能抛出的异常;

**异常**

| 错误码 | 描述    |
|-----|-------|
| 0   | 未知异常  |
| 11  | 钱包已链接 |
| 12  | 钱包未链接 |
| 300 | 用户拒绝  |
| 400 | 方法不支持 |