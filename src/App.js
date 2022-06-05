import React from "react";
import "./App.css";
import Todo from "./Todo";
import { Paper, List, Container, 
  Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import AddTodo from "./AddTodo.js";
import { call, signout } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) => {
      this.setState({ items: response.data, loading: false });
    });
  }

  add = (item) => {
    /*
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    thisItems.push(item);
    this.setState({ itmes: thisItems });
    console.log("items: ", this.state.items);
    */
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  delete = (item) => {
    /*
    const thisItems = this.state.items;
    console.log("Before delete items", this.state.items);

    const newItems = thisItems.filter((e) => e.id !== item.id);

    this.setState({ items: newItems }, () => {
      console.log("After delete items", this.state.items);
    });
    */
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  
  render() {
    // <Todo> 컴포넌트 배열
    var todoItems = this.state.items.length > 0 && (
      <Paper>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>;
        </Container>
      </div>);

    var loadingPage=(<h1>로딩중...</h1>);

    var content = loadingPage;

    if( !this.state.loading) {
      content = todoListPage;
    }

    return (
      <div className="App">{content}</div>
    );
  }
}

export default App;
