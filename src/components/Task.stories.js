import Task from "./Task";

// To tell Storybook about the component we are documenting, we create a default export that contains:
export default {
  component: Task, // the component itself
  title: "Task", // how to refer to the component in the sidebar of the Storybook app
};

const Template = (args) => <Task {...args} />;

// To define our stories, we export a function for each of our test states to generate a story.
// The story is a function that returns a rendered element in a given state.
// Task’s three test states in the story file:
export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};

// Each "Component" might have multiple "Stories".
// - Component
//   - Story
//   - Story
//   - Story
