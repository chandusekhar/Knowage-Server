/**
 * 
 */

var app = angular.module('mondrianSchemasCatalogueModule',['ngMaterial' , 'angular_list' , 'angular_table' , 'sbiModule' , 'angular_2_col','file_upload']);

app.controller('mondrianSchemasCatalogueController',["sbiModule_translate","sbiModule_restServices", "$scope","$mdDialog","$mdToast","$timeout","$filter","multipartForm",mondrianSchemasCatalogueFunction]);

function mondrianSchemasCatalogueFunction(sbiModule_translate, sbiModule_restServices, $scope, $mdDialog, $mdToast,$timeout,$filter,multipartForm){
	
	$scope.translate = sbiModule_translate;
	$scope.showMe = false;
	$scope.catalogLoadingShow = false;
	$scope.versionLoadingShow = false;
	$scope.showCatalogs = false;
	$scope.showVersions = false;
	$scope.selectedMondrianSchema={};
	$scope.selectedVersion = {};
	$scope.itemList = [];
	$scope.progressValue = 50;
	$scope.fileList =[];
	$scope.servicePath = "2.0/mondrianSchemasResource";
	$scope.file ={};
	$scope.print = function(){
	$scope.file={};
		
	console.log($scope.file);
		
	};
	
	$scope.downloadFile= function (){
		console.log("download");
	}
	
	
	
	
	angular.element(document).ready(function () {
        $scope.getMondrianSchemas();
		console.log("10:04");
		
    });
	
	
	
	$scope.catalogueSpeedOptions =  [{
	        
		label:sbiModule_translate.load("sbi.generic.delete"),
	    icon:'fa fa-trash-o fa-lg',
	    color:'#153E7E',
	    action:function(item){
	    $scope.deleteMondrianSchema(item);
			
	    }
	 }];
	
	$scope.versionsSpeedOptions =  [
	                                
	  {
	        
		label:'download',
	    icon:'fa fa-download',
	    color:'#153E7E',
	    action:function(item,event){
	    $scope.downloadFile(item,event);
			
	    }
	  }
		  ,
	                                
	   {
	        
		label:sbiModule_translate.load("sbi.generic.delete"),
	    icon:'fa fa-trash-o fa-lg',
	    color:'#153E7E',
	    action:function(item){
	    $scope.deleteVersion(item);
			
	    }
	  }
	  
	  ];
	
	
	
	
	
	
	
	$scope.saveMondrianCatalogue = function(){
		
		console.log("saving Schema...");
		
		if(!isNaN($scope.selectedMondrianSchema.id)){
			
				console.log("updating...");
				$scope.modifyMondrianSchema();
				
				
				
		}else{
			
			console.log("adding new...");
			$scope.addNewMondrianSchema();
			
			
		}
		
		
		console.log("saved!!!");
		
		
		
		
		
	};
	
	
	
	
	$scope.createDragan = function(){
		$scope.showMe = true;
		$scope.selectedMondrianSchema = {};
		$scope.selectedVersion = {};
		$scope.fileList = [];
		
	}
	
	$scope.cancel = function(){
		$scope.showMe = false;
	}
	
	//CLICK FUNCTION FOR CATALOQUE TABLE
	$scope.catalogueClickFunction = function(item){
		$scope.showMe = true;
		if(item!=$scope.selectedMondrianSchema){
			$scope.selectedMondrianSchema ={};
			$scope.selectedMondrianSchema = angular.copy(item);
			$scope.fileList= $scope.getMondrianSchemasVersion();
			
			
		}
		
		console.log($scope.selectedMondrianSchema);
		
	}
	
	//CLICK FUNCTION FOR VERSIONS TABLE
	$scope.versionClickFunction = function(item){
		$scope.showMe = true;
		if(item!=$scope.selectedMondrianSchema){
			
			$scope.selectedVersion = angular.copy(item);
			
			
			
		}
		
		console.log($scope.selectedVersion);
		
	}
	
	
	
	
	//REST
	
	//GET ALL MONDRIAN SCHEMAS
	$scope.getMondrianSchemas = function(){
		
		sbiModule_restServices.get($scope.servicePath,"").success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					
					
				}else{
					$scope.catalogLoadingShow =true;
					$scope.showCatalogs = false;
					$scope.itemList=[];
					
					
					setTimeout(function(){
						$scope.itemList = data;
						$scope.catalogLoadingShow = false;
						$scope.showCatalogs = true;
						$scope.$apply();
					},10)
	
				}
			}
		
		)};
	
	//GET ALL MONDRIAN SCHEMAS VERSIONS
	$scope.getMondrianSchemasVersion = function(){
		
		sbiModule_restServices.get("2.0/mondrianSchemasResource/"+$scope.selectedMondrianSchema.id+"/versions","").success(
			
			
					
					
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					
					
				}else{
					
				$scope.showVersions=false;
				$scope.versionLoadingShow = true;	
				$scope.fileList =[];
				
						
					setTimeout(function(){
							
							
							$scope.fileList=data;
							for(var i= 0 ; i<$scope.fileList.length;i++){	
							
								$scope.fileList[i].creationDate = new Date(data[i].creationDate);
								$scope.fileList[i].actives = "<md-radio-button ng-value = "+$scope.fileList[i].id+" aria-label='label'></md-radio-button>";
							
								if($scope.fileList[i].active){
								
									$scope.selectedMondrianSchema.currentContentId = $scope.fileList[i].id;
									for(var j =0; j<$scope.itemList.length;j++){
										if($scope.itemList[j].id===$scope.selectedMondrianSchema.id){
										
											for(var key in $scope.selectedMondrianSchema){
												$scope.itemList[j][key] = $scope.selectedMondrianSchema[key];
											}
											
										}
									}
									
								
								}
								
							
							}
							console.log("ucitano");
							$scope.versionLoadingShow = false;	
							$scope.showVersions=true;
							
							
							$scope.$apply();
						
						},500)
						
				}
			}
		
		)};
	
	//POST NEW MONDRIAN SCHEMA
	$scope.addNewMondrianSchema = function(){
		
		$scope.selectedMondrianSchema.type ="MONDRIAN_SCHEMA";
		console.log($scope.selectedMondrianSchema);
		
		sbiModule_restServices.post($scope.servicePath,"",$scope.selectedMondrianSchema).success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					
					
				}else{
					
						
				$scope.itemList =	$scope.getMondrianSchemas();
				}
			}
		
		)};
		
	//POST UPLOAD FILE
	$scope.uploadFile= function(){
		
		multipartForm.post("2.0/mondrianSchemasResource/"+$scope.selectedMondrianSchema.id+"/versions",$scope.file).success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					console.log("[UPLOAD]: DATA HAS ERRORS PROPERTY!");
					
				}else{
					
					console.log("[UPLOAD]: SUCCESS!");
					
					$scope.getMondrianSchemasVersion();
					$scope.file={};
					
					
				}
			}).error(function(data, status, headers, config) {
						console.log("[UPLOAD]: FAIL!"+status);
					});
		
	}	
	
	
	//PUT MODIFY MONDRIAN SCHEMA
	$scope.modifyMondrianSchema = function(){
		
		sbiModule_restServices.put($scope.servicePath,$scope.selectedMondrianSchema.id,$scope.selectedMondrianSchema).success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					console.log("[PUT]: DATA HAS ERRORS PROPERTY!");
					
				}else{
					
						console.log("[PUT]: SUCCESS!");
						for(var j =0; j<$scope.itemList.length;j++){
										if($scope.itemList[j].id===$scope.selectedMondrianSchema.id){
											for(var key in $scope.selectedMondrianSchema){
												$scope.itemList[j][key] = $scope.selectedMondrianSchema[key];
											}
										}
									}
						
						console.log("uploading...");
					if($scope.file.file){
						$scope.uploadFile();
					}
						
						
					
					
						
					
					
					
				}
			}).error(function(data, status, headers, config) {
						console.log("[PUT]: FAIL!"+status);
					});
	
	}
	
	
	//DELETE MONDRIAN SCHEMA
	$scope.deleteMondrianSchema = function(item){
		
		console.log($scope.selectedMondrianSchema);
		
		sbiModule_restServices.delete($scope.servicePath,item.id).success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					console.log("[DELETE]: DATA HAS ERRORS PROPERTY!");
					
				}else{
					console.log("[DELETE]: SUCCESS!")					
					$scope.itemList = $scope.getMondrianSchemas();
	
				}
			}).error(function(data, status, headers, config) {
						console.log("[DELETE]: FAIL!"+status);
					});
		
	}
	
	//DELETE VERSION
	$scope.deleteVersion = function(item){
		
		sbiModule_restServices.delete("2.0/mondrianSchemasResource/"+$scope.selectedMondrianSchema.id+"/versions",item.id).success(
			
			function(data,status,headers,config){
				if(data.hasOwnProperty("errors")){
					
					console.log("[DELETE]: DATA HAS ERRORS PROPERTY!");
					
				}else{
					
					console.log("[DELETE]: SUCCESS!")									
					$scope.getMondrianSchemasVersion();
								
					
				}
			}).error(function(data, status, headers, config) {
						console.log("[DELETE]: FAIL!"+status);
					});
	
	}
	
};


app.directive('fileModel',['$parse',function($parse){
	
	return {
		restrict:'A',
		link: function(scope,element,attrs){
			
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			console.log(modelSetter+"model");
			
			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
					
					
				})
			})
		}
	}
	
	
}]);


app.service('multipartForm',['$http',function($http){
	
	this.post = function(uploadUrl,data){
		
		var formData = new FormData();
		
		for(var key in data){
			
			
				formData.append(key,data[key]);
			}
			
				
			
			
		
			
		
		
		return $http.post(uploadUrl,formData,{
			transformRequest:angular.identity,
			headers:{'Content-Type': undefined}
		})
	}
	
}])
	


