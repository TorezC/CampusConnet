import React from "react";
import './home.css';
import block from '../../assets/block.png'
import ConnectWallet from "../../components/wallet/Connectwallet";
import { useEffect, useState } from "react";
import { VenomConnect } from "venom-connect";
import { initVenomConnect } from "../../components/wallet/configure";

type Props = {
  venomConnect: VenomConnect | undefined;
};

const Home = ({ venomConnect }: Props) => {
  // const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState();
  // This method allows us to gen a wallet address from inpage provider
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };
  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };
  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
  };
  // When our provider is ready, we need to get address and balance from.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider
      ? await getAddress(provider)
      : undefined;
    setAddress(venomWalletAddress);
  };
  useEffect(() => {
    // connect event handler
    const off = venomConnect?.on("connect", onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [venomConnect]);

  return (
    <div className="home">
      <div className="home-content">

      <h1 className="logo">CampusConnet</h1>

      {address && (
        <header>
          <p>{address}</p>
          <a className="logout" onClick={onDisconnect}>
            <img src="img" alt="Log out" />
          </a>
        </header>
      )}
      <ConnectWallet venomConnect={venomConnect} />
      </div>
      {/* <div className="about">
        <div className="story">
          <p>Let's make payment to any place on campus at easy </p>
        </div>
        <img src={block} className="img-fluid" alt="b" width={600} height={500} />
      </div> */}
      <ul className="row campuslists">
        <h6>Campuses on CampusConnet</h6>
        <li className="col-md-4 campuslist">
          Nnamdi Azikwe University -UNIZIK
        </li>
        <li className="col-md-4 campuslist">
          University of Nigeria Nsukka -UNN
        </li>
        <li className="col-md-4 campuslist">
          University of PortHacourt -UNIPORT
        </li>
        <li className="col-md-4 campuslist">
          University of Lagos -UNILAG
        </li>
        <li className="col-md-4 campuslist">
          Federal Polytechnic Oko
        </li>
      </ul>
      <ul className="row campuslists">
        <h6>Resturants and Places on CampusConnet</h6>
        <li className="col-md-4 campuslist">
          Roban Stores Enugu
        </li>
        <li className="col-md-4 campuslist">
          Tezeers Eatery Awka
        </li>
        <li className="col-md-4 campuslist">
          University of PortHacourt -UNIPORT
        </li>
        <li className="col-md-4 campuslist">
          University of Lagos -UNILAG
        </li>
        <li className="col-md-4 campuslist">
          Federal Polytechnic Oko
        </li>
      </ul>
    </div>
  );
};

export default Home;
