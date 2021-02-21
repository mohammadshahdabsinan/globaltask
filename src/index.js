import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './calendar.css';
import moment from 'moment';
import reactDom from 'react-dom';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false
    };
    

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

    this.initialiseEvents();
  }

  previous() {
    const currentMonthView = this.state.selectedMonth;

    this.setState({
      selectedMonth: currentMonthView.subtract(1, "month")
    });
  }

  next() {
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.add(1, "month")
    });
  }

  select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  }

  goToCurrentMonthView(){
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: moment()
    });
  }
  
  showCalendar() {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }

  renderMonthLabel() {
    const currentMonthView = this.state.selectedMonth;
    return (
      <td className="month-label">
        {currentMonthView.format("MMMM YYYY")}
      </td>
    );
  }

  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <h1 className="date-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </h1>
    );
  }
  
 renderTodayLabel() {
   const currentSelectedDay = this.state.selectedDay;
  return (
     <td className="today-label" onClick={this.goToCurrentMonthView}>
        Today
     </td>
  );
  }
  
  renderWeeks() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const monthEvents = this.state.selectedMonthEvents;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Monday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => this.select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return (
      
      <div className="frame">
      <table className="dates-table">
      <tbody className="tbody">
        {weeks}
      </tbody>
      </table>
      </div>
    );
  }

  handleAdd() {
    const monthEvents = this.state.selectedMonthEvents;
    const currentSelectedDate = this.state.selectedDay;

    let newEvents = [];

    var eventTitle = prompt("Please enter a name for your event: ");

    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: currentSelectedDate,
          dynamic: true
        };

        newEvents.push(newEvent);

        for (var i = 0; i < newEvents.length; i++) {
          monthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  }

  addEvent() {
    const currentSelectedDate = this.state.selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");

    if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (window.confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {
      }
    } 
  }

  removeEvent(i) {
    const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if (window.confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

  initialiseEvents() {
    const monthEvents = this.state.selectedMonthEvents;

    let allEvents = [];

    var event1 = {
      title:"Now",
      date: moment(),
      dynamic: false
    };

    var event2 = {
      title: " Meeting",
      date: moment().startOf("day").subtract(2, "d").add(2, "h"),
      dynamic: false
    };

    var event3 = {
      title: " Cinema",
      date: moment().startOf("day").subtract(7, "d").add(18, "h"),
      dynamic: false
    };

    var event4 = {
      title: " Theater",
      date: moment().startOf("day").subtract(16, "d").add(20, "h"),
      dynamic: false
    };

    var event5 = {
      title: " Drinks",
      date: moment().startOf("day").subtract(2, "d").add(12, "h"),
      dynamic: false
    };

    var event6 = {
      title: " Diving",
      date: moment().startOf("day").subtract(2, "d").add(13, "h"),
      dynamic: false
    };

    var event7 = {
      title: " Tennis",
      date: moment().startOf("day").subtract(2, "d").add(14, "h"),
      dynamic: false
    };

    var event8 = {
      title: " Swimmming",
      date: moment().startOf("day").subtract(2, "d").add(17, "h"),
      dynamic: false
    };

    var event9 = {
      title: " Chilling",
      date: moment().startOf("day").subtract(2, "d").add(16, "h"),
      dynamic: false
    };
    
        var event10 = {
      title:
        "Hello World",
      date: moment().startOf("day").add(5, "h"),
      dynamic: false
    };

    allEvents.push(event1);
    allEvents.push(event2);
    allEvents.push(event3);
    allEvents.push(event4);
    allEvents.push(event5);
    allEvents.push(event6);
    allEvents.push(event7);
    allEvents.push(event8);
    allEvents.push(event9);
    allEvents.push(event10);

    for (var i = 0; i < allEvents.length; i++) {
      monthEvents.push(allEvents[i]);
    }

    this.setState({
      selectedMonthEvents: monthEvents
    });
  }

  render() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;

   {
      return (
        <section className="calendar">
           <div className="col leftCol">
           <div class="content">
            <div className="year-header">
              {this.renderDayLabel()}
            </div>
         <button className="button" id="add-button"
                 onClick={this.addEvent}>Add-Event</button>
         <Events
            selectedMonth={this.state.selectedMonth}
            selectedDay={this.state.selectedDay}
            selectedMonthEvents={this.state.selectedMonthEvents}
            removeEvent={i => this.removeEvent(i)}
          />
       
       <h3 className="name">Press the button and enter a name for your event and you can delete by clicking the events!</h3>
         
       </div>
       </div>
          <div className="col rightCol">
           <div class="content">
            <div className="year-header">
              <span
                className="left-button" id="prev"
                onClick={this.previous}>&lang;</span>
              {this.renderMonthLabel()}
              <span className="right-button" id="next" onClick={this.next}>&rang;</span> 
            </div>
            </div>
            <hr></hr>
            <DayNames />
      
                {this.renderWeeks()}
        </div>
     </section>
      );
    }
  }
}

