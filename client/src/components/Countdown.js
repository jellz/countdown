import React, { Component } from 'react';
import config from '../.config.js';
import humanize from 'humanize-duration';

class Countdown extends Component {
  state = {
    countdown: null,
    durationString: null,
    error: null
  }

  async componentDidMount() {
    console.log(this.props);
    let slug = this.props.match.params.slug;
    let res = await fetch(config.API_BASE + '/api/countdowns/' + slug);
    let json = await res.json();
    if (!json.ok) return this.setState({ error: 'Error fetching countdown' });
    this.setState({ countdown: json.countdown });
    setInterval(() => this.setState({ 
      durationString: humanize(this.state.countdown.expires - Date.now(), { maxDecimalPoints: 0 })
    }), 99);
  }

  render() {
    return (
      <div className='container'>
        {!this.state.countdown && !this.state.error ? <h2>Loading...</h2> : <div>
          {Date.now() < this.state.countdown.expires && <div>
          <h1 className='countdown-header'>It's almost <span className='countdown-name'>{this.state.countdown.name}</span></h1>
          <h2 className='countdown-time'>{this.state.durationString}</h2></div>}
        </div>}
        {this.state.countdown && Date.now() > this.state.countdown.expires && <h2 className='countdown-error'>Countdown expired</h2>}
      </div>
    )
  }
}

export default Countdown;