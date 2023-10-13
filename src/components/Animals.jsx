const Animals = ({ list }) => {

  return (
    <div className="animals-list">
      {list.map((animal, index) =>
        <div className="animal-info" key={index}>
          <figure>
            <img src={animal.img} alt={animal.name} />
          </figure>
          <div>
            <h2>{animal.name}</h2>
            <p className="animal-info__descr">{animal.description}</p>
            <div className="animal-info__location">
              <div>
                &#128062;<span>{animal.latinName}</span>
              </div>
              <div>
                &#127758;<span>{animal.region}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Animals;