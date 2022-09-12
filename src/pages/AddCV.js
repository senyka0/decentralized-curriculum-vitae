import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import DefiCV from "../artifacts/contracts/DefiCV.sol/DefiCV.json";
const contractAddress = "0xb29cb271a2435518B288cC629FCC20eFbAC6dC7a";

export const AddCV = () => {
  const connect = async () => {
    if (window.ethereum) {
      if (window.ethereum.networkVersion !== 4) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }],
          });
        } catch (err) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: "Rinkeby Test Network",
                  chainId: "0x4",
                  nativeCurrency: { name: "RinkebyETH", decimals: 18, symbol: "RinkebyETH" },
                  rpcUrls: ["https://rinkeby.infura.io/v3/"],
                },
              ],
            });
          }
        }
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
    }
  };

  const post = async (event) => {
    event.preventDefault();
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, DefiCV.abi, signer);
      const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: "Basic MkU3akxFVEFrczdiTUQ2dVJZQmllZUJ0V3YzOjY2OGZmZTA1MjJkY2UyNTUyMWMxYWI4NzJiZGEyNzc0",
        },
      });
      const hash = await client.add(
        JSON.stringify({
          fullName: event.target[0].value,
          profession: event.target[1].value,
          skills: event.target[2].value,
          country: event.target[3].value,
          bio: event.target[4].value,
          status: event.target[5].value,
        })
      );
      const transaction = await contract.addCV(hash.path, `${new Date().getTime()}`);
      await transaction.wait(1);
    }
  };
  const [Connected, setConnected] = useState(false);
  return (
    <div className="AddCV">
      <div>
        <article>
          <h4 className="text-center">Your CV</h4>

          <form onSubmit={(e) => post(e)}>
            <div>
              <div className="col">
                <label>Full name:</label>
                <input type="text" className="form-control" placeholder="Arsenii Koniachenko" name="fullName" required />
              </div>

              <div className="col">
                <label>Profession:</label>
                <input type="text" className="form-control" placeholder="Blockchain Developer" name="profession" required />
              </div>

              <div className="col">
                <label>Skills:</label>
                <input type="text" className="form-control" placeholder="Node.js, Solidity, Python" name="skills" required />
              </div>
              <div className="col">
                <label>Country:</label>
                <input type="text" className="form-control" placeholder="Portugal" name="country" required />
              </div>
              <div className="col">
                <label>Bio:</label>
                <input type="text" className="form-control" placeholder="Hi, my name is Arsenii, I'm junior full-stack blockchain developer..." name="bio" required />
              </div>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select className="form-control" name="status" required>
                <option>Select...</option>
                <option>✅ Actively looking</option>
                <option>🤔 Open to offers</option>
                <option>⛔️ Not available</option>
              </select>
              <br />
              <div className="submit">
                {Connected ? (
                  <Button type="submit" variant="success">
                    Post my resume !
                  </Button>
                ) : (
                  <Button onClick={() => connect()} variant="secondary">
                    Connect wallet
                  </Button>
                )}
              </div>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};
