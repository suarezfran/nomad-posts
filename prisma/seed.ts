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
  // First, create all unique companies
  const uniqueCompanies = Array.from(
    new Map(users.map(u => [u.company.name, u.company])).values()
  );

  await prisma.company.createMany({
    data: uniqueCompanies
  })

  // Get company IDs
  const companies = await prisma.company.findMany()
  const companyMap = new Map(companies.map(c => [c.name, c.id]))

  // Prepare user data
  const userData = users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    street: user.address.street,
    suite: user.address.suite,
    city: user.address.city,
    zipcode: user.address.zipcode,
    lat: user.address.geo.lat,
    lng: user.address.geo.lng,
    companyId: companyMap.get(user.company.name)
  }))

  // Use createMany for bulk insert
  await prisma.user.createMany({
    data: userData
  })
}

async function seedPosts(posts: PostData[]) {
  await prisma.post.createMany({
    data: posts
  })
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
