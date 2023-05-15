function ResultBGP({ title, start, load, consensus, actions, numberLoyalGeneral }) {
  const renderGeneralAction = () => {
    const actionsList = [];

    for (let key in actions) {
      actionsList.push(
        <li key={`action-${key}`}>{actions[key]}</li>
      );
    }

    return actionsList;
  };

  return (
    <div className="mx-auto w-100">
        <h4>{title}</h4>
        {start && !load ? (
          <>
            <ul>
              {renderGeneralAction()}
            </ul>
            <p>
              Number of Loyal General: {numberLoyalGeneral}
            </p>
            <p>
              General Consensus: {consensus}
            </p>
          </>
        ) : (
          <p>No Result</p>
        )}
    </div>
  );
}

export default ResultBGP;
