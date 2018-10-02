import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered'

import Card from '../src/components/Card'
import Header from '../src/components/Header'

storiesOf('Card', module)
  .addDecorator(centered)
  .add('checked: true', () => (
    <Card
      image={'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg'}
      title={'Dummy'}
      checked={true}
      onEyeButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />)
  )
  .add('checked: false', () => (
    <Card
      image={'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg'}
      title={'Dummy'}
      checked={false}
      onEyeButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />)
  )


storiesOf('Header', module)
  .add('default', () => (
    <Header/>
  ))