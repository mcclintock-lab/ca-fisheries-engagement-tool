

        <RaisedButton ref={"goalsButton"} label="Goals" onTouchTap = {this._goalsTouch}  icon={<Avatar style={(isGoals || isGoalsOverview) ? selAvatarStyle : deselAvatarStyle}>A</Avatar>} />
        <Popover         
          style={menuStyle}  
          anchorEl={this.refs.goalsButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          open={this.state.goalsOpen} 
          onRequestClose={this._handleGoalsClose}
        >
          <Menu >
              {Object.keys(this.state.alltabs['goals'].values).map(function(goal){
                <MenuItem primaryText={goal.name}/>
              }, this)}
          </Menu>
        </Popover>  
        <RaisedButton label="Timing" onTouchTap={this._timingTouch()} 
              icon={<Avatar style={isTimeline ? selAvatarStyle : deselAvatarStyle}>B</Avatar>} />
        <RaisedButton ref={"characteristicsButton"} label="Chracteristics" onTouchTap={this._characteristicsTouch} style={stepListStyle} icon={<Avatar style={(isCharacteristics || isCharOverview) ? selAvatarStyle : deselAvatarStyle}>C</Avatar>}/>
          <Popover
            ref={"characteristicsPopover"}
            anchorEl={this.state.charAnchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            open={this.state.open} 
            onRequestClose={this._handleCharacteristicsClose()}
          >   
          <Menu width={400} menuItems={menu_items}>
          </Menu>
        </Popover>  