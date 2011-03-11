Yelp Review jQuery Plugin
==================================================
Makes it easy to get review excerpts for businesses from the yelp v2 api and display them with jquery.tmpl templates.

Example:
--------
    $(selector).yelpReviews({
      biz: 'owl-tree-san-francisco-2',
      consumerKey: "YOUR_CONSUMER_KEY",
      consumerSecret: "YOUR_CONSUMER_SECRET",
      accessToken: "YOUR_TOKEN",
      accessTokenSecret: "YOUR_TOKEN_SECRET"
    });

Defaults to using review.tmpl as a template file, but can also take a template string.
See example.html and the source for more info.


Dependencies:
------------
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js"></script>
    <script type="text/javascript" src="https://github.com/jquery/jquery-tmpl/raw/master/jquery.tmpl.js">
    </script>
    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/oauth.js"></script>
    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/sha1.js"></script>
    </pre>

Originally made for a friend's startup, enjoy!
-Aviv