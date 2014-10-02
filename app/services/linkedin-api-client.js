import Ember from 'ember';

/* globals IN */

var linkedinScriptPromise;

export default Ember.Object.extend({
  load: function() {
    if (!linkedinScriptPromise) {
      var shareHandlerName = 'linkedin_share_' + Ember.guidFor(this);
      var tracking = this.tracking;
      window[shareHandlerName] = function(sharedUrl) {
        if(!tracking) { return; }
        if(tracking.linkedinShare) {
          tracking.linkedinShare(sharedUrl);
        }
      };
      linkedinScriptPromise = new Ember.RSVP.Promise(function(resolve/*, reject*/) {
        Ember.$.getScript("//platform.linkedin.com/in.js?async=true", function success() {
          IN.shareHandlerName = shareHandlerName;
          IN.Event.on(IN, 'systemReady', Ember.run.bind(null, resolve, IN));
          IN.init();
        });
      });
    }
    return linkedinScriptPromise;
  }
});