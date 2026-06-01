export const config = { matcher: '/:path*' }

export default function middleware(request) {
  const auth = request.headers.get('Authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      try {
        const decoded     = atob(encoded)
        const colonIndex  = decoded.indexOf(':')
        const password    = decoded.slice(colonIndex + 1)
        if (password === process.env.SITE_PASSWORD) {
          return // allow through
        }
      } catch (e) {}
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CTE Curriculum Hub"',
    },
  })
}
