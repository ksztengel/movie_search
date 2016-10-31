app.controller('HomeController', function($scope, movieService, $routeParams) {

    $scope.view = {};
    $scope.view.message = "This shows all the movies."
    $scope.getMovies = function(movie) {
        movieService.allMovies(movie).then(function(results) {
            $scope.view.omdb = results
            console.log('results:', results);
        })
    };
    var id = $routeParams.id
    movieService.oneMovie(id).then(function(results) {
        $scope.results = results
        console.log('results:', results);
    })
}); //end of controller


app.service("movieService", function($http) {
    //all movies
    return {
        allMovies: function(movie) {
            console.log(movie);
            return $http.get(`http://www.omdbapi.com/?s=${movie.title}`).then(function(data) {
                console.log(data.data.Search);
                return data.data.Search
            })
        },

        oneMovie: function(id) {
            console.log('id:', id);
            return $http.get(`http://www.omdbapi.com/?i=${id}`).then(function(data) {
                return data.data
                console.log('data:', data.data);
            })
        }
    } //end of return bracket
})
