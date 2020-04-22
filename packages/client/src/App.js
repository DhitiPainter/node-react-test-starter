import React, { PureComponent } from "react";
import "./App.css";
import {
  Button,
  Card,
  Container,
  CardHeader,
  TextField,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

import { connect } from "react-redux";
import { postUser } from "./actions/actions";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
    };
  }

  onFirstNameChange = (event) =>
    this.setState({ firstName: event.target.value });

  onLastNameChange = (event) => this.setState({ lastName: event.target.value });

  render() {
    const { firstName, lastName } = this.state;
    return (
      <Container>
        <h3>User Form</h3>
        <form noValidate data-testid="form" autoComplete="off">
          <TextField
            className="formControl"
            data-testid="firstName"
            value={firstName}
            onChange={(e) => this.onFirstNameChange(e)}
            id="first-name"
            placeholder="First Name"
            required
            error={firstName === ""}
            helperText={firstName === "" ? "This field is required" : ""}
          />
          <br />
          <br />
          <TextField
            value={lastName}
            data-testid="lastName"
            onChange={(e) => this.onLastNameChange(e)}
            id="last-name"
            placeholder="Last Name"
            required
            error={firstName === ""}
            helperText={firstName === "" ? "This field is required" : ""}
          />
        </form>
        <div className="buttonDiv">
          {this.props.loading ? (
            <Button variant="contained" color="primary" disableElevation>
              Loading ...
            </Button>
          ) : (
            <Button
              onClick={() => this.props.submit({ firstName, lastName })}
              data-testid="button"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          )}
        </div>
        {this.props.message && (
          <Card data-testid="message">
            <CardHeader title={this.props.message} />
          </Card>
        )}
        {this.props.error && (
          <div data-testid="error-msg">
            <ToastContainer />
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  message: state.message,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (user) => dispatch(postUser(user)),
  };
};

App.defaultProps = {
  loading: false,
  message: "",
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
