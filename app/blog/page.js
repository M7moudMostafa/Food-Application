import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main>
        <h1>Blog Page</h1>
        <Link href="/blog/1">Blog 1</Link>
        <br />
        <Link href="/blog/2">Blog 2</Link>
    </main>
  )
}

export default page