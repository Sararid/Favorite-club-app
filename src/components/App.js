import "../styles/App.scss";
import { useState } from "react";
import dataEle from "../data/data.json";

function App() {
  const [week, setWeek] = useState("");
  const [newClubName, setNewClubName] = useState("");
  const [data, setData] = useState(dataEle);
  const [weekday, setWeekday] = useState(false);
  const [weekend, setWeekend] = useState(false);

  const handleWeekFilter = (ev) => {
    console.log(ev.target.value);
    const valueSelect = ev.target.value;
    setWeek(valueSelect);

  };

  const handleNewClubName = (ev) => {
    const valueSelect = ev.currentTarget.value;
    setNewClubName(valueSelect);
  };

  const handleWeekSelection = (ev) => {
    console.log(ev.target.id);
    if (ev.target.id === "weekday") {
      setWeekday(ev.target.checked);
    } else {
      setWeekend(ev.target.checked);
    }
  };


  const renderClubs = () => {
    return data
      .filter(club => {
        if (week === 'weekDays') {
          return club.openOnWeekdays

        } else if (week === 'weekEnds') {
          return club.openOnWeekend
        } else {
          return club.openOnWeekend || club.openOnWeekdays || !club.openOnWeekend || !club.openOnWeekdays

        }
      })
      .map((club, index) => {
        return (
          <li key={index} id={club.index} className="listClubs__items--club">
            <p>#{index} {club.name} </p>
            <button onClick={handleRemoveBtn} >  <i className="far fa-times-circle" ></i></button>
            <p>Open on weekdays: {club.openOnWeekdays ? "sí" : "no"}</p>
            <p>Open on weekends: {club.openOnWeekend ? "sí" : "no"}</p>
          </li>
        );
      });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const newClub = {
      name: newClubName,
      openOnWeekdays: weekday,
      openOnWeekend: weekend,
    };

    setData([...data, newClub]);
    setNewClubName('');
    setWeekday(false);
    setWeekend(false);
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleRemoveBtn = (ev) => {
    ev.preventDefault();
    const id = ev.currentTarget.id
    data.splice(id, 1);
    setData([...data]);
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">My favorite club</h1>
        <form onSubmit={handleOnSubmit}>
          <label className="header__input">
            Show: </label>
          <select name="option" id="option" value={week} onChange={handleWeekFilter} className="header__input--select">
            <option value="all">All</option>
            <option value="weekDays">Open on weekdays</option>
            <option value="weekEnds">Open on weekends</option>
          </select>

        </form>
      </header>

      <section className="listClubs">
        <ul className="listClubs__items"> {renderClubs()} </ul>
      </section>

      <section className="addNewClub">
        <h2>Add a new club</h2>
        <form className="addNewClub__form">
          <label>
            Write the club's name here:</label>
          <input className="addNewClub__form--input"
            type="text"
            name="newClubName"
            id="newClubName"
            value={newClubName}
            onChange={handleNewClubName}
          />


          <label className="addNewClub__formDetail"> </label>
          Is it open on weekdays?
          <input className="addNewClub__form--input"
            type="checkbox"
            name="weekDay"
            id="weekday"
            checked={weekday}
            onChange={handleWeekSelection}
          />

          <label>
            Is it open on weekends? </label>
          <input className="addNewClub__form--input"
            type="checkbox"
            name="weeKend"
            id="weekend"
            checked={weekend}
            onChange={handleWeekSelection}
          />


          <input className="addNewClub__form--submit" type="submit" value="Add new club" onClick={handleClick} />
        </form>
      </section>

    </div>
  );
}

export default App;
