import c from '../../assets/c.png'
import './home.css';
import ConnectWallet from "../../components/wallet/Connectwallet";
import { useEffect, useState } from "react";
import { VenomConnect } from "venom-connect";

type Props = {
  venomConnect: VenomConnect | undefined;
};

const Home = ({ venomConnect }: Props) => {
  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState();
  // This method allows us to gen a wallet address from inpage provider
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };
  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  // const checkAuth = async (_venomConnect: any) => {
  //   const auth = await _venomConnect?.checkAuth();
  //   if (auth) await getAddress(_venomConnect);
  // };
  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  // const onConnect = async (provider: any) => {
  //   setVenomProvider(provider);
  //   await onProviderReady(provider);
  // };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
  };
  // When our provider is ready, we need to get address and balance from.
  useEffect(() => {
    // connect event handler
    const onProviderReady = async (provider: any) => {
      const venomWalletAddress = provider ? await getAddress(provider) : undefined;
      setAddress(venomWalletAddress);
    };
    const checkAuth = async (_venomConnect: any) => {
      const auth = await _venomConnect?.checkAuth();
      if (auth) await getAddress(_venomConnect);
    };

    const onConnect = async (provider: any) => {
      setVenomProvider(provider);
      await onProviderReady(provider);
    };

    const off = venomConnect?.on('connect', onConnect);
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

      <h1 className="logo"> <img src={c} width={30} height={30} alt="c" /> CampusConnet</h1>
      <div className="payment">
        <div className="send">
          <h1>Send</h1>
        </div>
        <div className="send">
          <h1>Receive</h1>
        </div>
        {address ? (
          <div>
            {/* <p>{address}</p> */}
            <h1 className="logout" style={{fontSize: '16px', fontWeight: 'larger'}} onClick={onDisconnect}>
              Disconnect
            </h1>
          </div>
        ):
        <ConnectWallet venomConnect={venomConnect} />
        }
        </div>
      </div>
      <div className="about ">
        <h2 className='about-content'>Spend, receive and send Venom tokens on campuses</h2>
        <div className="story">
          <p>Campusconnet is a payment solution connecting campuses.</p>
        </div>
        
      </div>
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
