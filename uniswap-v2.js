const Uniswap = require('@uniswap/sdk');
const chainID = Uniswap.ChainId.MAINNET;

const usdtAddress= '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const decimals = 6;

const USDT = new Uniswap.Token(chainID, usdtAddress, decimals, 'USDT', 'Tether USDT');

async function getPair() {
    const pair = await Uniswap.Fetcher.fetchPairData(USDT, Uniswap.WETH[chainID]);
   // console.log(pair);
   const route = new Uniswap.Route([pair], Uniswap.WETH[chainID]);
   let amount = new Uniswap.TokenAmount(Uniswap.WETH[chainID], 1000000000000000000);
   const trade = new Uniswap.Trade(route, amount, Uniswap.TradeType.EXACT_INPUT);

   //PRECIO PROMEDIO
   let ETH_USDT_midprice = route.midPrice.toSignificant(6);
   let USDT_ETH_midprice = route.midPrice.invert().toSignificant(6);

   console.log("PRECIO PROMEDIO DE 1 ETH: ", ETH_USDT_midprice, 'USDT');
   console.log("PRECIO PROMEDIO DE 1 USDT: ", USDT_ETH_midprice, 'ETH');

   //PRECIO DE EJECUCION
   let ETH_USDT_execprice = trade.executionPrice.toSignificant(6);
   let USDT_ETH_execprice = trade.executionPrice.invert().toSignificant(6);

   console.log("PRECIO DE EJECUCION 1 ETH: ", ETH_USDT_execprice, 'USDT');
   console.log("PRECIO DE EJECUCION 1 USDT: ", USDT_ETH_execprice, 'ETH');
}


getPair();


async function trade() {
    const pair = await Uniswap.Fetcher.fetchPairData(USDT, Uniswap.WETH[chainID]);
    // console.log(pair);
    const route = new Uniswap.Route([pair], Uniswap.WETH[chainID]);
    let amount = new Uniswap.TokenAmount(Uniswap.WETH[chainID], 1000000000000000000);
    const trade = new Uniswap.Trade(route, amount, Uniswap.TradeType.EXACT_INPUT);

    const slippageTolerance = new Uniswap.Percent('50', '1000'); //bips 1 bip -> 0.01% 50 bips -> 0.5%
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const path = [Uniswap.WETH[chainID].address, USDT.address];
    const to = '';

    const deadline = Math.floor(Date.now()/1000) + 60 * 20; // 20 minutos desde Unixtime

    const value = trade.inputAmount.raw;

 
}

trade();