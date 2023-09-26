'use client';
import { useIntl } from 'react-intl';

export default function ExampleClientComponent() {
  const intl = useIntl();

  return (
    <h2>
      {intl.formatMessage({ id: 'homepage_subheader' })}
    </h2>
  );
}