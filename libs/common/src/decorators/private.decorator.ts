import { SetMetadata } from '@nestjs/common';

export const PRIVATE_ACCESS_KEY = 'PRIVATE ACCESS';
export const Private = () =>
  SetMetadata<string, boolean>(PRIVATE_ACCESS_KEY, true);
