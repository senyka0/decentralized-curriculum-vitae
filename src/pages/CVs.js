import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import ListGroup from "react-bootstrap/ListGroup";
import DefiCV from "../artifacts/contracts/DefiCV.sol/DefiCV.json";

export const CVs = () => {
  useEffect(() => {
    list();
  }, []);
  const [adressList, setadressList] = useState([]);
  const list = async () => {
    const contractAddress = "0xb29cb271a2435518B288cC629FCC20eFbAC6dC7a";
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/c0c87d279cb240ff8036c2f999a0ce14");
    const contract = new ethers.Contract(contractAddress, DefiCV.abi, provider);
    setadressList(await contract.getUserAdresses());
  };
  return (
    <div>
      <ListGroup className="list" variant="flush">
        {adressList
          .map((item) => {
            return (
              <ListGroup.Item className="listItem" key={item} action>
                <Link className="listLink" to={`/CVs/${item}`}>
                  {item}
                </Link>
              </ListGroup.Item>
            );
          })
          .reverse()}
      </ListGroup>
    </div>
  );
};
