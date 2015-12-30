/*  - RecordPage
 *    - Navtab
 *      - Nav
 *    - ScoreGroup
 *      - HostScore
 *      - GuestScore
 *    - PlayerButtonGroup
 *      - PlayerButton
 *    - PerformanceButtonGroup
 *      - ActionButtonGroup
 *      - ResultButtonGroup
 *    - ConfirmButtonGroup
 */

var RecordPage = React.createClass({
  getInitialState: function() {
    return {
      score: {
        host: 0,
        guest: 0},
      is_host_serve: true,
      players: ["國婷", "小美", "虹熠", "周仔", "黃丹", "心如"],
      enabled_player: null,
      enabled_action: null,
      enabled_result: null,
    };
  },
  render: function() {
    return (
      <div className="container-fluid">
        <NarTab />
        <ScoreGroup score={this.state.score} is_host_serve={this.state.is_host_serve}/>
        <PlayerButtonGroup players={this.state.players}/>
        <PerformanceButtonGroup />
        <hr />
        <ConfirmButtonGroup />
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
    return {enabled_player: null};
  },
  handleClick: function(button, event) {
    var player_id = button.props.player_id;
    var enabled_player = (this.state.enabled_player == player_id) ? null : player_id;
    this.setState({enabled_player: enabled_player});
  },
  render: function() {
    var player_button_func = function(index) {
      return <PlayerButton key={index} player_id={index}
                           enabled={this.state.enabled_player == index}
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
    var btn_class = "btn btn-block " + (this.props.enabled ? "btn-primary" : "btn-default");
    return (
        <div className="col-md-4 col-xs-4 player-padding">
          <button type="button" className={btn_class} onClick={this.props.onClick.bind(null, this)}>
            {this.props.name}
          </button>
        </div>
    );
  }
});

var PerformanceButtonGroup = React.createClass({
  render: function() {
    return (
        <div id="PerformanceButtonGroup">
          <ActionButtonGroup />
          <p />
          <ResultButtonGroup />
        </div>
    );
  }
});

var ActionButtonGroup = React.createClass({
  render: function() {
    return (
      <div id="ActionButtonGroup">
        <div className="row">
          <ActionButton name="發球" />
          <ActionButton name="攻擊" />
          <ActionButton name="吊球" />
          <ActionButton name="處理球" />
        </div>
        <div className="row">
          <ActionButton name="接發球" />
          <ActionButton name="接扣球" />
          <ActionButton name="接小球" />
          <ActionButton name="攔網" />
        </div>
        <div className="row">
          <ActionButton name="舉二號" />
          <ActionButton name="舉四號" />
          <ActionButton name="舉修正" />
          <ActionButton name="舉後排" />
        </div>
      </div>
    );
  }
});

var ActionButton = React.createClass({
  render: function() {
    return (
        <div className="col-md-3 col-xs-3 player-padding">
          <button type="button" className="btn btn-default btn-block">{this.props.name}</button>
        </div>
    );
  }
});

var ResultButtonGroup = React.createClass({
  render: function() {
    return (
      <div id="ResultButtonGroup">
        <div className="row">
          <ResultButton name="得分" />
          <ResultButton name="有效" />
          <ResultButton name="失誤" />
          <ResultButton name="失分" />
        </div>
      </div>
    );
  }
});

var ResultButton = React.createClass({
  render: function() {
    return (
        <div className="col-md-3 col-xs-3 player-padding">
          <button type="button" className="btn btn-default btn-block">{this.props.name}</button>
        </div>
    );
  }
});

var ConfirmButtonGroup = React.createClass({
  render: function() {
    return (
      <div id="ConfirmButtonGroup">
        <div className="row">
          <div className="col-md-4 col-xs-4 player-padding">
            <button type="button" className="btn btn-default btn-block">確定</button>
          </div>
          <div className="col-md-4 col-xs-4 player-padding">
            <button type="button" className="btn btn-default btn-block">取消</button>
          </div>
          <div className="col-md-4 col-xs-4 player-padding">
            <button type="button" className="btn btn-default btn-block">復原</button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <RecordPage />,
  document.body
);
