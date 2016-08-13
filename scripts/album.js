// Example Album
var albumPicasso = {
   title: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       { title: 'Blue', length: '4:26' },
       { title: 'Green', length: '3:14' },
       { title: 'Red', length: '5:01' },
       { title: 'Pink', length: '3:21'},
       { title: 'Magenta', length: '2:15'}
   ]
};

// Another Example Album
var albumMarconi = {
   title: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: 'assets/images/album_covers/20.png',
   songs: [
       { title: 'Hello, Operator?', length: '1:01' },
       { title: 'Ring, ring, ring', length: '5:01' },
       { title: 'Fits in your pocket', length: '3:21'},
       { title: 'Can you hear me now?', length: '3:14' },
       { title: 'Wrong phone number', length: '2:15'}
   ]
};

// Third Example Album
var albumDeadmau5 = {
   title: 'Deadmau5',
   artist: 'Joel Zimmerman',
   label: 'Deadmau5 Records',
   year: '2016',
   albumArtUrl: 'assets/images/album_covers/cheeseHead.png',
   songs: [
       { title: 'Strobe', length: '4:56' },
       { title: 'The Veldt', length: '8:42' },
       { title: 'Ghost N Stuff', length: '6:11'},
       { title: 'Raise Your Weapon', length: '8:23' },
       { title: 'Aural Psynapse', length: '7:30'}
   ]
};

var createSongRow = function(songNumber, songName, songLength) {

   var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

   return template;

};

var setCurrentAlbum = function(album) {

  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

   albumTitle.firstChild.nodeValue = album.title;
   albumArtist.firstChild.nodeValue = album.artist;
   albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
   albumImage.setAttribute('src', album.albumArtUrl);

   albumSongList.innerHTML = '';

   for (i = 0; i < album.songs.length; i++) {
       albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
   }

};

window.onload = function() {

  setCurrentAlbum(albumPicasso);

  var count = 0;
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumCatalog = [albumMarconi, albumDeadmau5, albumPicasso];

  albumImage.addEventListener("click", function( event ) {

    setCurrentAlbum(albumCatalog[count]);

    count++;

    if( count === albumCatalog.length ){
      count = 0;
    }

  });

};