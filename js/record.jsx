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
      players: ["國婷", "小美", "虹熠", "周仔", "黃丹", "心如"],
    };
  },
  onSubmitClick: function() {
    var player = this.refs.player.state.enabled_id;
    var action = this.refs.action.state.enabled_id;
    var result = this.refs.result.state.enabled_id;
    console.info("%s %s %s", player, action, result);
  },
  onCancelClick: function() {
  },
  onUndoClick: function() {
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
          <OneThirdButton onClick={this.onSubmitClick} name="確定" />
          <OneThirdButton onClick={this.onCancelClick} name="取消" />
          <OneThirdButton onClick={this.onUndoClick} name="復原" />
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
      return <PlayerButton key={index} id={index}
                           enabled={this.state.enabled_id == index}
                           name={this.props.players[index]} onClick={this.handleClick} />;
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

var PlayerButton = React.createClass({
  render: function() {
    var btn_class = this.props.enabled ? "btn-primary" : "btn-default";
    return (
        <div className="col-md-4 col-xs-4 player-padding">
          <button type="button" className={"btn btn-block " + btn_class}
                  onClick={this.props.onClick.bind(null, this)}>
            {this.props.name}
          </button>
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
    console.info("action: %s", this.state.enable);
  },
  render: function() {
    var action_button_func = function(id) {
      return <ActionButton key={id} id={id}
                           enabled={this.state.enabled_id == id}
                           name={id} onClick={this.handleClick} />;
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
    console.info("result: %s", this.state);
  },
  render: function() {
    var result_button_func = function(id) {
      return <ResultButton key={id} id={id}
                           enabled={this.state.enabled_id == id}
                           name={id} onClick={this.handleClick} />;
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

var ResultButton = React.createClass({
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

var OneThirdButton = React.createClass({
  render: function() {
    return (
        <div className="col-md-4 col-xs-4 player-padding">
          <button type="button" className="btn btn-default btn-block"
                  onClick={this.props.onClick}>{this.props.name}</button>
        </div>
    );
  }
});

var OneQuarterButton = React.createClass({
  render: function() {
    return (
        <div className="col-md-3 col-xs-3 player-padding">
          <button type="button" className="btn btn-default btn-block"
                  onClick={this.props.onClick}>{this.props.name}</button>
        </div>
    );
  }
});

ReactDOM.render(
  <RecordPage />,
  document.body
);
