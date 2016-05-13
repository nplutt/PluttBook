module.exports = function(){
    return {
        quickSort: quickSort
    };

    function quickSort(arr, customSort){
        //if array is empty
        if(!customSort) {
            customSort = function(a, b) {
                return a < b;
            };
        }
        if (arr.length === 0) {
            return [];
        }
        var left = [];
        var right = [];
        var pivot = arr[0];
        //go through each element in array
        for (var i = 1; i < arr.length; i++) {
            if (customSort(arr[i], pivot)) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return this.quickSort(left, customSort).concat(pivot, this.quickSort(right, customSort));
    }

};