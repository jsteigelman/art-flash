const https = require('https')

// const metUrl =
//   'https://collectionapi.metmuseum.org/public/collection/v1/objects/45734'

const baseUrl = 'https://collectionapi.metmuseum.org'

// returns a list of art departments
const departments = '/public/collection/v1/departments'

// returns a list of artwork records by department
const photographyDept = '19'
const selectedDepartment = '/public/collection/v1/objects?departmentIds=' + photographyDept

// returns a list of all valid Object IDs available to use
const objects = '/public/collection/v1/objects'

// returns a record for an object, containing all open access data about that object, including its image (if the image is available under Open Access)
const specifiedObjectId = '259569'
const objectRecord = '/public/collection/v1/objects/' + specifiedObjectId

// search for highlights, with keyword 'purple', that have images
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
