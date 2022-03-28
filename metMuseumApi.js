const getArtworkRecord = async () => {
  const baseUrl = 'https://collectionapi.metmuseum.org'
  const artworkRecords =
    '/public/collection/v1/objects?departmentIds=11&objectName=Painting&hasImages=true'

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
    .then((artworkRecord) => {
      console.log('accession number: ', artworkRecord.accessionNumber)
      console.log('primaryImage: ', artworkRecord.primaryImage)
      console.log('this is the artwork title: ', artworkRecord.title)

      console.log('this is the artwork record: ', artworkRecord)


      // delete the existing caption
      const captionSection = document.querySelector('.captionContainer')
      // captionSection.innerHTML = ''

      // delete the existing image
      const imageSection = document.querySelector('.imageContainer')
      imageSection.innerHTML = ''

      // show caption table
      document.querySelector(".captionTable").classList.remove("hideTable");

      // save artwork image
      const artworkImage = document.createElement('img')
      artworkImage.src = artworkRecord.primaryImageSmall

      // create artwork caption
      const captionTitle = document.createElement('h2')
      const captionArtistName = document.createElement('h1')
      const captionArtistBio = document.createElement('p')
      const captionDate = document.createElement('p')
      const captionDimensions = document.createElement('p')
      const captionMedium = document.createElement('p')
      const captionCreditLine = document.createElement('p')

      //test
      document.querySelector('#captionDate').innerHTML = artworkRecord.objectDate
      document.querySelector('#captionBio').innerHTML = artworkRecord.artistDisplayBio

      // document.querySelector('#captionDate').innerHTML = artworkRecord.artistDisplayName
      document.querySelector('#captionTitle').innerHTML = artworkRecord.title
      document.querySelector('#captionDimensions').innerHTML = artworkRecord.dimensions
      document.querySelector('#captionMedium').innerHTML = artworkRecord.medium
      document.querySelector('#captionCreditLine').innerHTML = artworkRecord.creditLine
      document.querySelector('#captionCollection').innerHTML = artworkRecord.repository

      const testName = document.querySelector('#captionContainer--artistName')
      const aristBio = document.querySelector('#captionContainer--artistBio')

      
      testName.innerHTML = artworkRecord.artistDisplayName

      const nationality = artworkRecord.artistDisplayBio.split(',')
      console.log('nationality: ', nationality)
      aristBio.innerHTML = `${nationality[0]}, ${artworkRecord.artistBeginDate} - ${artworkRecord.artistEndDate}`

      // update image 
      imageSection.appendChild(artworkImage)

      
    })
}
