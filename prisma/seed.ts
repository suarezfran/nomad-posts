import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface UserData {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface PostData {
  id: number
  userId: number
  title: string
  body: string
}

async function fetchUsers(): Promise<UserData[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

async function fetchPosts(): Promise<PostData[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

async function seedUsers(users: UserData[]) {
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      },
      create: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      },
    })

    // Create address record
    await prisma.address.upsert({
      where: { userId: user.id },
      update: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      },
      create: {
        userId: user.id,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      },
    })

    // Create company record
    await prisma.company.upsert({
      where: { userId: user.id },
      update: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      },
      create: {
        userId: user.id,
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      },
    })
  }
}

async function seedPosts(posts: PostData[]) {
  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: {
        userId: post.userId,
        title: post.title,
        body: post.body,
      },
      create: {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      },
    })
  }
}

async function main() {
  try {
    // Fetch data from APIs
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts()
    ])
    
    // Seed users first (posts depend on users)
    await seedUsers(users)
    
    // Seed posts
    await seedPosts(posts)
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
