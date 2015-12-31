/*  - RecordPage
 *    - Navtab
 *      - Nav
 *    - ScoreGroup
 *      - HostScore
 *      - GuestScore
 *    - PlayerButtonGroup
 *      - PlayerButton
 *    - ActionButtonGroup
 *    - ResultButtonGroup
 */
var RecordPage = React.createClass({
  getInitialState: function() {
    return {
      score: {
        host: 0,
        guest: 0},
      is_host_serve: true,
      players: [
          new Player(1, "國婷"),
          new Player(2, "小美"),
          new Player(3, "虹熠"),
          new Player(4, "周仔"),
          new Player(5, "黃丹"),
          new Player(6, "心如")],
    };
  },
  onSubmitClick: function() {
    var player_idx = this.refs.player.state.enabled_id;
    var action = this.refs.action.state.enabled_id;
    var result = this.refs.result.state.enabled_id;
    console.info(this.state.players[player_idx]);
    this.state.players[player_idx].addRecord(action, result);

    var new_state = Object.assign({}, this.state);
    if (result == "得分") {
      new_state.score.host += 1;
      if (!this.state.is_host_serve) {
        var player0 = new_state.players[0];
        for (var i = 0; i < 5; i++) {
          new_state.players[i] = this.state.players[i+1];
        }
        new_state.players[5] = player0;
        new_state.is_host_serve = true;
      }
    } else if (result == "失分") {
      new_state.score.guest += 1;
      if (this.state.is_host_serve) {
        new_state.is_host_serve = false;
      }
    }
    this.setState(new_state);
    this.unfocusButtons();
  },
  onCancelClick: function() {
    this.unfocusButtons();
  },
  onUndoClick: function() {
    alert('This feature is not implemented yet');
  },
  unfocusButtons: function() {
    this.refs.player.setState({enabled_id: null});
    this.refs.action.setState({enabled_id: null});
    this.refs.result.setState({enabled_id: null});
  },
  render: function() {
    return (
      <div className="container-fluid">
        <NarTab />
        <ScoreGroup score={this.state.score} is_host_serve={this.state.is_host_serve}/>
        <PlayerButtonGroup ref="player" players={this.state.players} />
        <ActionButtonGroup ref="action"/>
        <p />
        <ResultButtonGroup ref="result"/>
        <hr />
        <div className="row">
          <MyButton button_count="3" onClick={this.onSubmitClick} name="確定" />
          <MyButton button_count="3" onClick={this.onCancelClick} name="取消" />
          <MyButton button_count="3" onClick={this.onUndoClick} name="復原" />
        </div>
      </div>
    );
  }
});

var NarTab = React.createClass({
  render: function() {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation"><a>比賽設定</a></li>
        <li role="presentation" className="active"><a>開始記錄</a></li>
        <li role="presentation"><a>結果整理</a></li>
      </ul>
    );
  }
});

var ScoreGroup = React.createClass({
  render: function() {
    return (
      <div className="row">
        <ScoreField header="我方分數" score={this.props.score["host"]} is_serve={this.props.is_host_serve}/>
        <ScoreField header="對方分數" score={this.props.score["guest"]} is_serve={!this.props.is_host_serve} />
      </div>
    );
  }
});

var ScoreField = React.createClass({
  render: function() {
    var panel_class = "panel panel-default";
    if (this.props.is_serve) {
      panel_class += " panel-primary";
    }
    return (
        <div className="col-md-6 col-xs-6">
          <div className={panel_class}>
            <div className="panel-heading text-center">{this.props.header}</div>
            <div className="panel-body text-center"><big>{this.props.score}</big></div>
          </div>
        </div>
    );
  }
});

var PlayerButtonGroup = React.createClass({
  getInitialState: function() {
    return {enabled_id: null};
  },
  handleClick: function(button, event) {
    var id = button.props.id;
    var enabled_id = (this.state.enabled_id == id) ? null : id;
    this.setState({enabled_id: enabled_id});
  },
  render: function() {
    var player_button_func = function(index) {
      return <MyButton key={index} id={index} name={this.props.players[index].name}
                       enabled={this.state.enabled_id == index}
                       button_count="3"
                       onClick={this.handleClick} />;
    }.bind(this);
    return (
    <div id="PlayerButtonGroup">
      <div className="row"> {[3, 2, 1].map(player_button_func)} </div>
      <div className="row"> {[4, 5, 0].map(player_button_func)} </div>
      <hr />
    </div>
    );
  }
});

var ActionButtonGroup = React.createClass({
  getInitialState: function() {
    return {enabled_id: null};
  },
  handleClick: function(button, event) {
    var button_id = button.props.id;
    var enabled_id = (this.state.enabled_id == button_id) ? null : button_id;
    this.setState({enabled_id: enabled_id});
  },
  render: function() {
    var action_button_func = function(id) {
      return <MyButton key={id} id={id} name={id}
                       enabled={this.state.enabled_id == id}
                       button_count="4"
                       onClick={this.handleClick} />;
    }.bind(this);
    return (
      <div id="ActionButtonGroup" ref="ActionButtonGroup">
        <div className="row">
          {["發球", "攻擊", "吊球", "處理球"].map(action_button_func)}
        </div>
        <div className="row">
          {["接發球", "接扣球", "接小球", "攔網"].map(action_button_func)}
        </div>
        <div className="row">
          {["舉二號", "舉四號", "舉修正", "舉後排"].map(action_button_func)}
        </div>
      </div>
    );
  }
});

var ActionButton = React.createClass({
  render: function() {
    var btn_class = this.props.enabled ? "btn-primary" : "btn-default";
    return (
        <div className="col-md-3 col-xs-3 player-padding">
          <button type="button" className={"btn btn-block " + btn_class}
                  onClick={this.props.onClick.bind(null, this)}>
            {this.props.name}
          </button>
        </div>
    );
  }
});

var ResultButtonGroup = React.createClass({
  getInitialState: function() {
    return {enabled_id: null};
  },
  handleClick: function(button, event) {
    var button_id = button.props.id;
    var enabled_id = (this.state.enabled_id == button_id) ? null : button_id;
    this.setState({enabled_id: enabled_id});
  },
  render: function() {
    var result_button_func = function(id) {
      return <MyButton key={id} id={id} name={id}
                       enabled={this.state.enabled_id == id}
                       button_count="4"
                       onClick={this.handleClick} />;
    }.bind(this);
    return (
      <div id="ResultButtonGroup" ref="ResultButtonGroup">
        <div className="row">
          {["得分", "有效", "失誤", "失分"].map(result_button_func)}
        </div>
      </div>
    );
  }
});

var MyButton = React.createClass({
/* props.button_count: how many button in a row
 * props.enabled: Is the button pressed?
 * props.name: The text in the button
 */
  render: function() {
    var size = (12 / this.props.button_count).toFixed();
    var div_class = " col-md-" + size + " col-xs-" + size;
    var btn_class = (this.props.enabled ? " btn-primary" : " btn-default");

    var remain_props = Object.assign({}, this.props);
    delete remain_props.name;
    delete remain_props.button_count;
    delete remain_props.enabled;
    delete remain_props.onClick;
    return (
        <div className={"button-padding " + div_class}>
          <button type="button" className={"btn btn-block" + btn_class}
                  onClick={this.props.onClick.bind(null, this)}
                  {...remain_props}>
            {this.props.name}
        </button>
        </div>
    );
  }
});

ReactDOM.render(
  <RecordPage />,
  document.body
);
