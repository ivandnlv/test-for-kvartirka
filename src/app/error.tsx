'use client';

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h3>Произошла ошибка {error.message}</h3>;
}
