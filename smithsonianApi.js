const getSmithsonianRecord = async () => {
  const smithsonianUrl =
    'https://api.si.edu/openaccess/api/v1.0/category/art_design/search?sort=random&q=painting&rows=1'

  fetch(smithsonianUrl, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.SMITHSONIAN_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data returned: ', data)
    })
    .catch((error) => {
      console.log(error)
    })
}