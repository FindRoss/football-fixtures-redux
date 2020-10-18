import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLeagues } from "../actions/leagueActions";
import { LEAGUE_SELECTED } from "../actions/types";
import { Pane, Button, SelectMenu, Icon } from "evergreen-ui";

class Leagues extends Component {
  componentDidMount() {
    this.props.dispatch(fetchLeagues());
  }

  render() {
    const { leagues, error, loading, selected } = this.props;

    let leaguesArr = [];

    if (error === null && loading === false && leagues !== undefined) {
      leaguesArr = leagues.map(l => {
        return { label: l.name, value: l.id };
      });
    }

    return (
      <Pane marginTop={16}>
        <SelectMenu
          title="Select League"
          closeOnSelect={true}
          options={leaguesArr}
          selected={selected.value}
          onSelect={item => {
            this.props.dispatch({ type: LEAGUE_SELECTED, payload: item });
          }}
        >
          <Button appearance="primary">
            {selected.label} <Icon marginLeft={8} size={14} icon="cog" />
          </Button>
        </SelectMenu>
      </Pane>
    );
  }
}

const mapStateToProps = state => {
  return {
    leagues: state.leagues.leagues.competitions,
    loading: state.leagues.loading,
    error: state.leagues.error,
    selected: state.leagues.selected
  };
};

export default connect(mapStateToProps)(Leagues);
