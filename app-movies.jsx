
//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   ACTORS  ---
//--------------------------------------------------------------------------------------------------------P

class Actor{
    constructor(fName, lName, bDay, image, link) {
        this.fName = fName;
        this.lName = lName;
        this.bDay = bDay;
        this.image = image;
        this.link = link;
        this.nameTitle = "Name";
        this.nameBd = "Birthday";
        this.nameAge = "Age";
      }
      returnAge() { // birthday is a date
           var birthday = + new Date(this.bDay);
           return ~~((Date.now() - birthday) / (31557600000));
      }
      printBirthday(){
         var date  = new Date(this.bDay);
         var res = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
         return res;
      }
}

  
class ActorCard extends React.Component {
    constructor(props){
        super(props);
       //this.getInput = this.getInput.bind(this);
    }
    // getInput(event){
    //     this.props.enterLetter(event.target.value)
    // }
     render() {
      var Row = ReactBootstrap.Row 
      var Col = ReactBootstrap.Col 
      var Card = ReactBootstrap.Card
      var actor = this.props.actor
      const divStyle = {
         backgroundImage: 'url(' + actor.image + ')',
         opacity : 0.2
      };
            
         return (    
              
                  <Card bg="light shadow" style={{ width: '335px' }}>
                  <Card.Header><span class="nav-orange">{actor.fName}<span> </span>{actor.lName}</span></Card.Header>
                    <Card.Body >
                    <Card.Text >
                        <Row>
                            <Col> <img className="shadow" src={actor.image}  style={{ width: '100px' }}></img></Col>
                            <Col  className=" text-center "> 
                            {/* <h3>  {actor.fName} </h3><h3>{actor.lName}</h3> */}
                            <h5>{actor.nameAge}: {actor.returnAge()}</h5>
                            <p>{actor.nameBd}: {actor.printBirthday()}</p>
                            </Col>
                        </Row>
                    </Card.Text>
                   
                  </Card.Body>
                 
                  <Card.Footer>For more information please visit {actor.fName} {actor.lName} <a href={actor.link}>IMBD page</a>.</Card.Footer>
                </Card>
                              
          );}
     }

class Actors extends React.Component {
        constructor(props){
            super(props);
           //this.getInput = this.getInput.bind(this);
            this.state = {
                 actors : []
            }
          }
       
        componentDidMount() {
          // Get data from JSON
         
          // jQuery
            $.get("actors.json", data => {
              console.log(data);
              data.forEach(x => {
                let newActor = new Actor(x.fName, x.lName, x.bDay, x.image,x.link);
                this.state.actors.push(newActor);
              });
            //   this.state.isLoading = false;
              this.setState(this.state);
            });
        
        }


        printTolog(){
            console.log(this.state.actors);
        }
         render() {
         var Row = ReactBootstrap.Row 
         var Col = ReactBootstrap.Col 
         var filter = this.props.filter // filter for actor names 
         var sort = this.props.sort //sort by 
         var viewAllActors = [] // array with actors cards and layout 
         //var temp = this.state.actors[1].key
         if(sort=="fName"){
            this.state.actors.sort((a, b) => (a.fName > b.fName) ? 1 : -1)
         }
         if(sort=="lName"){
            this.state.actors.sort((a, b) => (a.lName > b.lName) ? 1 : -1)
         }
         if(sort=="age"){
            this.state.actors.sort((a, b) => (a.returnAge() > b.returnAge()) ? 1 : -1)
         }
    
         
         for (let i=0;i<this.state.actors.length;i++)
         {
            let fullName = this.state.actors[i].fName + this.state.actors[i].lName // get full name in one string
            if (fullName.toLowerCase().includes(filter.toLowerCase()) ){ // fullname and filter to lowCase to find all names 
            let viewAllActor = 
                    <Col xs="auto" md="auto" sm="auto" lg="auto" className="my-2" >
                         <ActorCard actor={this.state.actors[i]}/>
                    </Col>
                    viewAllActors.push(viewAllActor);
                }        
         }
         this.printTolog();
            
             return (    
                <Row className="justify-content-center ">
                     
                      {viewAllActors}
                      
                    </Row>    
                    
              );}
         }
    
