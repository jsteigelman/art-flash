const getRecordNumber = async () => {
  const baseUrl = 'https://collectionapi.metmuseum.org'
  const artworkRecords2 =
    '/public/collection/v1/objects?departmentIds=21&hasImages=true'
    const artworkRecords = '/public/collection/v1/search?hasImages=true&isHighlight=true&q=purple'

  const metUrl = baseUrl.concat(artworkRecords)

  fetch(metUrl)
    .then((response) => response.json())
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * data.total)
      const randomlySelectedRecord = data.objectIDs[randomNumber]
      return randomlySelectedRecord
    })
    .then((recordNumber) => {
      const objectRecordUrl = baseUrl
        .concat('/public/collection/v1/objects/')
        .concat(recordNumber)
      console.log('url: ', objectRecordUrl)
      return fetch(objectRecordUrl)
    })
    .then((result) => result.json())
    .then((mydata) => {
        const existingImage = document.getElementById('metArtworkImage')
        existingImage === null ? '' : existingImage.parentNode.removeChild(existingImage)
    
      console.log('accession number ', mydata.accessionNumber)
      console.log('primaryImage ', mydata.primaryImage)

      console.log('is this the record? ', mydata)
      const myImg = document.createElement('img')
    //   myImg.src = mydata.primaryImage
    myImg.src = mydata.primaryImage
    myImg.id = 'metArtworkImage'



    
    console.log('src is: ', mydata.primaryImage)

      document.querySelector('.imageContainer').appendChild(myImg)
    })
}