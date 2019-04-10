var myApp = angular.module("myApp",[]);

// search form
myApp.directive("imageSearch", function($http){
  return {
    restrict: "A",
    link: function(scope,elem,attrs){
      
			var $element = angular.element(elem);
     
      $element.bind("submit", function(e){
        
        e.preventDefault();
        //http.Request.Headers.Add("Authorization", "563492ad6f91700001000001ddd5d325c8434a27ad52d71fb9bf49b5");
        //'Authorization': '563492ad6f91700001000001ddd5d325c8434a27ad52d71fb9bf49b5';
        var searchTerm = document.getElementById("search").value,
            imageSearchUrl = "https://api.pexels.com/v1/search?per_page=20&page=1&query=",
            //headers = '563492ad6f91700001000001ddd5d325c8434a27ad52d71fb9bf49b5',
            fullQuery = imageSearchUrl+searchTerm,
            searchResult = {};
        		scope.searchedImages = "";
        		scope.noResults = false;
            $http.get(fullQuery,{headers: {'Authorization': '563492ad6f91700001000001ddd5d325c8434a27ad52d71fb9bf49b5'}}).
              success(function(data, status, headers) {
              console.log(data);
              		scope.searchedImages = data.photos;
                 
                 
              }).
              error(function(data, status, headers) {
                console.log(data);
              });
        
      });
     
     }
    
    }

    }); 
   
// random background image
myApp.factory("bgImage", function($http){
	
	var bgImage = {},
	remoteAPI = "https://api.pexels.com/api/v1/images/random";
	
	bgImage.getImages = function(){
		return $http({
			method: "GET",
			url: remoteAPI
		});
	}
	
	return bgImage;
	
});

myApp.controller("myCtrl", function($scope,bgImage){
  
	bgImage.getImages().success(function(response){
    document.body.style.backgroundImage = "url("+response.url+")";
  });
  
});