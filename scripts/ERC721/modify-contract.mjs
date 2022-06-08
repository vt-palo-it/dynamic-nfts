import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const CONTRACT_META = process.env.CONTRACT_META;

let rawdata = fs.readFileSync('./assets_contract.json');
let assets = JSON.parse(rawdata);

fs.readFile('./contracts/ContractSend.sol', 'utf-8', function(err, data) {
    if (err) throw err;
 
    let newValue = data.replace('ContractName000000', assets.contract_name);
    newValue = newValue.replace('Collection Name', assets.name);
    newValue = newValue.replace('CLN', assets.collection_token);
    newValue = newValue.replace('ipfs://metadata.json', CONTRACT_META);

    fs.writeFile('./contracts/ContractSend.sol', newValue, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log(assets.contract_name);
    })
})