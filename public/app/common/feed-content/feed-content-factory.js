module.exports = function($q, $http, $routeParams, $location){
    var statuses = {
        statuses: null,
        commentBoxArray: []
    };

    return {
        getStatuses: getStatuses,
        postLike: postLike,
        postComment: postComment,
        formatStatusTime: formatStatusTime,
        statuses: statuses,
        goToProfile: goToProfile
    };

    function getStatuses() {
        var route = 'api/status';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
         $http.get(route)
             .success(function(data){
                statuses.statuses = data;
                createBlankCommentBoxArray();
            })
            .error(function(data){
                console.log('Here');
            });
    }

    function postLike(statusId){
        return $http.post('api/like', statusId);
    }

    function postComment(comment){
        return $http.post('api/comment', comment);
    }

    function formatStatusTime(unix){
        var currentTime = new Date();
        currentTime = Date.parse(currentTime)/1000;
        var difference = currentTime - unix;
        //Converts to minutes if less than 60
        if(Math.floor(difference / 60) < 60){
            return Math.floor(difference / 60).toString() + ' mins ago';
        }
        else if(Math.floor(difference / 3600) < 24){
            return Math.floor(difference / 3600).toString() + ' hrs ago';
        }
        else if(Math.floor(difference / 86400)< 7){
            return Math.floor(difference / 86400) + ' days ago';
        }
        else{
            var date = new Date(unix * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var day = date.getDate();
            return month + ' ' + day + ' ' + year;
        }
    }

    function createBlankCommentBoxArray() {
        for (var i = 0; i < statuses.statuses.length; i++) {
            statuses.commentBoxArray.push('');
        }
    }

    function goToProfile(userId){
        $location.path('/profile/userid/' + userId);
    }
};