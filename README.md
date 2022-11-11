This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Install the dependencies:

`npm install`

Set the environment variables:

`open .env and modify the environment variables`

Set up .secret:

` open .secret and add your private keys`

Change hardhat network configuration:

`Open hardhat.config.js`
`Change networks.polygon_mumbai.url to your Alchemy API URL`

Deploy the smart contract:

`npm run deploy:polygon`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`
