var app = angular.module('githubUserInfoApp', []);

app.controller('userSearchCtrl', ['$scope', function($scope) {
	$scope.username = '';	
	$scope.users = [];	

	$scope.getUsers = function() {		
		if($scope.username.length > 2) {
			$.get('http://api.github.com/search/users?client_id=c2df7d0a60a47904f605&client_secret=f492970143a019eb640a29f3dc9df2b185e22f37&q=' + $scope.username, function(data) {
				if(data.items) {
					data.items.forEach(function(elem) {
						var obj = {
							avatar_url: elem.avatar_url,
							login: elem.login,
							followers: []
						};

						$.get('http://api.github.com/users/' + elem.login + '/followers?client_id=c2df7d0a60a47904f605&client_secret=f492970143a019eb640a29f3dc9df2b185e22f37', function(followers) {
							followers.forEach(function(follower) {
								obj.followers.push(follower.login);
							});
						});

						$scope.users.push(obj);
					});
				}
			});			
		}
	};
}]);