export function arePathnamesEqual(pathnameA: string, pathnameB: string) {
  return stripLeadingAndTrailingSlashes(pathnameA) === stripLeadingAndTrailingSlashes(pathnameB)
}

export function stripLeadingAndTrailingSlashes(pathname: string): string {
  return stripLeadingSlash(stripTrailingSlash(pathname))
}

export function stripLeadingSlash(pathname: string) {
  if (pathname.startsWith('/')) pathname = pathname.slice(1)
  return pathname
}

export function stripTrailingSlash(pathname: string) {
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  return pathname
}
