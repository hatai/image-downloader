import { configure } from '@storybook/react';
import '@storybook/addon-console';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
