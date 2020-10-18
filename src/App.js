import React from "react";
import "./App.css";
import Fixtures from "./components/Fixtures";
import Leagues from "./components/Leagues";

import { Provider } from "react-redux";
import store from "./store";

import { Pane, Heading, Text } from "evergreen-ui";

const App = () => (
  <Provider store={store}>
    <Pane padding={16} background="greenTint" borderRadius={3}>
      <div className="container">
        <Pane display="flex">
          <Pane flex={1}>
            <Heading size={700}>Footy Fixtures</Heading>
            <Text size={300}>
              Upcoming games from the World's top competitions
            </Text>
          </Pane>
          <Leagues />
        </Pane>
      </div>
    </Pane>
    <div className="container">
      <Fixtures />
    </div>
  </Provider>
);

export default App;
