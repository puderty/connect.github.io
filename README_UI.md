# TONUI
在tonsdk的基础上，我们提供了一个包含界面的sdk。

## 通过npm安装

`npm install @okxconnect/tonui`

## 初始化
连接钱包之前，需要先创建一个对象，用于后续连接钱包、发送交易等操作。

`new OKXTonConnectUI(metaData, buttonRootId, actionsConfiguration, uiPreferences, language, restoreConnection)`

**请求参数**

- metaData - object
  - name - string: 应用名称，不会作为唯一表示
  - icon - string: 应用图标的 URL。必须是 PNG、ICO 等格式，不支持 SVG 图标。最好传递指向 180x180px PNG 图标的 url。
- buttonRootId - string: 用于附加钱包连接按钮的 HTML 元素 ID。如果没有传递，则不会出现按钮;
- actionsConfiguration - object
  - modals - ('before' | 'success' | 'error')[] | 'all'  交易过程中的提醒界面展示模式。
  - returnStrategy -string 'none' | `${string}://${string}`; 指定当用户签署/拒绝请求时深层链接的返回策略，如果是在tg中，可以配置tg://resolve
- uiPreferences -object
  - theme -  Theme 可以是：THEME.DARK, THEME.LIGHT, "SYSTEM"
- language - 'en' | 'ru' | 'zh', 目前支持中文/俄文/英文；
- restoreConnection?: boolean - 是否自动回复之前的连接；

**返回值**

- OKXTonConnectUI

**示例**

```typescript
import { OKXTonConnectUI } from "@okxconnect/tonui";

const okxTonConnectUI = new OKXTonConnectUI({
    dappMetaData: {
        name: "application name",
        icon: "application icon url"
    },
    buttonRootId: 'button-root',
    actionsConfiguration:{
        returnStrategy:'none'
    },
    uiPreferences: {
        theme: THEME.LIGHT
    },
    language: 'en',
    restoreConnection: true
});
```

## 连接钱包
连接钱包去获取钱包地址，作为标识符和用于签名交易的必要参数，
“连接按钮”（添加于buttonRootId）会自动处理点击并调用连接，
如果没有添加buttonRootId 的话，需要调用此方法。

`await okxTonConnectUI.openModal();`

**示例**

```typescript
okxTonConnectUI.openModal();
```

## 设置tonProof
添加连接签名参数,
如果需要设置tonProof，请在准备好tonProof 参数之前，设置state:'loading',
在准备好之后，将state设置为 'ready'并添加value;
也可以通过设置setConnectRequestParameters(null) 移除掉loading 状态；

**示例**

```typescript
okxtonConnectUI.setConnectRequestParameters({ state: 'loading' });

const tonProofPayload: string | null = await fetchTonProofPayloadFromBackend();

if (!tonProofPayload) {
  okxtonConnectUI.setConnectRequestParameters(null);
} else {
  okxtonConnectUI.setConnectRequestParameters({
    state: "ready",
    value: { tonProof: tonProofPayload }
  });
}
```

## 关闭连接弹窗

**示例**
```typescript
okxTonConnectUI.closeModal();
```


## 获取当前连接的Wallet和WalletInfo

获取当前是否有连接钱包，以及已连接的钱包的相关信息；

**示例**

```typescript
const currentWallet  = okxTonConnectUI.wallet;
const currentAccount = okxTonConnectUI.account;
const isConnected    = okxTonConnectUI.connected;
```

## 断开钱包连接

**示例**
```typescript
okxTonConnectUI.disconnect();
```


## 监听钱包状态变化

