var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/assets/images/album_covers/01.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21'},
    { name: 'Magenta', length: '2:15'}
  ]
};

var albumMarconi = {
  name: 'The Telephone',
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
   name: 'Deadmau5',
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



var createSongRow = function(songNumber, songName, songLength){
  var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' +songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
  ;
  return template;
};

function setCurrentAlbum (album) {
  var albumTitle = document.getElementsByClassName('album-view-title')[0],
      albumArtist = document.getElementsByClassName('album-view-artist')[0],
      albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0],
      albumImage = document.getElementsByClassName('album-cover-art')[0],
      albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  albumTitle.firstChild.nodeValue = album.name;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  
  albumSongList.innerHTML = '';
  
  for (var i=0; i< album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
  }
}
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
function clickHandler (targetElement) {
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
      case albumMarconi.name:
        setCurrentAlbum(albumDeadmau5);
        break;
      case albumDeadmau5.name:
        setCurrentAlbum(albumPicasso);
        break;
    }
    setMouseLeave();
  }
  document.getElementsByClassName('album-cover-art')[0].addEventListener('click', switchAlbum);
};