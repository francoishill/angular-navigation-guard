angular.module("navigationguard", []).service("navigationGuardService", [
  "$window", "$rootScope", function($window, $rootScope) {
    var enabledGuardTexts, getCurrentGuardMessage;
    enabledGuardTexts = [];
    this.EnableGuard = function(guardText) {
      if (enabledGuardTexts.indexOf(guardText) !== -1) {
        return;
      }
      enabledGuardTexts.push(guardText);
    };
    this.DisableGuard = function(guardText) {
      var index;
      index = enabledGuardTexts.indexOf(guardText);
      if (index !== -1) {
        enabledGuardTexts.splice(index, 1);
      }
    };
    getCurrentGuardMessage = function() {
      if (enabledGuardTexts.length > 0) {
        return enabledGuardTexts[enabledGuardTexts.length - 1];
      }
      return void 0;
    };
    this.GetCurrentGuardMessage = function() {
      return getCurrentGuardMessage();
    };
    $window.onbeforeunload = function() {
      var guardMessage;
      guardMessage = getCurrentGuardMessage();
      if (guardMessage != null) {
        return guardMessage;
      } else {
        return void 0;
      }
    };
    $rootScope.$on('$stateChangeStart', (function(event, toState, toParams, fromState, fromParams) {
      var currentGuardMessage;
      currentGuardMessage = getCurrentGuardMessage();
      if (currentGuardMessage != null) {
        if (!confirm(currentGuardMessage + "\n\nAre you sure you want to leave this page?")) {
          return event.preventDefault();
        }
      }
    }));
  }
]);
