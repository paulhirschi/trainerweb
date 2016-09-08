module.exports = function() {
  switch(process.env.NODE_ENV){
    case 'development':
      return {
        'port'                    : process.env.PORT || 9000,
        'user'                    : process.env.ECHOBASE_USER,
        'pass'                    : process.env.ECHOBASE_PASS,
        'secret'                  : process.env.ECHOBASE_SECRET,
        'database'                : process.env.ECHOBASE_DATABASE || 'mongodb://localhost/trainerWeb',
        'twitter_consumer_key'    : process.env.TWITTER_CONSUMER_KEY,
        'twitter_consumer_secret' : process.env.TWITTER_CONSUMER_SECRET,
        'twitter_token'           : process.env.TWITTER_TOKEN,
        'twitter_token_secret'    : process.env.TWITTER_TOKEN_SECRET
      };
    case 'production':
      return {
        'port'                    : process.env.PORT || 9000,
        'user'                    : process.env.ECHOBASE_USER,
        'pass'                    : process.env.ECHOBASE_PASS,
        'secret'                  : process.env.ECHOBASE_SECRET,
        'database'                : process.env.ECHOBASE_DATABASE || 'mongodb://localhost/trainerWeb',
        'twitter_consumer_key'    : process.env.TWITTER_CONSUMER_KEY,
        'twitter_consumer_secret' : process.env.TWITTER_CONSUMER_SECRET,
        'twitter_token'           : process.env.TWITTER_TOKEN,
        'twitter_token_secret'    : process.env.TWITTER_TOKEN_SECRET
      };
  }
};
