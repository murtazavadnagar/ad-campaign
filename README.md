# ad-campaign

## Available Scripts

In the project directory, you can run:

### `yarn install`

To install npm packages

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\


### window.AddCampaigns

Open your browser and run the below code in it to test bulk add campaigns

AddCampaigns([
  { id: 100, name: "NewCampaign1", startDate: "2024-02-15", endDate: "2025-03-01", Budget: 1250000, userId: 7 },
  { id: 101, name: "NewCampaign2", startDate: "2024-05-10", endDate: "2025-07-15", Budget: 450000, userId: 2 }
]);
