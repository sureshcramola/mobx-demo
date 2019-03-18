import React, { Component } from 'react';

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:[],
      totalPage:1,
      currentPage:1,
    }
    this.changePage = this.changePage.bind(this);
    this.navigatePagination = this.navigatePagination.bind(this);
  }

  componentDidMount() {
    fetch(`https://reqres.in/api/users?page=`+this.state.currentPage) 
      .then(response => response.json()
        
      )
      .then( user=> {
          this.setState({ users: user.data,totalPage: user.total_pages,currentPage:user.page,totalUsers:user.total });
      }).catch(error => console.log(error));
  }

  renderUsers() {
    
    return this.state.users.map((user, userID) => {
      console.log(user);
      return (
        <div className="user-card" key={userID}>
          <div className="user-img">
            <img src={user.avatar} alt="user-img" />
          </div>
          <p>{user.first_name + " " + user.last_name}</p>
        </div>
      )
    })
  }

  changePage(pageNumber){
    fetch(`https://reqres.in/api/users?page=`+pageNumber) 
      .then(response => response.json())
      .then( user=> {
        console.log(user)
        this.setState({ users: user.data,totalPage: user.total_pages,currentPage:user.page });
      })
  }

  navigatePagination(type){
    let { currentPage, totalPage } = this.state;
    console.log(currentPage,totalPage);
    if( type === 1 && currentPage < totalPage ){
      
      currentPage = currentPage + 1;
      fetch(`https://reqres.in/api/users?page=`+ currentPage) 
      .then(response => response.json())
      .then( user=> {
        console.log(user)
        this.setState({ users: user.data,totalPage: user.total_pages,currentPage:user.page });
      })

    } else if(type === -1 && currentPage > 1 ) {
      console.log(currentPage,totalPage);
      currentPage = currentPage - 1;
      fetch(`https://reqres.in/api/users?page=`+currentPage) 
      .then(response => response.json())
      .then( user=> {
        console.log(user)
        this.setState({ users: user.data,totalPage: user.total_pages,currentPage:user.page });
      })

    }
  }

  renderPagination(){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.totalPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(number => {
      return (
        <li key={number}><button className={`${this.state.currentPage === number ? 'active' :'' }`} onClick={(e) => this.changePage(number)}> {number} </button></li>
      );
    });
  }

  render() {
    // const {productStore} = this.state;
    console.log(this.state.currentPage+" fdf "+ this.state.totalPage)

    return (

      <section className="user-wrapper">
        <div className="d-flex flex-row-wrap-center">
          {this.renderUsers()}
        </div>
        <ul className={`pagination-ul ${this.state.currentPage <= this.state.totalPage ? 'show':'hide' } `}>
          <li><button onClick={(e) => this.navigatePagination(-1)}>&lt;</button></li>
          {this.renderPagination()}
          <li><button onClick={(e) => this.navigatePagination(1)}>&gt;</button></li>
        </ul>
      </section>
    )
  }
}

export default Users;
