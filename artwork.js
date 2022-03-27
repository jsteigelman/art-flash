const https = require('https')
const baseUrl = 'https://collectionapi.metmuseum.org'

// get object records by department
const allDepartments = '/public/collection/v1/departments'
const photographyDepartment = '19'
const selectedDepartment = '/public/collection/v1/objects?departmentIds=' + photographyDept

// get single object record
const specifiedObjectId = '259569'
const objectRecord = '/public/collection/v1/objects/' + specifiedObjectId

// get records according to custom filters
// highlights, with keyword 'purple', that have images
const highlights = '/public/collection/v1/search?hasImages=true&isHighlight=true&q=purple'

// url to query
const metUrl = baseUrl + departments
console.log('The url I am querying is: ' + metUrl)

https
  .get(metUrl, (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // console.log('The primary image for the artwork can be found here:')
      // console.log(JSON.parse(data).primaryImage)
      console.log('the full response is here:')
      console.log(JSON.parse(data))
    })
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message)
  })
