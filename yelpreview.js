/*
 * Yelp Review jQuery Plugin
 * Copyright (c) 2011 Aviv
 * Dual licensed under MIT and GPL licenses
 */
;
(function($){

  $.fn.yelpReviews = function(options){
    var $this = this;
    var action = 'http://api.yelp.com/v2/business/' + options.biz;
    var settings = $.extend({}, $.fn.yelpReviews.defaults, options);
    //This ensures that if you use different templates different times, it gives them different names, using a closure counter.
    if (!settings.reuseTemplate) 
      settings.templateName += settings.counter();
    
    /***************************** 
     ****** Authentication *******
     *****************************/
    //See yelp api docs and examples for details:
    //-docs: http://www.yelp.com/developers/documentation/v2/authentication
    //-example: https://github.com/Yelp/yelp-api/blob/master/v2/js/search.html
    var accessor = {
      consumerSecret: settings.consumerSecret,
      tokenSecret: settings.accessTokenSecret
    };
    
    var parameters = [];
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', settings.consumerKey]);
    parameters.push(['oauth_consumer_secret', settings.consumerSecret]);
    parameters.push(['oauth_token', settings.accessToken]);
    parameters.push(['oauth_signature_method', settings.signatureMethod]);
    
    var message = {
      'action': action,
      'method': 'GET',
      'parameters': parameters
    };
    
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    
    var parameterMap = OAuth.getParameterMap(message.parameters);
    
    
    /******************************* 
     ** Create the callback chain **
     *******************************/
    /* First get the template markup from a file */
    function getTemplateMarkup(){
      $.get(settings.reviewTemplateMarkupFile, buildReviewTemplate);
    }
    
    /* Then build the template */
    function buildReviewTemplate(markup){
      $.template(settings.templateName, markup);
      loadReviewData();
    }
    
    /* Next load the review data */
    function loadReviewData(){
      $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': processReviews
      });
    }
    
    /* Finally process the reviews and display using the template */
    function processReviews(data, textStats, XMLHttpRequest){
      var rev = data.reviews;
      for (var i = 0; i < rev.length; i++) {
        var d = new Date(rev[i].time_created * 1000);
        rev[i].date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        rev[i].bizid = data.id
      }
      $.tmpl(settings.templateName, rev).appendTo($this);
    }
    
    /****************************** 
     ** Start the callback chain **
     ******************************/
    //if a template isn't given, pull it from the file specified in settings
    if (settings.reviewTemplateMarkup == null) 
      getTemplateMarkup();
    else 
      buildReviewTemplate(settings.reviewTemplateMarkup);
    return this;
  }
  
  $.fn.yelpReviews.defaults = {
    consumerKey: "",
    consumerSecret: "",
    accessToken: "",
    accessTokenSecret: "",
    signatureMethod: "HMAC-SHA1",
    reviewTemplateMarkupFile: "review.tmpl",
    reviewTemplateMarkup: null,
    templateName: "yelpReviews.ReviewTemplate",
    reuseTemplate: false,
    counter: function(){
      var c = 0;
      return function(){
        c++;
        return c;
      };
    }()
  };
})(jQuery);
