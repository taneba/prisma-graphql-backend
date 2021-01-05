import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import { createServer } from 'http'
import compression from 'compression'
import cors from 'cors'
import typeDefs from './api/graphql/typeDefs'
import resolvers from './api/graphql/resolvers'
import { createContext } from './api/graphql/context'

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  formatError: (error) => {
    console.log(
      JSON.stringify({
        type: 'ERROR',
        date: new Date(),
        error: error,
      })
    )
    return error
  },
  formatResponse: (response: any) => {
    if (process.env.VOCCA_ENV != 'prod') {
      console.log(
        JSON.stringify({
          type: 'RESPONSE',
          date: new Date(),
          response: response,
        })
      )
    }
    return response
  },
  context: createContext,
  validationRules: [depthLimit(7)],
})

app.use('*', cors())
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })

const httpServer = createServer(app)

httpServer.listen({ port: 4000 }, (): void =>
  console.log('graphql server is running on http://localhost:4000/graphql')
)

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }
// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
