/**
 * @name SignInController
 * @author Massih Hazrati
 * @contributors []
 * @since 10/12/2015
 * @copyright Binary Ltd
 * Handles sign-in functionalities
 */

angular
	.module('binary')
	.controller('SignInController',
		function($scope, $state, websocketService) {
			$scope.language = 'EN';
			$scope.signIn = function(token, language) {
				$scope.tokenError = false;
				// Validate the token
				if (token && token.length === 48) {
					websocketService.send.authentication(token);
					// send it for auth
					// if auth:
					// $state.go('trade');
				} else {
					// apply error class to the input
					$scope.tokenError = true;

				}
			};

			$scope.goToHelpPage = function() {
				$state.go('help');
			};

			$scope.$on('authorize', function(e, response) {
				if (response && typeof response.authorize !== 'undefined') {
					console.log('scope.on', response.authorize);
					alert(response.authorize.email);
					$state.go('trade');
				} else {

				}

			});

	});