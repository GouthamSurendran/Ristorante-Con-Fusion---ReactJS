import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component{

  constructor(props){
    super(props);

    this.state={
      dishes:DISHES,
    };
  }
 
render(){

    const Homepage = () =>{
        return(
            <Home/>
        );
    }

  return (
    <div>
    <Header/>
    <Switch>
    <Route path='/home' component={Homepage} />
    <Route exact path='/menu' component={()=> <Menu dishes={this.state.dishes}/>} />}/> //one way to define it.
    <Redirect to='/home'/>
    </Switch>
      <Footer/>
    </div>
   
  );
}
}

export default Main;
