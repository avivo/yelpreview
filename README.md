Yelp Reviewer
==================================================
Makes it easy to get review excerpts for businesses from the yelp v2 api and display them with jquery.tmpl templates.

$(selector).yelpReviews({
  biz: 'owl-tree-san-francisco-2',
  consumerKey: "YOUR_CONSUMER_KEY",
  consumerSecret: "YOUR_CONSUMER_SECRET",
  accessToken: "YOUR_TOKEN",
  accessTokenSecret: "YOUR_TOKEN_SECRET"
});

Defaults to using review.tmpl as the template.
See example.html and the source for more.

Dependencies:
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js"></script>
<script type="text/javascript" src="https://github.com/jquery/jquery-tmpl/raw/master/jquery.tmpl.js"></script>
<script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/oauth.js"></script>
<script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/sha1.js"></script>

Originally made for a friend's startup, enjoy!
-Aviv