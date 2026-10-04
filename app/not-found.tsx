import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <h1 className="text-5xl text-moss">Page not found</h1>
      <Link href="/shop" className="btn btn-primary mt-8">Back to shop</Link>
    </div>
  )
}