class ActorsPage extends React.Component {
    constructor(){
        super();
       // this.output=this.output.bind(this);
        this.state = {
             input : "",
             sort: ""
        }
         this.getFilterText = this.getFilterText.bind(this);
         this.sortBy = this.sortBy.bind(this);
    }
    getFilterText (event){
           this.state.input = event.target.value
           this.setState(this.state);
    }
    sortBy (event){
        this.state.sort = event.target.value
        this.setState(this.state);
    }
     render() {
       var Container = ReactBootstrap.Container;
       var InputGroup = ReactBootstrap.InputGroup;
       var FormControl = ReactBootstrap.FormControl;
       var Row = ReactBootstrap.Row 
       var Col = ReactBootstrap.Col 
       var Form = ReactBootstrap.Form 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
        return (  
          <Container className="">
          <Navbar bg="dark rounded">
                  <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav class="nav justify-content-center ">
                          <NavLink class="nav-link nav-orange"  to="/">Home</NavLink>
                          <NavLink class="nav-link nav-orange active" to="/actors">Actors</NavLink>
                          <NavLink class="nav-link nav-orange " to="/movies">Movies</NavLink>
                         </Nav>
                          </Navbar.Collapse>
                    </Navbar>
           <Row>
            <Col sm="11" md ="10" xl="12" className=" mx-auto">
             <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                       <InputGroup.Text id="inputGroup-sizing-sm">Filter by:</InputGroup.Text>
               </InputGroup.Prepend>
               <FormControl onChange={this.getFilterText} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="actors name"/>
               <InputGroup.Prepend>
                       <InputGroup.Text id="inputGroup-sizing-sm">Sort By:</InputGroup.Text>
               </InputGroup.Prepend>
               <Form.Control as="select" onChange={this.sortBy}>
                        <option value="">Choose...</option>
                        <option value="fName">First Name</option>
                        <option value="lName">Last Name</option>
                        <option value="age">Age</option>
                        </Form.Control>
             </InputGroup>
            </Col>
        </Row>   
        <Actors filter={this.state.input} sort={this.state.sort}></Actors>
       </Container>
      )
    }
}   
//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   MOVIES   ---
//--------------------------------------------------------------------------------------------------------P


class Movie{
    constructor(movieTMDBObject) {
        this.id = movieTMDBObject.id;
        this.title = movieTMDBObject.title;
        this.poster = "https://image.tmdb.org/t/p/w200" + movieTMDBObject.poster_path;
        this.imdb = movieTMDBObject.imdb_id;
        this.time = movieTMDBObject.runtime;
        this.timeTitle = "Run Time"
        this.overview = movieTMDBObject.overview;
        this.realise = movieTMDBObject.release_date
        this.cast = movieTMDBObject.cast;
     }
     returnYear() { // birthday is a date
        var x = new Date(this.realise);
        return ~~(x.getFullYear());
   }
}

class Movies extends React.Component {
        constructor(props){
            super(props);
            
            this.getActorsFromMovie = this.getActorsFromMovie.bind(this);
         }
         getActorsFromMovie(movie) {
            console.log(movie.cast[0].name )    
            let actors = [];
            for(let i=0;i<3;i++ ) {
                 actors.push(<p><span className="movieTitle" > {movie.cast[i].name} </span>  as  <span className="font-italic">{movie.cast[i].character}</span></p>   )
             }
             return actors
         }
       
         render() {
         var Row = ReactBootstrap.Row 
         var Col = ReactBootstrap.Col 
         var Card = ReactBootstrap.Card
         let viewAllMovies =  this.props.movie.map(movie => {
   
           let actors = this.getActorsFromMovie(movie);

           return (
           <Row className="my-3"> 
               <Col>
            <Card bg="light shadow" style={{ width: '100%' }}>
           <Card.Header><span className="h3 movieTitle">{movie.title} </span> <span className="h5 text-muted mx-2">{movie.returnYear()}</span><span style={{float:'right'}}> {movie.time} min </span></Card.Header>
           <Card.Body >
            <Card.Text >
                <Row>
                    <Col className="border" xs="12" sm="auto" > <img className="shadow " src={movie.poster}  style={{ width: '100%' }}></img></Col>
                    <Col className="border"> 
                    <p>{movie.overview}</p>
                    {actors}
                
                    </Col>
                </Row>
            </Card.Text>
        
          </Card.Body>
                     <Card.Footer>For more information please visit <a href={movie.imdb}> {movie.title} IMBD page</a>.</Card.Footer>
          </Card>
          </Col>
        </Row>
         )});
        
             return (    
                <Col className="justify-content-center ">
                  {viewAllMovies}
                  </Col>    
           
              );}
         }


class MoviesPage extends React.Component {
    constructor(){
        super();
        this.state = {
            searchResults:[],
            selectedMovies:[],
            movieCredits: []
       }
         this.searchMovies = this.searchMovies.bind(this);
         this.addMovie = this.addMovie.bind(this);
   }
    searchMovies (event){
         // Get data from JSON
     
        if(event.target.value){
           let searchText = event.target.value //"matrix"  
           let searchMovieURL = "https://api.themoviedb.org/3/search/movie?api_key=2ced30f0198ab6957fa876628c416dd8&language=en-US&query=" + searchText + "&page=1"
           
           axios.get(searchMovieURL).then(res => {
               //  console.log(res);
                 this.state.searchResults = res.data.results;
                 this.setState(this.state);
           })
        } else {
         // Cleaning input
            this.state.searchResults = [];
          this.setState(this.state);
        }
      //  console.log(this.state.searchResults); // all of income object insert into searchResults
     }
 
