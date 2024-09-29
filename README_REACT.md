# react组件

## 通过npm安装

`npm install @okxconnect/tonui-react`

## 添加 OKXTonConnectUIProvider
将 OKXTonConnectUIProvider 添加到应用程序的根目录。您可以使用 props 指定 UI 选项。
所有 OKXConnectUI 的hooks调用 和`<OKXTonConnectButton />`组件都要放在`<OKXTonConnectUIProvider>`里面
```tsx
import { OKXTonConnectUIProvider } from '@okxconnect/tonui-react';

export function App() {
    return (
        <OKXTonConnectUIProvider
            uiPreferences = {{theme: THEME.DARK}}
            dappMetaData = {{
                name: "application name",
                icon: "application url"
            }}
            restoreConnection = {true}
            language = {'zh'}
            returnStrategy = {'none'}
        >
            { /* Your app */}
        </OKXTonConnectUIProvider>
    );
}

```

## 添加 OKXTonConnectButton
TonConnect 按钮是用于初始化连接的通用 UI 组件。钱包连接后，它会转换为钱包菜单。建议将其放置在应用程序的右上角。

```tsx
export const Header = () => {
    return (
        <header>
            <span>My App with React UI</span>
            <OKXTonConnectButton />
        </header>
    );
};

```

## 获取当前连接的钱包地址
使用它来获取用户当前的 ton 钱包地址。传递布尔参数 isUserFriendly 来选择地址的格式。如果钱包未连接，将返回空字符串。

```tsx
import { useTonAddress } from '@okxconnect/tonui-react';

export const Address = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    return (
        address && (
            <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
            </div>
        )
    );
};
```

### 获取当前连接的钱包
使用它来获取用户当前的 ton 钱包。如果钱包未连接，将返回 null.

```tsx
import { useOKXTonWallet } from '@okxconnect/tonui-react';

export const Wallet = () => {
    const wallet = useOKXTonWallet();

    return (
        wallet && (
            <div>
                <span>Connected wallet: {wallet.name}</span>
                <span>Device: {wallet.device.appName}</span>
            </div>
        )
    );
};
```

### useTonConnectUI
使用它访问OKXTonConnectUI实例和 UI 选项更新功能

```tsx
import { Locales, useOKXTonConnectUI } from '@okxconnect/tonui-react';

export const Settings = () => {
    const [okxtonConnectUI, setOptions] = useOKXTonConnectUI();

    const onLanguageChange = (lang: string) => {
        setOptions({ language: lang as Locales });
    };

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
            {
                address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
                amount: "10000000",
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            },
            {
                address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
                amount: "60000000",
                // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
            }
        ]
    }

    return (
        <div>
            <button onClick={() => okxtonConnectUI.sendTransaction(myTransaction)}>
                Send transaction
            </button>

            <div>
                <label>language</label>
                <select onChange={e => onLanguageChange(e.target.value)}>
                    <option value="en">en</option>
                    <option value="ru">ru</option>
                    <option value="zh">zh</option>
                </select>
            </div>
        </div>
    );
};
```

### 连接是否已经恢复
显示恢复连接过程中的状态。

```tsx
import { useIsConnectionRestored } from '@okxconnect/tonui-react';

export const EntrypointPage = () => {
    const connectionRestored = useIsConnectionRestored();

    if (!connectionRestored) {
        return <Loader>Please wait...</Loader>;
    }

    return <MainPage />;
};
```

## 添加连接请求参数 (ton_proof)
使用OKXTonConnectUI.setConnectRequestParameters函数传递连接请求参数(ton_proof)。
如果需要设置tonProof，请在准备好tonProof 参数之前，设置state:'loading',
在准备好之后，将state设置为 'ready'并添加value;
也可以通过设置setConnectRequestParameters(null) 移除掉loading 状态；


```ts
const [okxtonConnectUI] = useOKXTonConnectUI();

okxtonConnectUI.setConnectRequestParameters({ state: 'loading' });

const tonProofPayload: string | null = await fetchTonProofPayloadFromBackend();

if (!tonProofPayload) {
    okxtonConnectUI.setConnectRequestParameters(null);
} else {
    okxtonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: tonProof }
    });
}

```