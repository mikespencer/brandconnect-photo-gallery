var BrandConnect = BrandConnect || {};

/**
 * BrandConnect photo gallery
 */
BrandConnect.Gallery = (function($){

  'use strict';

  //generic default values for all galleries
  var defaults = {
    selector: '.brandconnect-gallery',
    thumbWidth: 150,
    thumbSpacing: 1,
    preloadImages: false
  };

  /**
   * Constructor
   */
  function Gallery(options){
    options = options || {};
    this.configure(options);
    this.init();
  }

  /**
   * Configure the gallery. Overrides and extends the defaults with any new options.
   * @param {Object} options New options used to configure the gallery.
   */
  Gallery.prototype.configure = function(options){
    this.config = $.extend(true, {}, defaults, options);
  };

  /**
   * Initialise the gallery.
   */
  Gallery.prototype.init = function(){
    var _this = this;
    this.$gallery = $(this.config.selector);
    this.$mainImage = this.$gallery.find('div.main-image-container img:first');
    this.$carouselContainer = this.$gallery.find('div.image-carousel-container');
    this.$thumbs = $('li img', this.$carouselContainer);
    this.resizeCarousel();
    this.addEventListeners();

    if(this.config.preloadImages){
      $(window).load(function(){
        _this.preloadAllImages();
      });
    }

  };

  /**
   * Programatically sets the width of the carousel to the total width of the thumbnails.
   */
  Gallery.prototype.resizeCarousel = function(){
    var width = $('li img', this.$carouselContainer).length * (this.config.thumbWidth + this.config.thumbSpacing);
    $('ul.image-carousel').css({
      width: width + 'px'
    });
  };

  /**
   * Updates the main image.
   * @param {String} src The url src of the new main image.
   */
  Gallery.prototype.updateMainImage = function(src){
    if(src){
      this.$mainImage.stop(true, true).animate({
        opacity: 0
      }, 200, 'linear', function(){
        $(this).attr({
          src: src
        }).animate({
          opacity: 1
        }, 200, 'linear');
      });

      //get image name and strip extension
      var hash = src.split('/').pop().replace(/\.(jpg|jpeg|png|gif).*/i, '');
      this.updateHash(hash);

    }
  };

  /**
   * Updates the hash value in the URL of the page (window.location.hash).
   * @param {String} val Hash value.
   */
  Gallery.prototype.updateHash = function(val){
    window.location.hash = val || '';
  };

  /**
   * Preloads an image into the browser cache.
   * @param {String|Array} src URL src of the image to preload.
   */
  Gallery.prototype.preloader = function(src){
    src = $.isArray(src) ? src : [src];
    for(var i = 0, len = src.length; i < len; i++){
      var image = new Image();
      image.src = src[i];
    }
  };

  /**
   * Binds any event listeners.
   */
  Gallery.prototype.addEventListeners = function(){
    var _this = this;

    this.$carouselContainer.on('click', 'li img', function(){
      var $this = $(this),
        image = $this.data('fullImage');
      if(image){
        if(!$this.data('preloaded')){
          _this.preloader(image);
          _this.markElementAsPreloaded($this);
        }
        _this.updateMainImage(image);
      }
    });

  };

  /**
   * Binds data preloaded:true to the element passed in. Flags the thumbnail as already having its
   * its image preloaded.
   * @param {jQuery Object} $el jQuery element to bind data preloaded:true to.
   */
  Gallery.prototype.markElementAsPreloaded = function($el){
    $el.data({
      preloaded: true
    });
    console.log('preloaded', $el[0]);
  };

  /**
   * Preloads all the main images. Uses lots of data initially, may be sluggish to start, but will
   * allow for very smooth viewing once everything has loaded. Enable this in the config by setting
   * preloadImages to true.
   */
  Gallery.prototype.preloadAllImages = function(){
    var images = [],
      image,
      _this = this;

    this.$carouselContainer.find('li img').each(function(){
      var $this = $(this);
      image = $this.data('fullImage');
      if(image){
        images.push(image);
        _this.markElementAsPreloaded($this);
      }
    });
    this.preloader(images);
  };

  //expose the Gallery
  return Gallery;

})(window.jQuery);
