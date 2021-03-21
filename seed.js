const customers = require('./customers.json')
const AWS = require('aws-sdk')
const dbClient = new AWS.DynamoDB.DocumentClient()

const seed = async () => {
  let count = 0
  let errored = 0
  let success = 0
  for (const customer of customers) {
    try {
      await dbClient
        .put({
          Item: customer,
          TableName: 'service-centre-customers-dev',
        })
        .promise()

      success++
    } catch (e) {
      console.log(e)
      console.log(`Error adding customer ${customer.name}`)
      errored++
    } finally {
      count++
    }
  }

  console.log(`Added ${success} of ${count}`)
  console.log(`${errored} errors`)
}

seed()
