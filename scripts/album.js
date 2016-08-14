// Example Album
var albumPicasso = {
   title: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       { name: 'Blue', length: '4:26' },
       { name: 'Green', length: '3:14' },
       { name: 'Red', length: '5:01' },
       { name: 'Pink', length: '3:21'},
       { name: 'Magenta', length: '2:15'}
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
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
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
       { name: 'Strobe', length: '4:56' },
       { name: 'The Veldt', length: '8:42' },
       { name: 'Ghost N Stuff', length: '6:11'},
       { name: 'Raise Your Weapon', length: '8:23' },
       { name: 'Aural Psynapse', length: '7:30'}
   ]
};

var createSongRow = function(songNumber, songName, songLength) {

   var template =
      '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

   return template;

};

  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
var findParentByClassName = function(element, targetClass){
    if(element){
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className != null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};   
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
            break;
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
            break;
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
            break;
        case 'song-item-number':
            return element;
            break;
        default:
            return;
    }  
};
    var clickHandler = function(targetElement) {
        
        var songItem = getSongItem(targetElement);  
        
        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
         } else if (currentlyPlayingSong === songItem.getAttribute('data-           song-number')) {
            songItem.innerHTML = playButtonTemplate;
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };

   albumTitle.firstChild.nodeValue = album.title;
   albumArtist.firstChild.nodeValue = album.artist;
   albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
   albumImage.setAttribute('src', album.albumArtUrl);
   albumSongList.innerHTML = '';

   for (var i = 0; i < album.songs.length; i++) {
       albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
   }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover', function(event) {
         if (event.target.parentElement.className === 'album-view-song-item') {
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(event.target);
            
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
         }
     });
    
    for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // Revert the content back to the number
              this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
              var songItem = getSongItem(event.target);
              var songItemNumber = songItem.getAttribute('data-song-number');
 
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         songRows[i].addEventListener('click', function(event) {
              clickHandler(event.target);
         });
     }
var albums = [albumMarconi, albumDeadmau5, albumPicasso];
var index = 1;
  albumImage.addEventListener("click", function( event ) {
    setCurrentAlbum(albums[index]);
    index++;
    if( index == albums.length ){
      index = 0;
    }
  });
};