import { rest } from "msw";
import { Provider } from "react-redux";
import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";

import store from "../lib/store";
import InboxScreen from "./InboxScreen";
import { MockedState } from "./TaskList.stories";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
// parameters: a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.
Default.parameters = {
  // Mock Service Worker is an API mocking library. It relies on service workers to capture network requests and provides mocked data in responses.
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.json(MockedState.tasks));
        }
      ),
    ],
  },
};

// * INTERACTION TEST
// A play function includes small snippets of code that run after the story renders.
// we can write stories with the play function to interact with the UI and simulate human behavior no matter the frontend framework.
// HOWEVER, it only runs the interaction tests when viewing the story. Therefore, we'd still have to go through each story to run all checks if we make a change. (can be AUTOMATED by test-storybook)
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Waits for the component to transition from the loading state
  await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
  // Waits for the component to be updated based on the store
  await waitFor(async () => {
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText("pinTask-1"));
    // Simulates pinning the third task
    await fireEvent.click(canvas.getByLabelText("pinTask-3"));
  });
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};
