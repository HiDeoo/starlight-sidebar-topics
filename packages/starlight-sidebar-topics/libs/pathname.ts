export function arePathnamesEqual(pathnameA: string, pathnameB: string) {
  return stripLeadingAndTrailingSlashes(pathnameA) === stripLeadingAndTrailingSlashes(pathnameB)
}

function stripLeadingAndTrailingSlashes(pathname: string): string {
  return stripLeadingSlash(stripTrailingSlash(pathname))
}

function stripLeadingSlash(pathname: string) {
  if (pathname.startsWith('/')) pathname = pathname.slice(1)
  return pathname
}

function stripTrailingSlash(pathname: string) {
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  return pathname
}
