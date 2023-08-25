import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import background from "./styles/bg.png";
import styled from "styled-components";
import Accordion from './Accordion';
import styles from "./App.css"

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  letter-spacing: 2px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 20px;
  border: none;
  background-color: #ff9a18;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  width: 350px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  letter-spacing: 2px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 15px;
  border: none;
  background-color: #ff9a18;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  padding: 20px;
  width: 300px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


export const StyledRoundButton = styled.button`
  padding: 10px;
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton2 = styled.button`
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 100px;
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const StyledImg = styled.img`
  border-radius: 30px;
  @media (min-width: 1000px) {
    width: 1500px;
  }
  transition: width 0.5s;
`;

export const StyledImg2 = styled.img`
  border-radius: 20px;
  @media (min-width: 1000px) {
    width: 400px;
  }
  transition: width 0.5s;
`;

export const StyledImg3 = styled.img`
  width: 100%;
  transition: transform 1s;
  :hover {
    transform: translateZ(10px);
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;




function App() {
  const accordionData = [
    {
      title: 'How can I bridge funds to Shibarium?',
      content: `First you must understand that just as in the Ethereum network you need ETH for transactions, in the Shibarium network you need $BONE.
      Once you have the amount of $BONE desired you will have to go to the official bridge website of Shibarium (look on official networks like twitter/X / telegram)
      `
    },
    {
      title: 'How do I buy $BONE?',
      content: `You must deposit your funds in the metamask account of the ETH network and buy the amount of $BONE that you will use to mint the Punks (and a little more for fees!).
      You can use uniswap or 1inch to make the swap, searching for BONE on the token selector of the swap.
      `
    },
    {
      title: 'How can I mint?',
      content: `You must make sure that you are connected to the Shibarium Mainnet. \n
      Once you have been able to bridge your desired $BONE to the Shibarium network go to our mint section, connect your wallet and select how many amounts of Shibarium Punks you want to mint!`
    },
    {
      title: 'Wait so... how much is the supply right now?',
      content: `5555 Male-based Shibarium Punks is the first minting phase of our project that will be live a the moment Shibarium goes live!. Go mint yours above don't be late!`
    },
{
      title: 'How do I see them or trade?',
      content: `To see you Punks minted you can go to "My Collection" in our navigation bar and put your address. No connection needed!. In addition, a NFT Marketplace is being developed for Shibarium Mainnet in which you will exchange your Punks and win revenue share from fees! Stay tuned...
      `},
  ];
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const mintRef = useRef(null);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [isActive, setIsActive] = useState(false);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Select quantity mint`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = 8000000000000000000;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let totalCostWeiNum = cost * mintAmount
    let trueCost = BigInt(totalCostWeiNum).toString();
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: trueCost,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Error. Try again.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congratulations! You minted ${mintAmount} ${CONFIG.NFT_NAME}!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const handleAbout = () => {
    aboutRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleFaq = () => {
    faqRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleMint = () => {
    mintRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleTwitter = () => {
    window.open(
      'https://twitter.com/PunksShibarium',
      '_blank'
    );
  };

const handleCollection = () => {
    window.open(
      'https://wallet.shibariumpunks.net/',
      '_blank'
    );
  };



  const handleTelegram = () => {
    window.open(
      'https://t.me/PunksShibarium',
      '_blank'
    );
  };


  return (
    <s.Screen>

      <div className="main" style={{display:"flex", 
      backgroundImage: `url(${background})`,
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      flex: "1",
      ai: "1"
       }}>

<s.Container
        ai={"center"}>

        <div className="nav" style={{display:"flex"}}>
          <div className="logo">
       <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
              }}
            >
              Shibarium Punks
       </s.TextNav>
          </div>
          
          <div className="bar" style={{display:"flex", marginLeft: "600px"}}>
          <div className="option1" onClick={handleAbout}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              About
       </s.TextNav>
          </div>

          <div className="option2" style={{marginLeft:"0px"}} onClick={handleCollection}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              My Collection
       </s.TextNav>
          </div>

          <div className="option3" style={{marginLeft:"0px"}} onClick={handleFaq}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              FAQ
       </s.TextNav>
          </div>
          </div>  
       </div>
   

       <s.SpacerLargeX />
       <s.SpacerMedium />

       <s.TextTitle 
       style={{
          fontSize: 35
       }}>
          The first Punks NFTs
        </s.TextTitle>
        <s.SpacerMedium />
        <s.TextTitle
        style={{
          fontSize: 35
       }}>
          on the <b>Shibarium</b> blockchain
        </s.TextTitle>

        <s.SpacerLargeX />
        <s.SpacerMedium />

        <StyledImg
        src={"/config/images/banner.png"}
        >

        </StyledImg>


        <s.SpacerLargeX />
        <s.SpacerMedium />

        <StyledButton onClick={handleMint}
        style={{
              boxShadow: "2px 5px 5px 4px rgba(0,0,0,0.2)",
              width: "315px",
              padding: 20
            }}
            >
            MINT NOW
        </StyledButton>
      
        <s.SpacerLargeXX />
        <s.SpacerLargeX />

        <div class="mint">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/56.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/21.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/56.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/21.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/56.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/21.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>

      </div>
      </div>
      </div>
      
      <s.SpacerLargeXX />

      <div className="about" ref={aboutRef}> 
      <s.SpacerLargeX />
      
      <s.TextTitle 
      style={{
        textAlign: "center"
      }}
      >
        What is Shibarium Punks?
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100
      }}
    >
The Shibarium Punks is a NFT collection of 24x24 pixelated artworks generated algorithmically living on the Shibarium Network that merge the concepts of the original Punks project with the artwork and community of the Shiba Ecosystem.
      </s.TextSubTitle>
      <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 140,
        marginRight: 140
      }}
    >
  This collection is formed with 5555 Male-based Punks and 5555 Female-based Punks that will be minted in different phases. Among them, rare skins such as zombies, apes and aliens will be mixed!
</s.TextSubTitle>

<s.SpacerLargeXX />
<div className="phases" style={{display:"flex", alignContent: "center"}} ai={"center"}>
<div style={{marginLeft:"250px"}} >
<s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 29
      }}
      >
        1° Mint Phase
      </s.TextTitle>
      <s.SpacerMedium />
      <s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 35
      }}
      >
        <b>Shibarium</b> Punks
      </s.TextTitle>
      
      <s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 20
      }}
      >
        (Male-based)
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.SpacerLarge />
  <StyledImg
        src={"/config/images/1mintphase.png"}
        style={{
          width: "510px",
          height: "560px",
          marginLeft: "30px"
        }}
        
        />
        </div>
        <div style={{
          marginTop: "3px",
          marginLeft: "270px"
        }}>
        <s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 29
      }}
      >
        2° Mint Phase
      </s.TextTitle>
      <s.SpacerMedium />
      <s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 35
      }}
      >
        <b>Shibarium</b> Punks
      </s.TextTitle>
      
      <s.TextTitle 
      style={{
        textAlign: "center",
        fontSize: 20
      }}
      >
        (Female-based)
      </s.TextTitle>
      <s.SpacerLargeXX />
      <s.SpacerLarge />
        <StyledImg
        src={"/config/images/2mintphase.png"}
        style={{
          width: "550px",
          height: "560px",
          marginTop: "-80px",
          marginLeft: "5px"
        }}
        
        /></div>

</div>
<s.SpacerLargeXX />
<s.SpacerLargeX />
<s.TextTitle 
      style={{
        textAlign: "center",
        letterSpacing: 8
      }}
      >
        Team
      </s.TextTitle>
      <s.SpacerLarge />

      <div className="team" style={{display:"flex"}}>
      <div class="tm">
      <StyledImg
        src={"/config/images/dev.png"}
        style={{
          width: "300px",
        }}
        
        />

    <s.SpacerMedium />
        <s.TextSubTitle
        style={{
          fontSize: 35,
          color: "var(--shib)"
        }}>
          Tommy
        </s.TextSubTitle>
        <s.TextSubTitle
        style={{
          fontSize: 15,
        }}>
          Developer
        </s.TextSubTitle>
      </div>
      <div class="tm">
      <StyledImg
        src={"/config/images/cm.png"}
        style={{
          width: "300px",
        }}
        
        />
      <s.SpacerMedium />
        <s.TextSubTitle
        style={{
          fontSize: 35,
          color: "var(--shib)"
        }}>
          Stryker
        </s.TextSubTitle>
        <s.TextSubTitle
        style={{
          fontSize: 15,
        }}>
          Community Manager
        </s.TextSubTitle>
      </div>
      <div class="tm">
      <StyledImg
        src={"/config/images/des.png"}
        style={{
          width: "300px",
        }}
        
        />
      <s.SpacerMedium />
        <s.TextSubTitle
        style={{
          fontSize: 35,
          color: "var(--shib)"
        }}>
          Harrison
        </s.TextSubTitle>
        <s.TextSubTitle
        style={{
          fontSize: 15,
        }}>
          Designer
        </s.TextSubTitle>
      </div>
      

      </div>

</div>

<s.SpacerLargeXX />
<s.SpacerLargeX />

<div class="mint">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/punks/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/36.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/48.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/97.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
 <div class="slide">
          <StyledImg3
            src={"/config/punks/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/36.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/48.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/97.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
 <div class="slide">
          <StyledImg3
            src={"/config/punks/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/36.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/48.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/97.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>

      </div>
      </div>
      </div>

      
<s.SpacerLargeXX />
<div ref={mintRef}>
<s.SpacerLargeX />
<s.SpacerLarge />


<ResponsiveWrapper flex={1} style={{ }} mint>
        
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 24,
          }}
        >
           
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ marginTop: "-50px" }}>
          <s.TextSubTitle2
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: 1000,
              letterSpacing: 12,
              color: "var(--secondary-text)",
            }}
          >
            First Phase Live
          </s.TextSubTitle2>
          <s.SpacerLargeX />

          <StyledImg2 
            src={"/config/images/gif.gif"}
          />

          </s.Container>
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
       
          </s.TextTitle>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
         <s.SpacerLargeX />
         
          </s.TextDescription>
          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
             <s.SpacerXSmall />
              <s.TextTitle
                style={{ textAlign: "center", color: "var(--accent-text)" }}
              >
                The sale has ended.
              </s.TextTitle>
              
            </>
          ) : (
            <>
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 25 }}
              >
                
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </s.TextTitle2>
              <s.SpacerLargeX />
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 28 }}
              >
                Mint price is 8 <b>$BONE</b>
              </s.TextTitle2>
              <s.SpacerLargeX />
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  
                  <StyledButton2
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                    style={{ marginLeft: "-8px" }}
                  >
                    CONNECT
                  </StyledButton2>
                  

                  {blockchain.errorMsg !== "" ? (
                    <>
                  <s.SpacerLargeX />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          letterSpacing: 2
                        }}
                      >
                        
                      Shibarium network is currently clogged
                      </s.TextDescription>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          letterSpacing: 2
                        }}
                      >
                        
                        Please wait for official announcements
                      </s.TextDescription>
                      
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledRoundButton2
                      style={{ lineHeight: 0.4, color: "var(--primary)"}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}
                    >
                      -
                    </StyledRoundButton2>
                    <s.SpacerMedium />
                    
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)"
                      }}
                    >
                      {mintAmount}
                    </s.TextDescription>
                    
                    <s.SpacerMedium />
                    <StyledRoundButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}
                      style={{
                        color: "var(--primary)"
                      }}
                    >
                      +
                    </StyledRoundButton2>
                  </s.Container>
                  
                  <s.SpacerSmall />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                    >
                      {claimingNft ? "WAIT" : "MINT"}
                    </StyledButton2>
                    
                  </s.Container>
                </>
              )}
            </>
          )}
        </s.Container>
      </ResponsiveWrapper>

      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />



      <div className="mint">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/56.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/21.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
 <div class="slide">
          <StyledImg3
            src={"/config/punks/33.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/41.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/36.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/48.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/97.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/54.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/52.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/46.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/40.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/12.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/13.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/15.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/49.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/50.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/51.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/56.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/34.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/38.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/53.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/16.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/21.png"}
          />
          </div>
<div class="slide">
          <StyledImg3
            src={"/config/punks/35.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/14.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/55.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/57.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/95.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/103.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/punks/43.png"}
          />
          </div>


      </div>
      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />
      
      <div className="faq">
      <s.TextTitle
      style={{
        textAlign: "center",
        fontSize: 40,
        fontWeight: 1000,
        letterSpacing: 25,
      }}
    >
        FAQ
      </s.TextTitle>

      <s.SpacerLargeX />
      <s.SpacerSmall />

      <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 30,

          }}
          
        >
          

      <div class="accordion" ref={faqRef}>

        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}

    </div>

    <s.SpacerLargeXX />

    <div className="networks" style={{display:"flex", cursor: "pointer"}} >
    <div className="network1" onClick={handleTelegram}>
    <StyledLogo
    src={"/config/images/tg.png"}
    style={{
      width: "100px",
      marginRight: "70px",
      marginLeft: "-30px"
    }}
    />
    </div>
    <div className="network2" onClick={handleTwitter}>
    <StyledLogo
    src={"/config/images/tw.png"}
    style={{
      width: "100px",
    }}
    />
    </div>
    </div>

    <s.SpacerLargeXX />
    </s.Container>
    </div>

</div>

<s.SpacerLarge />

</s.Container>
      </div>
    </s.Screen>
  );
}

export default App;
