import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected

  url: null, // Defaults to current url
  'fb-layout': 'standard', // Valid options: 'standard', 'button_count', 'button', or 'box_count'
  'fb-show-faces': 'false', // Valid options: 'true' or 'false'

  createFacebookFollowButton: Ember.on('didInsertElement', function() {
    var self = this;
    this.socialApiClient.load().then(function(FB) {
      if (self._state !== 'inDOM') { return; }
      var attrs = [];
      var url = self.get('url');
      if (url) {
        attrs.push('data-href="' + url + '"');
      }
      var fbLayout = self.get('fb-layout');
      if (fbLayout) {
        attrs.push('data-layout="' + fbLayout + '"');
      }
      var fbShowFaces = self.get('fb-show-faces');
      if (fbShowFaces) {
        attrs.push('data-show-faces="' + fbShowFaces + '"');
      }
      self.$().html('<div class="fb-follow" ' + attrs.join(' ') +'></div>');
      FB.XFBML.parse(self.get('element'));
    });
  }),

  urlUpdated: function() {
  	this.createFacebookFollowButton();
  }.observes('url')

});
