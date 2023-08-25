'use client';

import { Metadata } from 'next';

export const metaData: Metadata = {
  title: 'Ошибка',
};

export default function ErrorWrapper({ error }: { error: Error }) {
  return (
    <div>
      <h3>Произошла ошибка: {error.message}</h3>
    </div>
  );
}
