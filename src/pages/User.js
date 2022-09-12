import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { create } from "ipfs-http-client";
import { concat } from "uint8arrays";

export const User = () => {
  const { address, cid } = useParams();
  const [data, setdata] = useState({});
  useEffect(() => {
    call(address, cid);
  }, []);
  const call = async (address, cid) => {
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: "Basic MkU3akxFVEFrczdiTUQ2dVJZQmllZUJ0V3YzOjY2OGZmZTA1MjJkY2UyNTUyMWMxYWI4NzJiZGEyNzc0",
      },
    });
    const ipfile = [];
    for await (const chunk of client.cat(cid)) {
      ipfile.push(chunk);
    }
    const decodedData = JSON.parse(new TextDecoder().decode(concat(ipfile)).toString());
    setdata(decodedData);
    console.log(decodedData);
  };

  return (
    <div className="User">
      <h6 className="text-center">CV: {cid}</h6>
      <h6 className="text-center">Owner: {address}</h6>
      <div>
        <div className="col">
          <h5>Full name: {data.fullName}</h5>
        </div>
        <div className="col">
          <h5>Profession: {data.profession}</h5>
        </div>
        <div className="col">
          <h5>Skills: {data.skills}</h5>
        </div>
        <div className="col">
          <h5>Country: {data.country}</h5>
        </div>
        <div className="col">
          <h5>Bio: {data.bio}</h5>
        </div>
        <div>
          <h5>Status: {data.status}</h5>
        </div>
      </div>
    </div>
  );
};
