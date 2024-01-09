//TODO Remove this
// In here we can add any reusable type or interface

export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface NpmData {
  version: string;
}