  addMovie(event) {
        let movieId = event.target.getAttribute("data-id");
        let movieDetailsURL = "https://api.themoviedb.org/3/movie/" + movieId +"?api_key=2ced30f0198ab6957fa876628c416dd8&language=en-US"
        let movieCreditsURL = "https://api.themoviedb.org/3/movie/" + movieId +"/credits?api_key=2ced30f0198ab6957fa876628c416dd8"
        console.log(movieId)
        let promiseArr = [];

    // AJAX Call 1
    let p1 = axios.get(movieDetailsURL);
    let p2 = axios.get(movieCreditsURL);
    promiseArr.push(p1);
    promiseArr.push(p2);

    Promise.all(promiseArr).then(responses => {
        responses[0].data // details
        responses[1].data // credita
        let newMovie = new Movie(responses[0].data);
        newMovie.cast = responses[1].data.cast
        //console.log(responses[0].data);
       
        this.state.selectedMovies.push(newMovie);
        console.log(this.state.selectedMovies);
        this.searchInput.value = "";
        this.state.searchResults = [];
        this.setState(this.state);
       
    });
 }  
    
     render() {
       var Container = ReactBootstrap.Container;
       var InputGroup = ReactBootstrap.InputGroup;
       var FormControl = ReactBootstrap.FormControl;
       var Row = ReactBootstrap.Row 
       var Col = ReactBootstrap.Col 
       var ListGroup = ReactBootstrap.ListGroup 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;

       let listSearchResults = this.state.searchResults.map(result => (
           <ReactBootstrap.ListGroup.Item action onClick={this.addMovie} data-id={result.id}>
             {result.title}
           </ReactBootstrap.ListGroup.Item>
        ));
       
       return (    
                 
                 <Container className="">
                
                  <Navbar bg="dark rounded">
                  <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav class="nav justify-content-center ">
                          <NavLink class="nav-link nav-orange"  to="/">Home</NavLink>
                          <NavLink class="nav-link nav-orange" to="/actors">Actors</NavLink>
                          <NavLink class="nav-link nav-orange active" to="/movies">Movies</NavLink>
                         </Nav>
                          </Navbar.Collapse>
                    </Navbar>
                   
                      <Row>
                          <Col>
                           <h3 className="movieTitle">Your favorite movies:</h3>
                          </Col>
                      </Row>
                      <Row>
                        <Col className="search-box">
                          <InputGroup size="sm" className="mb-3">
                             <InputGroup.Prepend>
                                   <InputGroup.Text id="inputGroup-sizing-sm">Add move by:</InputGroup.Text>
                             </InputGroup.Prepend>
                             <FormControl  onChange={this.searchMovies}  ref={element => {this.searchInput = element}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="movie name"/>
                          </InputGroup>
                         <ListGroup className="search-results">
                          {listSearchResults}
                         </ListGroup>
                        </Col>
                    </Row>   
                    <Row >
                      <Movies movie={this.state.selectedMovies} ></Movies>  
                    </Row>    
                 </Container>
                 
                 );
             }
}   
//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   Home page   ---
//--------------------------------------------------------------------------------------------------------P
class Home extends React.Component {
    constructor(props){
        super(props);
    }
     render() {
       var Container = ReactBootstrap.Container;
       var Button = ReactBootstrap.Button 
       var Switch = ReactRouterDOM.Switch 
       var Route = ReactRouterDOM.Route 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
       var Jumbotron = ReactBootstrap.Jumbotron;
       return (    
                 
                 <Container >
                  
                  <Navbar bg="dark rounded">
                  <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav class="nav justify-content-center ">
                          <NavLink class="nav-link nav-orange active"  to="/">Home</NavLink>
                          <NavLink class="nav-link nav-orange" to="/actors">Actors</NavLink>
                          <NavLink class="nav-link nav-orange " to="/movies">Movies</NavLink>
                         </Nav>
                          </Navbar.Collapse>
                    </Navbar>
                    <Jumbotron>
                      <h1>Hello!</h1>
                      <p>
                        This is a small application about favorite actors and movies
                      </p>
                      <p>
                      <NavLink class="nav-link nav-orange d-inline" to="/actors"><Button variant="secondary ">Actors</Button></NavLink>
                      <NavLink class="nav-link nav-orange d-inline" to="/movies"> <Button variant="secondary ">Movies</Button></NavLink> 
                       
                      </p>
                    </Jumbotron>
  
                 </Container>
                 
                 );
             }
     }
     
    


//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   APP   ---
//--------------------------------------------------------------------------------------------------------P

class App extends React.Component {
    constructor(){
        super();
    }
     render() {
       var Container = ReactBootstrap.Container;
       var Col = ReactBootstrap.Col 
       var Switch = ReactRouterDOM.Switch 
       var Route = ReactRouterDOM.Route 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
       return (    
                 
                 <Container className=" bg-dark">
                  
                     
                    <Switch>
                      <Route exact path="/" class="nav-link nav-orange" component={Home}/> 
                      <Route exact path="/actors/" class="nav-link nav-orange" component={ActorsPage}/> 
                      <Route exact path="/movies/" class="nav-link nav-orange" component={MoviesPage}/>
                    </Switch>
  
                 </Container>
                 
                 );
             }
     }
     
    


    ReactDOM.render( 
        <ReactRouterDOM.HashRouter>
            <App />
          </ReactRouterDOM.HashRouter>,
         document.getElementById("root")
        );