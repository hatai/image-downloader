import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import centered from '@storybook/addon-centered'

import { Button, Welcome } from '@storybook/react/demo'

import Card from '../components/Card'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))


storiesOf('Components', module)
  .addDecorator(centered)
  .add('Card', () => (
    <Card
      image={'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg'}
      title={'Dummy'}
      onEyeButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />)
  )