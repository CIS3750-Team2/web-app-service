# CIS3750 Web App

#### Developing
For development:
1. Clone repo.
2. Copy `.env.sample` into `.env` and configure it as required.
3. Run `yarn`.
4. Start the development server using `yarn dev`.

#### Building and Deploying
For a production ready build and server:
1. Clone repo.
2. Copy `.env.sample` into `.env` and configure it as required.
3. Run `yarn`, then either (a) build the files locally or (b) let the server build the files.  

For a locally built production server:
* Use `yarn prod` to build the `dist` folder then run the production server and serve the `dist` folder.  

For building and running a production server:
* Use `yarn build` to build the dist folder locally then use `yarn server` to run the production server.
