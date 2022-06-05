import React from "react";
import { Button, TextField, Link, Grid, Container, Typography}
  from "@material-ui/core";
import {signup } from "./service/ApiService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    signup({email: email, username: username, password: password}).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style = {{ marginTop: "8%"}}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth 
                id="email" label="사용자 이름" name="username" autoComplete="fname" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth 
              id="email" label="이메일주소" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth 
              id="password" label="패스워드" type="password" name="password" 
              autoComplete="current-password" />
            </Grid> 
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2"></Link>
                이미 계정이 있습니까? 로그인 하세요.
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default SignUp;