function App($http) {
	var scope = this;
	scope.sortField = 'rank';
	scope.reverse = true;
	scope.url = 'http://localhost:15166/';
	scope.quotes = [];
	scope.editing = false;
	scope.limit = 100;
	scope.skip = 0;
	if (localStorage.quotes) {
		// scope.quotes = JSON.parse(localStorage.quotes);
	} else {
		scope.quotes = [];
	}
	scope.$watch('quotes', function(){
		localStorage.quotes = JSON.stringify(scope.quotes);
	});
	
	scope.bookmark = localStorage.bookmark || '';
	scope.$watch('bookmark', function(){
		localStorage.bookmark = scope.bookmark;
	});
	scope.prev = function() {
		scope.skip -= scope.limit;
		if (scope.skip < 0)
		scope.skip = 0;
		scope.load(scope.limit, scope.skip);
	};
	scope.next = function() {
		scope.skip = parseInt(scope.skip) + parseInt(scope.limit);
		scope.load(scope.limit, scope.skip);
	};
	scope.edit = function(index) {
		scope.data = scope.quotes[index];
		scope.editing = index;
		scope.mode = 'Update';
	};
	scope.mark = function(index) {
		scope.bookmark = index;
	};
	scope.load = function(limit, skip) {
		var url = scope.url + 'quotes/'+limit+'/'+skip+'.json';
		$http.get(url).success(function(data, status, headers, config){
			scope.quotes = data;
		});
	};
	scope.delete = function(index) {
		var url = scope.url + 'quotes/del/' + index;
		$http.del(url).success(function(){
			scope.quotes.splice(index, 1);
		});
	};
	scope.save = function() {
		if (scope.editing === false) {
			scope.add();
		} else {
			scope.update();
		}
	};
	scope.update = function() {
		scope.quotes[scope.editing] = scope.data;
		scope.editing = false;
		scope.data = {};
	};
	scope.add = function() {
		$http.post(scope.url + 'quotes/create.json', scope.data).success(function(response, status, headers, config){
			scope.quotes.push(scope.data);
			scope.data = {};
		});
	};
	scope.sort = function(column) {
		if (scope.sortField === column) {
			scope.reverse = !scope.reverse;
		} else {
			scope.sortField = column;
		}
	}
}