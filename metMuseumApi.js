const getArtworkRecord = async () => {
  const baseUrl = 'https://collectionapi.metmuseum.org'
  const artworkRecords =
    '/public/collection/v1/objects?departmentIds=11&objectName=Painting&hasImages=true'

    // const test = https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir

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
      console.log('primaryImage: ', artworkRecord.primaryImage)
      console.log('this is the artwork record: ', artworkRecord)

      // remove the start page
      if (document.querySelector('.startScreen') !== null) {
        document.querySelector('.startScreen').remove()
      }

      if (artworkRecord.primaryImage.length === 0) {
        console.log('no pic!!!')
        document.querySelector('.imageContainer--text').innerHTML = 'The Met has not made this image available under Open Access.'
      } else {
        document.querySelector('.imageContainer--text').innerHTML = ''
      }


      // delete the existing image
      const imageSection = document.querySelector('.imageContainer')
      imageSection.innerHTML = ''

      // show caption table
      document.querySelector(".captionTable").classList.remove("hideElement");

      // save artwork image
      const artworkImage = document.createElement('img')
      artworkImage.src = artworkRecord.primaryImageSmall

      //test to delete!
      myArtist = artworkRecord.title

      // update table with artwork data
      document.querySelector('#captionContainer--artistName').innerHTML = artworkRecord.artistDisplayName
      document.querySelector('#captionDate').innerHTML = artworkRecord.objectDate
      document.querySelector('#captionTitle').innerHTML = artworkRecord.title
      document.querySelector('#captionDimensions').innerHTML = artworkRecord.dimensions
      document.querySelector('#captionMedium').innerHTML = artworkRecord.medium
      document.querySelector('#captionCreditLine').innerHTML = artworkRecord.creditLine
      document.querySelector('#captionCollection').innerHTML = artworkRecord.repository
      const nationality = artworkRecord.artistDisplayBio.split(',')
      document.querySelector('#captionContainer--artistBio').innerHTML = `${nationality[0]}, ${artworkRecord.artistBeginDate} - ${artworkRecord.artistEndDate}`
      const moreInfoLink = document.querySelector('#captionMore')
      moreInfoLink.href = artworkRecord.objectURL

      // update image 
      imageSection.appendChild(artworkImage)

      // add support for sharing artwork record by email
      const emailLink = document.querySelector('#emailLink')
      const emailBody = encodeURIComponent(`Check out this artwork I found on ArtFlash:\n\n${artworkRecord.title} (${artworkRecord.objectDate}) by ${artworkRecord.artistDisplayName}\n${artworkRecord.objectURL}\n`)
      emailLink.href = `mailto:?body=${emailBody}&subject=Check out this artwork I found on ArtFlash`
    })
}