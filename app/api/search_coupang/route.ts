import { NextRequest } from 'next/server';
import { getKeywordSearchResult } from './utils';

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword') as string;
  const searchResult = await getKeywordSearchResult(keyword);
  return Response.json(searchResult);
}
