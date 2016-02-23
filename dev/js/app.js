var app = angular.module('githubUserInfoApp', []);

app.controller('userSearchCtrl', ['$scope', function($scope) {
	$scope.username = '';		
	$scope.getUsers = function() {		
		if($scope.username.length > 3) {
			$.get('http://api.github.com/search/users?q=' + $scope.username, function(data) {
				if(data.items) {
					$scope.users = data.items;
				}
			});			
		}
	};
}]);