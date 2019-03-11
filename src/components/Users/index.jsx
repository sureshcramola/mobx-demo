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
  }

  componentDidMount() {
    fetch(`https://reqres.in/api/users?page=`+this.state.currentPage) 
      .then(response => response.json()
        
      )
      .then( user=> {
          console.log(user)

          this.setState({ users: user.data,totalPage: user.total_pages,currentPage:user.page,totalUsers:user.total }, function () {
            console.log(this.state.users);
          });
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

  renderPagination(){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.totalPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(number => {
      return (
        <li><button onClick={(e) => this.changePage(number)}>{number}</button></li>
      );
    });

    // return <ul className={`pagination-ul ${this.state.currentPage <= this.state.totalPage ? 'show':'hide' } `}>
    //   <li><button onClick={(e) => this.changePage(1)}>&lt;&lt;</button></li>
    //   <li><button onClick={(e) => this.changePage(1)}>1</button></li>
    //   <li><button onClick={(e) => this.changePage(2)}>2</button></li>
    //   <li><button onClick={(e) => this.changePage(3)}>3</button></li>
    //   <li><button onClick={(e) => this.changePage(4)}>4</button></li>
    //   <li><button onClick={(e) => this.changePage(4)}>&gt;&gt;</button></li>
    // </ul>
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
          <li><button onClick={(e) => this.changePage('prev')}>&lt;</button></li>
          {this.renderPagination()}
          <li><button onClick={(e) => this.changePage('next')}>&gt;</button></li>
        </ul>
      </section>
    )
  }
}

export default Users;