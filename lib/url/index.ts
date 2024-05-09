import { headers } from 'next/headers';

export function getUrl() {
  return new URL(headers().get('x-url')!);
}
