import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ListGroup from "react-bootstrap/ListGroup";
import DefiCV from "../artifacts/contracts/DefiCV.sol/DefiCV.json";

export const CIDs = () => {
  useEffect(() => {
    list();
  }, []);
  const { address } = useParams();
  const [CID, setCID] = useState([]);
  const date = (time) => {
    const d_t = new Date(+time);
    let year = d_t.getUTCFullYear();
    let month = ("0" + (d_t.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + d_t.getUTCDate()).slice(-2);
    let hour = d_t.getUTCHours();
    let minute = d_t.getUTCMinutes();
    let seconds = d_t.getUTCSeconds();
    return "UTC: " + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + "0" + seconds;
  };
  const list = async () => {
    const contractAddress = "0x53C689C056D9b8523992d4C77Bab8E9736Fd0a11";
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/c0c87d279cb240ff8036c2f999a0ce14");
    const contract = new ethers.Contract(contractAddress, DefiCV.abi, provider);
    setCID(await contract.getUser(address));
  };
  return (
    <div>
      <ListGroup className="list" variant="flush">
        {CID.map((item) => {
          return (
            <ListGroup.Item className="listItem" key={item[0]} action>
              <Link className="listLink" to={`/CVs/${address}/${item[0]}`}>
                <p>
                  {date(item[1])} => {item[0]}
                </p>
              </Link>
            </ListGroup.Item>
          );
        }).reverse()}
      </ListGroup>
    </div>
  );
};
