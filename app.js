
	angular
            .module('imageGalleryApp', ['ngMaterial'])
            .controller('appController', appController);

         function appController ($scope, $http, $mdDialog) {
			
			// for pagination
			$scope.gap = 10;
			$scope.numOfImagesPerPage = 10;
			$scope.currentPage = 0;
			$scope.pagedItems = [];
			
			$scope.images = []; //declare an empty array to hold the array of images from JSONPlaceHolder API Service
	
			$http.get("http://jsonplaceholder.typicode.com/photos").success(function(response){ 
				$scope.images = response;
				$scope.groupToPages(); 
			});
		 	
			
			// group images into pages
			$scope.groupToPages = function () {
			$scope.pagedItems = [];
			
				for (var i = 0; i < $scope.images.length; i++) {
					if (i % $scope.numOfImagesPerPage === 0) {
						$scope.pagedItems[Math.floor(i / $scope.numOfImagesPerPage)] = [ $scope.images[i] ];
						
					} else {
						$scope.pagedItems[Math.floor(i / $scope.numOfImagesPerPage)].push($scope.images[i]);
					}
				}
			};
    
			$scope.range = function (size,start, end) {
				var ret = [];        
				console.log(size,start, end);
							  
				if (size < end) {
					end = size;
					start = size-$scope.gap;
				}
				for (var i = start; i < end; i++) {
					ret.push(i);
				}        
				 console.log(ret);        
				return ret;
			};
    
			$scope.prevPage = function () {
				if ($scope.currentPage > 0) {
					$scope.currentPage--;
				}
			};
    
			$scope.nextPage = function () {
				if ($scope.currentPage < $scope.pagedItems.length - 1) {
					$scope.currentPage++;
				}
			};
    
			$scope.setPage = function () {
				$scope.currentPage = this.n;
			};

			
			// display image on md-dialog when thumbnail image is clicked
			$scope.showCustom = function(event, image) {
				$mdDialog.show({
				  clickOutsideToClose: true,
				  scope: $scope,        
				  preserveScope: true,           
				  template: '	<md-dialog class="fullscreen-dialog">' +
                            '		<md-dialog-content>' +
							'			<span style="display:block;color:#804040;font-weight:bold">'+image.title+'</span>' +
                            '    		<img ng-src= '+image.url+' alt='+image.title+'>' +
							'  		</md-dialog-content>' +
							'  		<md-dialog-actions>' +
							'   		<md-button ng-click="closeDialog()" class="md-primary">' +
							'     			Close Dialog' +
							'    		</md-button>' +
							'  		</md-dialog-actions>' +
                            '	</md-dialog>',
				controller: function DialogController($scope, $mdDialog) {
					$scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
				}	
               });
            };
		}