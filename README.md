<h1 align="center">Next.js SPA</h1>
<div align="center">

A staring point for your next Single Page App with [Next.js](https://nextjs.org/)

[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/jeff-li/nextjs-spa-runway/branch/master/graph/badge.svg?token=qQds3epbPj)](https://codecov.io/gh/jeff-li/nextjs-spa)
[![Node Unit Tests](https://github.com/jeff-li/nextjs-spa-runway/actions/workflows/unit_test.yml/badge.svg)](https://github.com/jeff-li/nextjs-spa-runway/actions/workflows/unit_test.yml)

</div>

This project is a template for creating SPAs or "Hybrid SPAs". It uses the popular React Router for client-side routing, as we as utilizes Next's built-in router for both [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) and  [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering).


The project was originally bootstrapped by [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). So all modifications should work for your typical Next.js app after v9.5.


## Features

✅  [ESLint ](https://eslint.org/)  
✅  [Prettier](https://prettier.io/)  
✅  Type and ESlint checking in development with [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)  
✅  [Typescript](https://www.typescriptlang.org/)  
✅  [React Router v6](https://reactrouter.com/) for client-side routing  
✅  [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing (transforming with [ts-jest](https://kulshekhar.github.io/ts-jest/))  
✅  [SWC](https://swc.rs/) for faster code transformation and minification  

Please feel free to remove features that's not needed in your project.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Type and ESlint Checking in Development
Next.js disabled type checking for development after version 9.3.6 in order to improve performance and dev experience. However some people still prefer having this feature enabled for their development process, so that they can discover issues sooner and fix them without running `npm run build` repeatedly.

This project uses a custom webpack configuration to run both type and Eslint checking during development. However, it increases development rebuild times significantly. If you prefer, you can easily remove this configuration in `next.config.js` and uninstall `fork-ts-checker-webpack-plugin`. 
```js
if(!isServer) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    config.plugins.push(new ForkTsCheckerWebpackPlugin({
        eslint: {
            files: './src/**/*.{ts,tsx,js,jsx}'
        }
    }))
}
```

Alternative you can run also run typescript compiler separately instead to achieve the same goal without installing another dependency
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:ts": "npm run dev & npm run ts:watch",
    "ts": "tsc --noEmit --incremental",
    "ts:watch": "npm run ts --watch"
  },
}
```

## Type Checking in Testing
This project uses `ts-jest` in `transform` to compile typescript files because `babel-jest` is purely transpilation and does not type-check results. You can remove all ts-jest related configurations if you prefer `babel-jest`,


## Fix Build Errors by Using `.page.tsx` [Custom Page Extensions](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)
Next.js suggests following Jests convention of adding tests to the `__tests__` folder in the root directory. This project however places test files next to their related code. `next build` does not filter out `.test.tsx` files automatically and will raise errors, because the build process recognizes them as a React components and tries to compile them with other `.tsx` files. So the work-around is adding custom page extension `.page.tsx` to actual React components, it will tell `next` to ignore other non-page files.

### Alternative Solution
If you want to have a `__tests__` folder for each page folder, you can add the following config to your `next.config.js`
```js
config.plugins.push(
  new webpack.IgnorePlugin({
    resourceRegExp: /.*/,
    contextRegExp: /__tests__/,
  })
);
```

## Customization For SPA
1. Add `typeof window === 'undefined'` in `pages/_app.page.tsx` to make sure `window` is defined before rendering the app (essentially avoid rendering on the server).
2. Use built-in attribute `suppressHydrationWarning` to remove the warning from mis-matching "re-hydration"

example:
 ```js
 import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : <Component {...pageProps} />}
  </div>
)

export default App
 ```
3. Add `rewrites` in `next.config.js` to redirect all routes to `'/'` so that it can be handled by React Router.
```js
module.exports = {
  async rewrites() {
    return [{
      source: '/:any*',
      destination: '/',
    }];
  },
};
```

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the application for production usage<br />

### `npm start`

Starts a Next.js production server<br />

### `npm run lint`

Sets up Next.js' built-in ESLint configuration<br />
