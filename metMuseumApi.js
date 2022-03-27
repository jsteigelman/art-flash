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
      captionSection.innerHTML = ''

      // delete the existing image
      const imageSection = document.querySelector('.imageContainer')
      imageSection.innerHTML = ''

      // save artwork image
      const artworkImage = document.createElement('img')
      artworkImage.src = artworkRecord.primaryImage

      // create artwork caption
      const captionTitle = document.createElement('h1')
      const captionArtistName = document.createElement('p')
      const captionArtistBio = document.createElement('p')

      // update artwork caption
      captionTitle.textContent = artworkRecord.title
      captionArtistName.textContent = artworkRecord.artistDisplayName
      captionArtistBio.textContent = artworkRecord.artistDisplayBio

      // update image and caption
      imageSection.appendChild(artworkImage)
      captionSection.appendChild(captionTitle)
      captionSection.appendChild(captionArtistName)
    })
}
