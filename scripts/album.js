var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/assets/images/album_covers/01.png',
  songs: [
    { name: 'Blue', duration: '4:26' },
    { name: 'Green', duration: '3:14' },
    { name: 'Red', duration: '5:01' },
    { name: 'Pink', duration: '3:21'},
    { name: 'Magenta', duration: '2:15'}
  ]
};

var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { name: 'Hello, Operator?', duration: '1:01' },
    { name: 'Ring, ring, ring', duration: '5:01' },
    { name: 'Fits in your pocket', duration: '3:21'},
    { name: 'Can you hear me now?', duration: '3:14' },
    { name: 'Wrong phone number', duration: '2:15'}
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
       { name: 'Strobe', duration: '4:56' },
       { name: 'The Veldt', duration: '8:42' },
       { name: 'Ghost N Stuff', duration: '6:11'},
       { name: 'Raise Your Weapon', duration: '8:23' },
       { name: 'Aural Psynapse', duration: '7:30'}
   ]
};



var createSongRow = function(songNumber, songName, songLength){
  var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' +songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
  ;
    
  return $(template);
};

var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();
  
  for (var i=0; i< album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].duration);
         $albumSongList.append($newRow);
  }
};

var findParentByClassName = function (element, findClass) {
  var targetParent = undefined;
  while (targetParent === undefined) {
    if (element.parentElement === null) {
      alert("No parent found");
    } else if ( element.parentElement.nodeName == 'html' ){
      alert("No parent found with that class name")
    } else if (element.parentElement.className == findClass) {
      targetParent = element.parentElement;
    } else {
      element = element.parentElement;
    }
  return targetParent;
  }
};


function getSongItem (element) {
  switch (element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
    return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
    return findParentByClassName(element,    'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
}

var currentlyPlayingSong = null;


 var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
}

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


var setMouseLeave = function () {
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var leavingSongItem = getSongItem(event.target);
      var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
      if(leavingSongItemNumber !== currentlyPlayingSong) {
        leavingSongItem.innerHTML = leavingSongItemNumber;
      }
    });
    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });
  }
};
window.onload = function() {
  setCurrentAlbum(albumPicasso);
  songListContainer.addEventListener('mouseover',function(event){
    var songNumberCell = event.target.parentElement.querySelector('.song-item-number');
    if (event.target.parentElement.className === 'album-view-song-item' && songNumberCell.getAttribute('data-song-number') != currentlyPlayingSong ) {
      songNumberCell.innerHTML = playButtonTemplate;
    }
  });
  setMouseLeave();
  var albumArray = [albumPicasso, albumMarconi, albumDeadmau5];
  function switchAlbum(){
    switch (document.getElementsByClassName('album-view-title')[0].firstChild.nodeValue) {
      case "The Colors":
        setCurrentAlbum(albumMarconi);
        break;
      case albumMarconi.title:
        setCurrentAlbum(albumDeadmau5);
        break;
      case albumDeadmau5.title:
        setCurrentAlbum(albumPicasso);
        break;
    }
    setMouseLeave();
  }
  document.getElementsByClassName('album-cover-art')[0].addEventListener('click', switchAlbum);
};