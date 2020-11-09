const dummy = (blogs) => {
    return 1
  }
  



const totalLikes = (blogs) => {

    var totallikes = 0

    for (i = 0; i < blogs.length; i++) {
        var likes = blogs[i].likes
        totallikes = totallikes + likes
}
return totallikes
}




const favoriteBlog = (blogs) => {

    // alustetaan eniten ääniä saaneen blogin äänimäärä ja indexi
    var mostlikes = 0
    var indexofmostlikes= 0

        // Käydään kaikki blogit läpi. Jos äänimäärä on suurempi kuin millään 
        // aiemmalla blogilla, tallennetaan index.
        for (i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > mostlikes) { 
            mostlikes = blogs[i].likes 
            indexofmostlikes = i
            }
    }

// palautetaan blogi, jolla oli eniten ääniä
 return blogs[indexofmostlikes]
}





// Lähdin tekemään tätä ihan kylmiltään ilman Lodashia, ei ehkä ole niin kaunis mutta toimii

const mostBlogs = (blogs) => {

    var writers = [] // Alustetaan lista kirjojen kirjoittajista
    var mostblogs = 0 // Alustetaan eniten kirjoja julkaisseen kirjailijan kirjojen määrä
    var authorwithmostblogs = 0 // Alustetaan eniten kirjoja kirjoittaneet kirjailijan index listalla
    var currentblogs = 0 // Tämä alustettiin valmiiksi for-looppeja varten


    //Käydään läpi kaikki kirjat ja tallennetaan kirjailija
    for (i = 0; i < blogs.length; i++) {
        writers.push(blogs[i].author) // Työnnetään listaan kaikkien kirjojen kirjoittajatieto
}

    // Haetaan tieto, kenellä on eniten kirjoja ja kuinka paljon

    for (i = 0; i < writers.length; i++) { //Käydään kaikki kirjailijat läpi
        var index = i
        currentblogs = 0
            for (j = 0; j < writers.length; j++) { //Katsotaan kuinka monta kirjaa kyseisellä kirjailijalla on 
                if (writers[j] == writers[index]) {
                    currentblogs = currentblogs + 1
                }
            }
        if (currentblogs > mostblogs) { // Tallennetaan kirjojen määrä ja kirjailijan index, jos arvo oli suurin tähän asti 
            mostblogs = currentblogs
            authorwithmostblogs = index
        }
    }

    // Palautetaan kirjailija, joka on indeksissä jossa oli suurin kirjojen määrä
    // Palautetaan myös suurin kirjojen määrä

return {"author":writers[authorwithmostblogs], "blogs":mostblogs};

}




const mostLikes = (blogs) => {

    var writers = [] // Alustetaan lista kirjojen kirjoittajista
    var mostlikes = 0 // Alustetaan eniten likeja saaneen kirjailijan likejen määrä
    var authorwithmostlikes = 0 // Alustetaan eniten likeja saaneen kirjailijan index listalla
    var currentlikes = 0 // Tämä alustettiin valmiiksi for-looppeja varten


    //Käydään läpi kaikki kirjat ja tallennetaan kirjailija
    for (i = 0; i < blogs.length; i++) {
        writers.push(blogs[i].author) // Työnnetään listaan kaikkien kirjojen kirjoittajatieto
}

    // Haetaan tieto, kenellä on eniten likeja ja kuinka paljon

    for (i = 0; i < writers.length; i++) { //Käydään kaikki kirjailijat läpi
        var index = i
        currentlikes = 0
            for (j = 0; j < writers.length; j++) { 
                if (writers[j] == writers[index]) {
                    currentlikes = currentlikes + blogs[j].likes //Lasketaan liket yhteen
                }
            }

        if (currentlikes > mostlikes) { // Tallennetaan likejen määrä ja kirjailijan index, jos arvo oli suurin tähän asti 
            mostlikes = currentlikes
            authorwithmostlikes = index
        }
    }

    // Palautetaan kirjailija, joka on indeksissä jossa oli suurin likejen määrä
    // Palautetaan myös suurin likejen määrä

return {"author":writers[authorwithmostlikes], "likes":mostlikes};

}



module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}


