var BrandConnect = BrandConnect || {};
BrandConnect.pageComponents = BrandConnect.pageComponents || {};

(function($){
  'use strict';

  $(function(){
    if(BrandConnect.Gallery){
      BrandConnect.pageComponents.gallery = new BrandConnect.Gallery({
        preloadImages: true
      });
    }
  });

}).call(this, window.jQuery);
