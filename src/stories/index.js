import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import swal from 'sweetalert2';

import Card from '../components/Card';
import Header from '../components/Header';
import GridLayout from '../components/GridLayout';
import Loader from '../components/common/Loader';
import color from '../utils/colors';

storiesOf('Loader', module)
  .addDecorator(centered)
  .add('default', () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: color.baseBgColor,
        padding: 10
      }}
    >
      <Loader />
    </div>
  ));

storiesOf('Card', module)
  .addDecorator(centered)
  .add('checked: true', () => (
    <Card
      src={
        'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg'
      }
      title={'Dummy'}
      checked={true}
      onZoomButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />
  ))
  .add('checked: false', () => (
    <Card
      src={
        'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg'
      }
      title={'Dummy'}
      checked={false}
      onZoomButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />
  ))
  .add('loading', () => (
    <Card
      src={''}
      title={'Dummy'}
      checked={false}
      onZoomButtonClick={action('Eye Button clicked')}
      onDownloadButtonClick={action('download clicked')}
      onCheckboxClick={action('checkbox clicked')}
    />
  ));

storiesOf('Header', module).add('default', () => (
  <div style={{ height: '3000px' }}>
    <Header />
  </div>
));

storiesOf('GridLayout', module).add('default', () => (
  <div style={{ width: '100%', background: color.baseBgColor, padding: 10 }}>
    <GridLayout>
      {[
        'https://i.pinimg.com/originals/0c/da/23/0cda2360f6f0200cd2547e7ad77a7eb5.jpg',
        'https://i.pinimg.com/564x/93/ad/81/93ad81d98c2c6d57a27a8d24c1cc1f0a.jpg',
        'https://i.pinimg.com/564x/18/67/a0/1867a0cd04b06886e36b37045c918c5a.jpg',
        'https://i.pinimg.com/564x/0f/a0/6a/0fa06aff008a84739d711bc513ad10b8.jpg',
        'https://i.pinimg.com/564x/3d/95/0b/3d950ba07cdfbe60d18ddf878a859792.jpg',
        'https://i.pinimg.com/564x/2c/8c/54/2c8c54b4c183830ff0f0ebe2e2881468.jpg',
        'https://i.pinimg.com/564x/42/a2/b9/42a2b9f9b1a30026b3306c2e75d5846d.jpg',
        'https://i.pinimg.com/564x/11/6c/21/116c21f44e2a62c5bbcfd8615c589876.jpg',
        'https://i.pinimg.com/564x/0d/b0/78/0db078f1ed4572f1d1093839efd78680.jpg',
        'https://i.pinimg.com/564x/0d/82/5d/0d825d69772ebe6aa69184b4d60a01fa.jpg',
        'https://i.pinimg.com/564x/04/0a/84/040a848dc43994acf9724959f1a98151.jpg',
        'https://i.pinimg.com/564x/ba/b0/e8/bab0e8fe5a9c615be7b7ea97c7cddae2.jpg',
        'https://i.pinimg.com/564x/cb/dd/f5/cbddf5ec1f2eed19d83e45a233bc9e2d.jpg',
        'https://i.pinimg.com/564x/00/55/d1/0055d1e21f2e0d4152be9ed25f08d42c.jpg'
      ].map((url, i) => (
        <Card
          key={i}
          src={url}
          title={'Dummy'}
          checked={false}
          onZoomButtonClick={() => {
            swal({
              showConfirmButton: false,
              background: `rgba(0,0,0,0)`,
              imageUrl: url,
              animation: false
            });
            action(`Eye Button clicked: ${i}, ${url}`);
          }}
          onDownloadButtonClick={action('download clicked')}
          onCheckboxClick={action('checkbox clicked')}
        />
      ))}
    </GridLayout>
  </div>
));
