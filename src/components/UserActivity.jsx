import { useState } from "react";
import { activityTypes } from "../data";
import UserActivities from "../UserActivities.json";
import "../styles/activity.css";

const userInfo = UserActivities.data.sort((a,b) => a.date > b.date ? -1 : 1);

function ActivityType(props) {

  function handleButtonClick(e) {
    if (props.isActive) {
      const element = document.querySelector('.activity-type__filter');
      if (element !== null) element.classList.remove('activity-type__filter');
      if (props.filteredType === null || props.filteredType !== props.activity.type) {
        props.setFilteredType(props.activity.type);
        e.target.classList.add('activity-type__filter');
      }
      else {
        props.setFilteredType(null);
      }
    }
  }

  return <div onClick={(e) => handleButtonClick(e)}
    className={props.isActive ? "activity-type__enabled" : "activity-type__disabled"}>
    {props.activity.name}
  </div>
}

function FilterBar({ userInfo, filteredType, setFilteredType }) {
  return <div className="filter-bar">
    <div>Filter</div>
    <div className="filter-bar__activities">
      {activityTypes.map(activity =>
        <ActivityType
          key={activity.type}
          activity={activity}
          filteredType={filteredType}
          setFilteredType={setFilteredType}
          isActive={userInfo.filter(row => row.type === activity.type).length > 0}
        />
      )}
    </div>
  </div>
}

function ActivityList({ filteredInfo }) {
  const timeFlags = { futures: false, week: false, past: false };
  const weekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7));

  function CheckActivityDate({ row }) {
    let activitiesPeriod = "";
    if (new Date(row.date) > new Date()) {
      if (!timeFlags.futures) {
        timeFlags.futures = true;
        activitiesPeriod = "Next appointments"
      }
    } else {
      if (new Date(row.date) > weekAgoDate) {
        if (!timeFlags.week) {
          timeFlags.week = true;
          activitiesPeriod = "Last week";
        }
      } else {
        if (!timeFlags.past) {
          timeFlags.past = true;
          activitiesPeriod = "More than week ago";
        }
      }
    }
    return activitiesPeriod !== "" && <div className="activities-period">{activitiesPeriod}</div>
  }

  return <>
    {filteredInfo.map(row =>
      <div key={row.id}>
        <CheckActivityDate row={row} />
        <ActivityItem row={row} />
      </div>
    )}
  </>
}

function ActivityItem({ row }) {
  return <>
    <label htmlFor={row.id}>
      <div className="activity-item">
        <div className="activity-item__label">
          {new Date(row.date) > new Date() ? "-" : "✓"}
        </div>
        <div className="activity-item__date">{new Date(row.date).toLocaleDateString("uk-UA")}</div>
        <div className="activity-item__type">{activityTypes.filter(activity => activity.type === row.type)[0].one}</div>
        <div className="activity-item__title">{row.title}</div>
        {new Date(row.date) > new Date()
          ? <img src="ma3_bin.svg" alt="Delete" />
          : <img src="ma3_thumb.svg" alt="Ok" />}
      </div>
    </label>
    <input type="checkbox" className="show-more" id={row.id} />
    <div className="more-info">
      <SummaryBlock header="Summary">
        <div className="more-info__text">{row.summary}</div>
      </SummaryBlock>
      <SummaryBlock header="Helpful in last session">
        <div className="more-info__text">{row.detail1}</div>
        <div className="more-info__text">{row.detail2}</div>
      </SummaryBlock>
    </div>
  </>
}

function SummaryBlock({ children, header }) {
  return <div className="more-info__block">
    <div className="more-info__header">{header}</div>
    {children}
  </div>
}

export default function UserActivity() {
  // const [userInfo, setUserInfo] = useState([]);
  const [filteredType, setFilteredType] = useState(null);
  const filteredInfo = filteredType === null ? userInfo : userInfo.filter(item => item.type === filteredType);

  // const getUserInfo = async () => {
  //   try {
  //     const res = await fetch("http://ec2-3-67-177-63.eu-central-1.compute.amazonaws.com:8055/items/userActivities");
  //     const data = await res.json();
  //     return setUserInfo(data.data.sort((a, b) => a.date > b.date ? -1 : 1));
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return <div className="activity-app">
    <FilterBar userInfo={userInfo} filteredType={filteredType} setFilteredType={setFilteredType} />
    <ActivityList filteredInfo={filteredInfo} />
  </div>
};