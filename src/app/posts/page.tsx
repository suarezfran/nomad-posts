import prisma from '@/lib/prisma'
import PostsLayout from '@/components/PostsLayout'

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      user: true
    },
  })

  return <PostsLayout posts={posts} />
}
