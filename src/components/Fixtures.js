import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMatches } from "../actions/actions";
import moment from "moment";
import "../App.css";

import { Pane, Heading, Text, Strong, Spinner, Alert } from "evergreen-ui";

class Fixtures extends Component {
  state = {
    currentLeague: 2014
  };

  componentDidMount() {
    this.props.dispatch(fetchMatches(this.props.league));
  }

  static getDerivedStateFromProps(props, state) {
    const { currentLeague } = state;
    const { league } = props;
    if (currentLeague !== league) {
      return {
        currentLeague: league
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.league !== this.state.currentLeague) {
      this.props.dispatch(fetchMatches(this.state.currentLeague));
    }
  }

  render() {
    const { error, loading, matches } = this.props;

    let output = [];

    if (error === null && loading === false && matches !== undefined) {
      if (matches.length === 0) {
        return (
          <Pane padding={16} marginTop={16} background="tint2" borderRadius={3}>
            <Heading>No upcoming fixtures</Heading>
          </Pane>
        );
      } else {
        function groupBy(objectArray, property) {
          return objectArray.reduce(function(acc, obj) {
            let key = obj[property];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        }

        function groupByDate(arr) {
          return arr.reduce((acc, obj) => {
            let dateOfGame = moment(obj.utcDate).format("dddd D MMMM");
            if (!acc[dateOfGame]) {
              acc[dateOfGame] = [];
            }
            acc[dateOfGame].push(obj);
            return acc;
          }, {});
        }

        let groupedMatches = groupBy(matches, "matchday");

        Object.entries(groupedMatches).map((entry, i) => {
          let groupedMatchesByDate = groupByDate(entry[1]);

          return output.push(
            <Pane marginBottom={16} key={i}>
              <Pane
                padding={16}
                marginBottom={16}
                background="tint2"
                borderRadius={3}
              >
                {entry[0] !== "null" ? (
                  <Heading>Matchday {entry[0]}</Heading>
                ) : (
                  <Heading>{entry[1][0].stage.replace(/_|-/g, " ")}</Heading>
                )}
              </Pane>

              {Object.entries(groupedMatchesByDate).map((games, index) => {
                let conditionBorderTop = index === 0 ? "" : "default";
                return (
                  <Pane
                    padding={16}
                    key={index}
                    className="panels"
                    borderTop={conditionBorderTop}
                  >
                    <Pane className="date-panel" paddingBottom={8}>
                      <Text>{games[0]}</Text>
                    </Pane>
                    <Pane className="fixture-panel">
                      {games[1].map((g, i) => {
                        return (
                          <Pane key={i} paddingBottom={8}>
                            <Text>
                              <Strong>{g.homeTeam.name}</Strong>
                            </Text>
                            <Text> vs </Text>
                            <Text>
                              <Strong>{g.awayTeam.name}</Strong>
                            </Text>
                          </Pane>
                        );
                      })}
                    </Pane>
                  </Pane>
                );
              })}
            </Pane>
          );
        });
      }
    }

    if (error) {
      return (
        <Alert
          appearance="card"
          intent="danger"
          title="Problem displaing fixtures"
        />
      );
    }

    if (loading) {
      return (
        <Pane
          margin={24}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Pane>
      );
    }

    return <Pane marginTop={16}>{output}</Pane>;
  }
}

function mapStateToProps(state) {
  return {
    matches: state.fixtures.matches.matches,
    loading: state.fixtures.loading,
    error: state.fixtures.error,
    league: state.leagues.selected.value,
    leagueTitle: state.fixtures.matches
  };
}

export default connect(mapStateToProps)(Fixtures);
