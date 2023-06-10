"useClient";
import React from 'react';
import { VenomConnect } from 'venom-connect';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };
  return (
    <div>
      <div >
        <h1 style={{color: "black", fontWeight: 'larger', fontSize: '16px', cursor: 'pointer' }} onClick={login}>
          Connect wallet
        </h1>

      </div>
    </div>
  );
}
  
export default ConnectWallet;