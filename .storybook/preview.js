// Registers the msw addon
import { initialize, mswDecorator } from "msw-storybook-addon";

import "../src/index.css";

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

// used to control the behavior of Storybook's features and addons.
//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }, // allows us to create callbacks that appear in the actions panel of the Storybook UI when clicked.
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
