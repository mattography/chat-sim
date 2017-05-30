/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var chatApp = angular.module("chatApp",['firebase']);

chatApp.controller("chatController",function($scope, $timeout, $firebaseArray){
  var myUsers = new Firebase('https://chat-4477b.firebaseio.com/users');
    $scope.userSelected = false;
    $scope.users = $firebaseArray(myUsers);
    $scope.messages = [{
        user:"aleksandra",
        message:"how are you?",
        response:"a response from aleksandra",
        showDetails: false
      },
      {
        user:"evan",
        message:"how are you?",
        response:"a response from evan",
        showDetails: false
      },
      {
        user:"tom",
        message:"how's it going?",
        response:"a response from tom",
        showDetails: false
      },
      {
        user:"jarid",
        message:"what's going on?",
        response:"a response from jarid",
        showDetails: false
      }];
      $scope.response = [];
      $scope.sendMessage = function(){
          $scope.response.push($scope.chat);
          $timeout(function () {
            $scope.autoresponse = "This is a great app!";
          }, 2000);
      };
});

chatApp.directive("usersList", function(){
    return {
        restrict: "E",
        scope: false,
        template: "<h4>Select a user</h4>"+
            "<ol class='list-unstyled animated fadeInDown'>"+
              "<li ng-repeat='message in messages'>"+
                "<a class='users' ng-click='toggleDetails(message)'>{{message.user | uppercase}}</a>"+
              "</li>"+
            "</ol>"
        ,
        link: function(scope) {
          scope.toggleDetails = function(message)
          {
            scope.userSelected = true;
            angular.forEach(scope.messages, function(value, key){
              if(message != value)
                value.showDetails = false;
            });
            message.showDetails =  !message.showDetails;
          }

        }
    }

});

chatApp.directive("messagesList", function(){
    return {
        restrict: "E",
        scope: false,
        template: "<div class='panel panel-primary'>"+
            "<div class='panel-heading'>"+
                "<span class='glyphicon glyphicon-comment'></span> Chat</div>"+
                "<div class='panel-body body-panel'>"+
                  "<ol class='list-unstyled'>"+
                    "<li ng-repeat='message in messages | filter:{showDetails:true}' class='animated fadeInUp'>"+
                        "<p>{{message.user | uppercase}}: {{message.message}}</p>"+
                        "<p>Matt: {{response}}</p>"+
                        "<span ng-repeat='message in messages | filter:{showDetails:true}'>{{message.user | uppercase}}:</span>{{autoresponse}}"+
                    "</li>"+
                  "</ol>"+
                "</div>"+
                "<div class='panel-footer clearfix'>"+
                  "<form name='form'>"+
                    "<input type='text' ng-disabled='!userSelected' name='message' ng-model='chat' class='form-control' />"+
                    "<span class='col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-xs-12' style='margin-top: 10px'>"+
                        "<button class='btn btn-warning btn-lg btn-block' id='btn-chat' ng-click='sendMessage(messages)' ng-disabled='!form.message.$dirty'>Send</button>"+
                    "</span>"+
                  "</form>"+
                "</div>"+
        "</div>"
        };
});


/***/ })
/******/ ]);