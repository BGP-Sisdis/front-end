function ResultCard({
  start,
  load,
  step,
  consensus,
  actions,
  numberLoyalGeneral,
}) {
  const renderGeneralAction = () => {
    const actionsList = [];

    for (let key in actions) {
      actionsList.push(<li key={`action-${key}`}>{actions[key]}</li>);
    }

    return actionsList;
  };

  return (
    <div className="p-5 shadow content-card mb-4">
      <div className="mx-auto w-100">
        <h4 className="mb-4">Result</h4>
        {!start && !load ? (
          <p>Simulator is not started.</p>
        ) : ("")}
        {load ? (
          <div class="loader"></div>
        ) : ("")}
        {start && !load ? (
          <>
            {step > 6 ? (
              <>
                <ul>{renderGeneralAction()}</ul>
                <p>Number of Loyal General: {numberLoyalGeneral}</p>
                {step > 7 ? <p><strong>General Consensus: {consensus}</strong></p> : ""}
              </>
            ) : (
              <p>Waiting generals' action</p>
            )}
          </>
        ) : ("")}
      </div>
    </div>
  );
}

export default ResultCard;
