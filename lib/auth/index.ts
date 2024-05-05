import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const BASE_PATH = '/api/auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: BASE_PATH,
  providers: [Google],
  adapter: PrismaAdapter(prisma),
});
