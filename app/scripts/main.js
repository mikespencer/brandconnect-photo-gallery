var BrandConnect = BrandConnect || {};
BrandConnect.pageComponents = BrandConnect.pageComponents || {};

(function($){
  'use strict';

  var template = Handlebars.compile($("#galleryTemplate").html());
  var data = {
    images: [
      {
        thumb: 'http://www.placehold.it/150x100',
        fullImage: 'http://www.placehold.it/1600x900'
      }, {
        thumb: 'http://www.placehold.it/150x100/f0f',
        fullImage: 'http://www.placehold.it/1600x900/f0f'
      }, {
        thumb: 'http://www.placehold.it/150x100/0ff',
        fullImage: 'http://www.placehold.it/1600x900/0ff'
      }, {
        thumb: 'http://www.placehold.it/150x100/ff0',
        fullImage: 'http://www.placehold.it/1600x900/ff0'
      }, {
        thumb: 'http://www.placehold.it/150x100/0f0',
        fullImage: 'http://www.placehold.it/1600x900/0f0'
      }, {
        thumb: 'http://www.placehold.it/150x100/ff0',
        fullImage: 'http://www.placehold.it/1600x900/ff0'
      }, {
        thumb: 'http://www.placehold.it/150x100/333',
        fullImage: 'http://www.placehold.it/1600x900/333'
      }, {
        thumb: 'http://www.placehold.it/150x100/f00',
        fullImage: 'http://www.placehold.it/1600x900/f00'
      }, {
        thumb: 'http://www.placehold.it/150x100/33f',
        fullImage: 'http://www.placehold.it/1600x900/33f'
      }, {
        thumb: 'http://www.placehold.it/150x100/3f3',
        fullImage: 'http://www.placehold.it/1600x900/3f3'
      }, {
        thumb: 'http://www.placehold.it/150x100/33f',
        fullImage: 'http://www.placehold.it/1600x900/33f'
      }, {
        thumb: 'http://www.placehold.it/150x100/fff',
        fullImage: 'http://www.placehold.it/1600x900/fff'
      }
    ]
  };

  $('#gallery').html(template(data));

  $(function(){
    if(BrandConnect.Gallery){
      BrandConnect.pageComponents.gallery = new BrandConnect.Gallery({
        preloadImages: true
      });
    }
  });

}).call(this, window.jQuery);
