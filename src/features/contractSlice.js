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
		const sdk = new ThirdwebSDK(provider);
		sdk.updateSignerOrProvider(signer);

		console.log('signer', provider.getSigner())

		// const contract = await sdk.getContractFromAbi(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi);
    const contract = await sdk.getContractFromAbi("0xE82EF42877F6f02EAf9072F4553F73b6B7326909", contractABI.abi);
    
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