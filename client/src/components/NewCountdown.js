import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import config from '../.config.js';

class NewCountdown extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  
  state = {
    eventDate: new Date(new Date().getTime() + 10 * 60000), // 10 minutes from now
    eventName: ''
  }

  minDate = new Date();

  handleDateChange(eventDate) {
    this.setState({ eventDate });
  }

  handleNameChange(event) {
    this.setState({ eventName: event.target.value })
  }

  async handleSubmit(formEvent) {
    formEvent.preventDefault();
    if (!this.state.eventDate || !this.state.eventName) return;
    let time = new Date(this.state.eventDate).getTime();
    let res = await fetch(config.API_BASE + '/api/countdowns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.eventName.trim(),
        expires: new Date(this.state.eventDate).getTime()
      })
    });
    let json = await res.json();
    if (!json.ok) throw 'Error creating countdown';
    window.location.href = `/${json.countdown.slug}`;
  }

  render() {
    return (
      <div className='new-countdown-container'>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='event-name-input' className='input-label'>It's almost </label>
            <input id='event-name' className='event-name-input' maxLength={100} value={this.state.eventName} onChange={this.handleNameChange} />
            <br />
            <label htmlFor='event-time-input' className='input-label'>at </label>
            <DateTimePicker 
              className='event-time-input' 
              value={this.state.eventDate} 
              onChange={this.handleDateChange} 
              minDate={this.minDate} 
              minDetail='year' 
              showLeadingZeros={true} 
              calendarIcon={null}
              calendarClassName='event-time-input-calendar'
            />
            <br />
            <input type='submit' className='submit-button' value='Create countdown' />
          </form>
        </div>
      </div>
    )
  }
}

export default NewCountdown;