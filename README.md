# angular-navigation-guard
Prevent navigation or redirect from the current page. Simply enable/disable with text to be shown to the user.

Also supports angular-ui-router.

## Installation
Install with bower:

`bower install angular-navigation-guard --save`


## Usage
Include the module in your app dependencies:

`angular.module('yourApp', ['navigationguard']);`


Example usage in your controller:
```
angular.module('yourApp').controller('YourController',
["$scope", "navigationGuardService", function($scope, navigationGuardService) {
    var guardText = "You made changes on this page that might get lost.";
    
    //This method should be fired somewhere. Probably from the view in an "ng-change" of some input elements
    $scope.OnFormChange = function() {
        //Your logic to determine if the guard should be enabled/disabled
        if ($scope.CheckFormWasEdited()) {
            navigationGuardService.EnableGuard(guardText);
        } else {
            navigationGuardService.DisableGuard(guardText);
        }
    };
    
    /*
    Remember to also disable the guard upon scope destroy.
    Otherwise after the user chose "yes allow redirect" he will be asked again on the next page.
    */
    $scope.$on('$destroy', function() {
		navigationGuardService.DisableGuard(guardText);
	});
}]);
```

## Important notes
- Remember to disable the guard on `$scope.$on('$destroy'`
- If you use angular-ui-router you will also need to disable this guard before redirecting to a route, like before `$state.transitionTo('your-state')`