class Events extends React.Component {
  render() {
    const currentMonthView = this.props.selectedMonth;
    const currentSelectedDay = this.props.selectedDay;
    const monthEvents = this.props.selectedMonthEvents;
    const removeEvent = this.props.removeEvent;

    const monthEventsRendered = monthEvents.map((event, i) => {
      return (
      
        <div
          key={event.title}
          className="event-container"
          onClick={() => removeEvent(i)}
        >
          <ReactCSSTransitionGroup
            component="div"
            className="animated-time"
            transitionName="time"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className="event-time event-attribute">
              {event.date.format("HH:mm")}
            </div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            component="h1"
            className="event-container"
            transitionName="title"
            transitionAppear={true}
             transitionAppearTimeout={500}
             transitionEnterTimeout={500}
             transitionLeaveTimeout={500}
          >
            <div className="event-name">{event.title}</div>
          </ReactCSSTransitionGroup>
        </div>
  
      );
    });

    const dayEventsRendered = [];

    for (var i = 0; i < monthEventsRendered.length; i++) {
      if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }

    return (
    <div className="col leftCol">
      <div className="day-events">
        {dayEventsRendered}
      </div>
    </div>
    );
  }
}
class DayNames extends React.Component {
  render() {
    return (
      <table className=" days-table">
        <td className=" day">Mon</td>
        <td className=" day">Tue</td>
        <td className=" day">Wed</td>
        <td className=" day">Thu</td>
        <td className=" day">Fri</td>
        <td className=" day">Sat</td>
        <td className="day">Sun</td>
      </table>

    );
  }
}
class MonthNames extends React.Component {
  render() {
    return (

      <tbody>
       <tr>
        <td className=" month">Jan</td>
        <td className=" month">Feb</td>
        <td className=" month">Mar</td>
        <td className=" month">Apr</td>
        <td className=" month">May</td>
        <td className=" month">Jun</td>
        <td className="month">Jul</td>
        <td className=" month">Aug</td>
        <td className=" month">Sep</td>
        <td className=" month">Oct</td>
        <td className=" month">Nov</td>
        <td className="month">Dec</td>
       </tr>
       </tbody>
      
    );
  }
}

class Week extends React.Component {
  render() {
    let days = [];
    let date = this.props.previousCurrentNextView;
    let currentMonthView = this.props.currentMonthView;
    let selected = this.props.selected;
    let select = this.props.select;
    let monthEvents = this.props.monthEvents;

    for (var i = 0; i < 7; i++) {
      var dayHasEvents = false;

      for (var j = 0; j < monthEvents.length; j++) {
        if (monthEvents[j].date.isSame(date, "day")) {
          dayHasEvents = true;
        }
      }

      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents
      };

      days.push(<Day day={day} selected={selected} select={select} />);
      date = date.clone();
      date.add(1, "d");
    }
    return( 
      <tr className="table-row">
      {days} 
      </tr>
      );
  }
}

class Day extends React.Component {
  render() {
    let day = this.props.day;
    let selected = this.props.selected;
    let select = this.props.select;

    return (
     <td
       className={
          "table-date" +
          (day.isToday ? " today" : "") +
          (day.isCurrentMonth ? "" : " different-month") +
          (day.date.isSame(selected) ? " active-date" : "") +
          (day.hasEvents ? " event-date" : "")
        }
        onClick={() => select(day)}
      >     

         {day.number}
      </td>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("content"));
