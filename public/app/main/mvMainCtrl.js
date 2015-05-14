angular.module("app").controller("mvMainCtrl",function($scope){
    $scope.courses =    [
        {name: "C# for beginners", featured:true, published: new Date("2015/1/1")},
        {name: "C# advanced", featured:true, published: new Date("2015/2/1")},
        {name: "C# for experts", featured:false, published: new Date("2015/3/1")},
        {name: "C++ with noobs", featured:true, published: new Date("2015/4/1")},
        {name: "JS functional", featured:true, published: new Date("2015/5/1")},
        {name: "Object oriented JS", featured:true, published: new Date("2015/6/1")},
        {name: "MEAN Stack", featured:true, published: new Date("2015/7/1")},
        {name: "Ouch, no Couch?", featured:true, published: new Date("2015/8/1")},

    ];
});