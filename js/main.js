'use strict';


requirejs(
    ['angular', 'angular-scrollevents', 'waypoints'],
    function(angular) {
      var mod = angular.module('jnrain2-main', ['ngScrollEvent']),
          MainPage = (function($scope) {
            $scope.areas = [
              {
                name: '广场',
                bgcolor: '#f8fcf3',
                navcolor: '#8eff00'
              },
              {
                name: '文艺',
                bgcolor: '#d9ffe1',
                navcolor: '#00cb2e'
              },
              {
                name: '感性',
                bgcolor: '#eeccff',
                navcolor: '#a900ff'
              },
              {
                name: '技术',
                bgcolor: '#d9f9ff',
                navcolor: '#00d5ff'
              },
              {
                name: 'ACG',
                bgcolor: '#dddddd',
                navcolor: '#000000'
              },
              {
                name: '体育',
                bgcolor: '#ffbf80',
                navcolor: '#ff8000'
              }
            ];
            $scope.activeArea = 0;
            $scope.topNavHidden = false;

            // 大区个别样式控制
            $scope.getNavStyle = (function(area) {
              return {
                'border-bottom-color': area.navcolor
              };
            });
            $scope.getAreaStyle = (function(area) {
              return {
                'background-color': area.bgcolor
              };
            });

            $scope.updateActiveAreaFactory = (function(idx) {
              // console.log('updateActiveAreaFactory: ' + idx);

              // 返回的是一个 handler
              return (function() {
                // console.log('updateActiveArea: ' + idx);
                $scope.activeArea = idx;
              });
            });

            $scope.updateScroll = (function() {
              var prevTop = 0;

              return (function(event, isEndEvent) {
                var left = event.target.scrollLeft,
                    top = event.target.scrollTop;

                // 两种情况的判断方式完全一样, 省掉 if 块
                // (原 if(!isEndEvent) 块)
                // 刚开始滚动, 检查是往上还是往下
                // 往下滚的话就把顶部导航缩起来
                // (原 else 块)
                // 检查滚动结束时最后的位置是比前一次高了还是低了
                // 如果高了 (向上滚动了) 就把顶部导航位置恢复
                // 在不能响应所有 scroll 事件的性能考虑下至少也做成这样
                // 基本上还是可以接受的
                $scope.topNavHidden = (top > prevTop);

                prevTop = top;
              });
            })();

            console.log($scope);
          });

      MainPage.$inject = ['$scope'];
      mod.directive('jqWaypoint', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            var fn = scope.$eval(attrs.jqWaypoint),
                ctx = attrs.jqWaypointCtx;

            // console.log(element);
            // console.log('attrs: ' + attrs);
            // console.log('attrs.jqWaypoint: ' + attrs.jqWaypoint);
            // console.log('fn: ' + fn);
            if (typeof ctx !== 'undefined') {
              element.waypoint(fn, { context: ctx });
            } else {
              element.waypoint(fn);
            }
          }
        };
      });
      mod.controller('MainPage', MainPage);

      angular.bootstrap(angular.element('#screen'), ['jnrain2-main']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
