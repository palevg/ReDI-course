import { miniApps } from "../data";

export default function TaskSide({ appNumber, imageClass, }) {
  return (
    <div className="task-side">
      <h3 className="task-side__header">{miniApps[appNumber].name}</h3>
      <p><i>Description:</i> {miniApps[appNumber].description}</p>
      <p><i>Requirements:</i></p>
      <ul>
        {miniApps[appNumber].requirements.map(item => <li key={item}>{item}</li>)}
      </ul>
      {"tips" in miniApps[appNumber] && <div>
        <p><i>Tips:</i></p>
        <ul>
          {miniApps[appNumber].tips.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>}
      <img className={imageClass} src={miniApps[appNumber].image} alt={miniApps[appNumber].name} />
      {appNumber === 0 && <a href="https://codesandbox.io/s/portfolio-skills-list-unnwl" target="_blank" rel="noopener noreferrer">Original task link</a>}
    </div>
  )
}