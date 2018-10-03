import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered'

import swal from 'sweetalert2'

import Card from '../components/Card'
import Header from '../components/Header'
import GridLayout from '../components/GridLayout'
import color from '../utils/colors'

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

storiesOf('GridLayout', module)
  .add('default', () => (
    <div style={{width: '100%', background: color.baseBgColor, padding: 10}}>
      <GridLayout>
        {[
          'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/4_7bzdpau50w.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/6_zbg37s0dm6.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/7_alujs5dejj.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/9_0k6g2n9usi.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/10_jxq9j9273h.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/11_i4om89kx7e.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/12_6wtd5uhm7u.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/13_nmqj4dvt62.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/14.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/16.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/18.jpg',
          'http://img.moeimg.net/wp-content/uploads/archives12/12246/21.jpg',
        ].map(url => (
          <Card
            image={url}
            title={'Dummy'}
            checked={false}
            onEyeButtonClick={() => {
              swal({
                showConfirmButton: false,
                background: `rgba(0,0,0,0)`,
                imageUrl: url,
                animation: false,
              })
              action('Eye Button clicked')
            }}
            onDownloadButtonClick={action('download clicked')}
            onCheckboxClick={action('checkbox clicked')}
          />
        ))}
      </GridLayout>
    </div>
  ))