钱包状态有：连接成功、恢复连接成功、断开连接等，都可以用此方法获取状态。
[方法详情同OKXTonConnect.onStatusChange](https://www.okx.com/web3/build/docs/sdks/app-connect-ton#%E7%9B%91%E5%90%AC%E9%92%B1%E5%8C%85%E7%8A%B6%E6%80%81%E5%8F%98%E5%8C%96)

**示例**

```typescript
import { Wallet } from "@okxconnect/tonui";

const unsubscribe = okxTonConnectUI.onStatusChange((walletInfo: Wallet | null) => {
        console.log('Connection status:', walletInfo);
    }, (err: OKXConnectError) => {
        console.log('Connection status:', err);
    }
)
unsubscribe()
```


## 发送交易

向钱包发送消息的方法：

`sendTransaction(transaction, actionConfigurationRequest): Promise<SendTransactionResponse>`

**请求参数**

- transaction - object, [参数同OKXTonConnect.sendTransaction的transaction](https://www.okx.com/web3/build/docs/sdks/app-connect-ton#%E5%8F%91%E9%80%81%E4%BA%A4%E6%98%93)
    
- actionConfigurationRequest - object
    - modals : ('before' | 'success' | 'error')[] | 'all' 交易过程中的提醒界面展示模式，默认为'before'

**返回值**

- Promise - `{boc: string}`: 签名结果

**示例**

```typescript
import { OKXConnectError, OKX_CONNECT_ERROR_CODES } from "@okxconnect/core";

let transactionRequest = {
    "validUntil": Date.now() / 1000 + 360,
    "from": "0:348bcf827469c5fc38541c77fdd91d4e347eac200f6f2d9fd62dc08885f0415f",
    "messages": [
        {
            "address": "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
            "amount": "20000000",
            "stateInit": "base64bocblahblahblah==" //deploy contract
        }, 
        {
            "address": "0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3",
            "amount": "60000000",
            "payload": "base64bocblahblahblah==" //transfer nft to new deployed account 0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F
        }
    ]
}

okxTonConnectUI.sendTransaction(transactionRequest, {
    modals: 'all'
}).then((result) => {
    let boc = result.boc
}).catch((error) => {
    if (error instanceof OKXConnectError && error.code == OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
        //userReject;
    } else {
        //other error;
    }
})

```

## 设置ui配置项
支持修改主题，文字语言设置，也可以在初始化的时候添加这些配置；

**示例**

```typescript
okxTonConnectUI.uiOptions = {
  language: 'zh',
  uiPreferences: {
    theme: THEME.DARK
  }
};
```

## 监听事件

在以下事件发生时，会发送对应事件通知，Dapp可以根据需要添加监听，来处理对应的逻辑；

**event事件**

| 事件名称                                  | 触发时机                 |
|---------------------------------------|----------------------|
| OKX_UI_CONNECTION_STARTED             | 当用户开始连接钱包时           |
| OKX_UI_CONNECTION_COMPLETED           | 当用户成功连接钱包时           |
| OKX_UI_CONNECTION_ERROR               | 当用户取消连接或连接过程中出现错误时   |
| OKX_UI_CONNECTION_RESTORING_STARTED   | 当 dApp 开始恢复连接时       |
| OKX_UI_CONNECTION_RESTORING_COMPLETED | 当 dApp 成功恢复连接时       |
| OKX_UI_CONNECTION_RESTORING_ERROR     | 当 dApp 无法恢复连接时       |
| OKX_UI_DISCONNECTION                  | 当用户开始断开钱包连接时         |
| OKX_UI_TRANSACTION_SENT_FOR_SIGNATURE | 当用户发送交易以供签名时         |
| OKX_UI_TRANSACTION_SIGNED             | 当用户成功签署交易时           |
| OKX_UI_TRANSACTION_SIGNING_FAILED     | 当用户取消交易签名或签名过程中出现错误时 |

**示例**

```typescript
import { OKX_UI_CONNECTION_AND_TRANSACTION_EVENT } from "@okxconnect/tonui";

window.addEventListener(OKX_UI_CONNECTION_AND_TRANSACTION_EVENT.OKX_UI_CONNECTION_STARTED, (event) => {
    if (event instanceof CustomEvent) {
        console.log('Transaction init', event.detail);
    }
});
```
