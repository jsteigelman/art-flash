const getArtworkRecord = async () => {
  const baseUrl = 'https://collectionapi.metmuseum.org'
  const artworkRecords2 =
    '/public/collection/v1/objects?departmentIds=21&hasImages=true'
  const artworkRecords =
    '/public/collection/v1/search?hasImages=true&isHighlight=true&q=purple'

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
      existingImage === null
        ? ''
        : existingImage.parentNode.removeChild(existingImage)

      const existingTitle = document.getElementById('metArtworkTitle')
      existingTitle === null
        ? ''
        : existingTitle.parentNode.removeChild(existingTitle)

      console.log('accession number: ', mydata.accessionNumber)
      console.log('primaryImage: ', mydata.primaryImage)
      console.log('this is the artwork title: ', mydata.title)

      console.log('this is the artwork record: ', mydata)
      const myImg = document.createElement('img')
      const myCaption = document.createElement('h1')
      myImg.src = mydata.primaryImage
      myImg.id = 'metArtworkImage'
      myCaption.id = 'metArtworkTitle'
      myCaption.textContent = mydata.title
      document.querySelector('.imageContainer').appendChild(myImg)
      document.querySelector('.captionContainer').appendChild(myCaption)

    })
}
