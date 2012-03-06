function App($http) {
	var scope = this;
	scope.sortField = 'rank';
	scope.reverse = true;
	scope.url = 'http://localhost:15166/';
	scope.quotes = [];
	scope.editing = false;
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
	scope.edit = function(index) {
		scope.data = scope.quotes[index];
		scope.editing = index;
		scope.mode = 'Update';
	};
	scope.mark = function(index) {
		scope.bookmark = index;
	};
	scope.load = function(limit, skip) {
		var url = scope.url + 'quotes.json';
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