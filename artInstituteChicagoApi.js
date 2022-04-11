const getArtInstituteChicagoRecord = async () => {
    const artInstituteChicagoUrl = 'https://api.artic.edu/api/v1/artworks'
    
    fetch(artInstituteChicagoUrl)
      .then((response) => response.json())
      .then((response) => {
        const randomNumber = Math.floor(Math.random() * 12)
        const randomlySelectedRecord = response.data[randomNumber]
        return randomlySelectedRecord
      })
      .then((recordNumber) => {
        const objectRecordUrl = artInstituteChicagoUrl
          .concat('/')
          .concat(recordNumber.id)
        console.log('url: ', objectRecordUrl)
        return fetch(objectRecordUrl)
      })
      .then((result) => result.json())
      .then((artworkRecord) => {
        const artworkRecordImage = artworkRecord.config.iiif_url.concat('/').concat(artworkRecord.data.image_id).concat('/full/843,/0/default.jpg')
        console.log('Here is the image URL: ', artworkRecordImage)
        artworkRecord = artworkRecord.data
        console.log('this is the artwork record: ', artworkRecord)
  
        // remove the start page
        if (document.querySelector('.startScreen') !== null) {
          document.querySelector('.startScreen').remove()
        }

  
  
        // delete the existing image
        const imageSection = document.querySelector('.imageContainer')
        imageSection.innerHTML = ''
  
        // show caption table
        document.querySelector(".captionTable").classList.remove("hideElement");
  
        // save artwork image
        const artworkImage = document.createElement('img')
        artworkImage.src = artworkRecordImage
    

        // get link to artwork on AIC website
        const aicPage = 'https://www.artic.edu/artworks/'.concat(artworkRecord.id)
        console.log('The link to read more is: ', aicPage)
        const moreInfoLink = document.querySelector('#captionMore')
        moreInfoLink.href = aicPage
        

        // update table with artwork data
        document.querySelector('#captionContainer--artistName').innerHTML = artworkRecord.artist_title
        document.querySelector('#captionDate').innerHTML = artworkRecord.date_display
        document.querySelector('#captionTitle').innerHTML = artworkRecord.title
        document.querySelector('#captionDimensions').innerHTML = artworkRecord.dimensions
        document.querySelector('#captionMedium').innerHTML = artworkRecord.medium_display
        document.querySelector('#captionCreditLine').innerHTML = artworkRecord.credit_line
        document.querySelector('#captionCollection').innerHTML = 'The Art Institute of Chicago'
        document.querySelector('#captionContainer--artistBio').innerHTML = artworkRecord.artist_display
  
        // update image 
        imageSection.appendChild(artworkImage)
  
        // add support for sharing artwork record by email
        const emailLink = document.querySelector('#emailLink')
        const emailBody = encodeURIComponent(`Check out this artwork I found on ArtFlash:\n\n${artworkRecord.title} (${artworkRecord.date_display}) by ${artworkRecord.artist_title}\n${aicPage}\n`)
        console.log('email body: ', emailBody)
        emailLink.href = `mailto:?body=${emailBody}&subject=Check out this artwork I found on ArtFlash`
      })
  }