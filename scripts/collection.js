 var buildCollectionItemTemplate = function() {
     var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/cheeseHead.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="/album.html"> Deadmau5  </a>'
   + '      <br/>'
   + '      <a href="/album.html"> The Veldt </a>'
   + '      <br/>'
   + '      Meow songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;

     return $(template);
 };

$(window).load(function() {
    
    var $collectionContainer = $('.album-covers');
    
        $collectionContainer.empty();
 
     for (var i = 0; i < 8; i++) {
         var $newThumbnail = buildCollectionItemTemplate();
         $collectionContainer.append($newThumbnail);
     }
 });