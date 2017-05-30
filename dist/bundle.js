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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
        name:"aleksandra",
        message:"how are you?",
        response:"a response from aleksandra",
        showDetails: false
      },
      {
        name:"evan",
        message:"how are you?",
        response:"a response from evan",
        showDetails: false
      },
      {
        name:"tom",
        message:"how's it going?",
        response:"a response from tom",
        showDetails: false
      },
      {
        name:"jarid",
        message:"what's going on?",
        response:"a response from jarid",
        showDetails: false
      }];
      $scope.response = [];
      $scope.sendMessage = function(){
          $scope.response.push($scope.chat);
          mixpanel.track('Message', {'message': document.getElementById("search-term").value});
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
              "<li ng-repeat='message in users'>"+
                "<a class='users' ng-click='toggleDetails(message)'>{{message.name | uppercase}}</a>"+
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
                    "<li ng-repeat='message in users | filter:{showDetails:true}' class='animated fadeInUp'>"+
                        "<p>{{message.name | uppercase}}: {{message.message}}</p>"+
                        "<p>Matt: {{response}}</p>"+
                        "<span ng-repeat='message in users | filter:{showDetails:true}'>{{message.name | uppercase}}:</span>{{autoresponse}}"+
                    "</li>"+
                  "</ol>"+
                "</div>"+
                "<div class='panel-footer clearfix'>"+
                  "<form name='form'>"+
                    "<input type='text' id='search-term' ng-disabled='!userSelected' name='message' ng-model='chat' class='form-control' />"+
                    "<span class='col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-xs-12' style='margin-top: 10px'>"+
                        "<button class='btn btn-warning btn-lg btn-block' id='btn-chat' ng-click='sendMessage(messages)' ng-disabled='!form.message.$dirty'>Send</button>"+
                    "</span>"+
                  "</form>"+
                "</div>"+
        "</div>"
        };
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("8b8e8cc8d5acee40657e5d39745e7742");


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);