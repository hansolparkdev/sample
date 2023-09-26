import React from 'react'
import ExampleClientComponent from './components/ExampleClientComponent';
import getIntl from '@/app/intl'
export default async function Home () {
  const intl = await getIntl('home');
  return (
    <main>
      <h1>{intl.formatMessage({ id: 'homepage_header' })}</h1>
      <ExampleClientComponent />
    </main>
  );
}