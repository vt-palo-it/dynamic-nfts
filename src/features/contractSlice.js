import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from "ethers"
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import contractABI from '../artifacts/contracts/DynamicNFT003.sol/DynamicNFT002.json'


const initialState= {
	'isPending' : false,
	'contract' : null,
	'error' : ''
}

export const initContractAsync = createAsyncThunk(
  'contract/init',
  async () => {
		console.log('initializing contract')
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		// const sdk = new ThirdwebSDK('rinkeby');
    const sdk = new ThirdwebSDK(provider);
		sdk.updateSignerOrProvider(signer);

		console.log('signer', provider.getSigner())

		// const contract = await sdk.getContractFromAbi(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi);
    // const contract = await sdk.getContractFromAbi("0x4ed7aAf8bD9c5bDC713B72329Cc7E249996453E4", contractABI.abi);   // Boxes
    const contract = await sdk.getContractFromAbi("0x6fbC28Db927116E54a51f39b78e098023529Fb02", contractABI.abi);   // Boxes
    // const contract = await sdk.getContractFromAbi("0xfcEE8c419DC169201104d31CB987d55BA0333e8f", contractABI.abi);   // Leviathans

		console.log('contract', contract);
    return contract;
  }
);


export const contractSlice= createSlice({
  name: 'contract',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(initContractAsync.pending, (state) => {
        state.isPending = true;
      })
      .addCase(initContractAsync.fulfilled, (state, action) => {
        state.isPending = false;
        state.contract = action.payload;
      })
      .addCase(initContractAsync.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      })
  },
})

export const getContract = (state) => state.contract.contract;

export default contractSlice.reducer;