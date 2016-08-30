angular
	.module('binary')
	.directive('virtualws', [
		'accountService',
		'languageService',
		'websocketService',
		'alertService',
		'$state',
		'$compile',
		'$ionicLoading',
		'appStateService',

		function(accountService,
			languageService,
			websocketService,
			alertService,
			$state,
			$compile,
			$ionicLoading,
			appStateService) {
			return {
				restrict: 'E',
				templateUrl: 'templates/components/accounts/virtualws.template.html',
				scope: {
					message: "="
				},
				link: function(scope, element) {
					scope.data = {};
					scope.passwordError = false;
					scope.tokenError = false;
					scope.residenceError = false;
					websocketService.sendRequestFor.residenceListSend();

					scope.$on('residence_list', function(e, residence_list) {
						if (!appStateService.hasGetResidence) {
							scope.residenceList = residence_list;
							appStateService.hasGetResidence = true;
							// scope.data.residence = scope.residenceList[0].text;
						}
					});
					// scope.$watch('residenceList', function() {
					// 	if (scope.residenceList) {
					// scope.data.residence = scope.residenceList[0].text;
					// }
					// });

					scope.inputType = 'password';

					// Hide & show password function
					scope.hideShowPassword = function() {
						if (scope.inputType == 'password')
							scope.inputType = 'text';
						else
							scope.inputType = 'password';
					};

					scope.createVirtualAccount = function() {
						var verificationCode = scope.data.verificationCode;
						var clientPassword = scope.data.clientPassword;
						var residence = scope.data.residence;
						websocketService.sendRequestFor.newAccountVirtual(verificationCode, clientPassword, residence);
					};
					scope.$on('new_account_virtual', function(e, new_account_virtual) {
						if (!appStateService.isLoggedin) {
							var _token = new_account_virtual.oauth_token;
							// accountService.validate(token);
							websocketService.authenticate(_token)
						}

					});
					scope.$on('new_account_virtual:error', function(e, error){
				 	if(error){

					 			if((error.hasOwnProperty('details') && error.details.hasOwnProperty('verification_code')) || (error.hasOwnProperty('code') && error.code == "InvalidToken")){
									alertService.displayError(error.message);
							}

					 	}

					 });
				}
			};
		}
	]);
