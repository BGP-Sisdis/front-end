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
    <div className="p-5 shadow content-card mb-4 w-100 w-md-50 w-xl-100">
      <div className="mx-auto w-100">
        <h4 className="mb-4">Result</h4>
        {!start && !load ? <p>Simulator is not started.</p> : ""}
        {load ? <div class="loader"></div> : ""}
        {start && !load ? (
          <>
            {step > 6 ? (
              <>
                <ul>{renderGeneralAction()}</ul>
                <p>Number of Loyal General: {numberLoyalGeneral}</p>
                {step > 7 ? (
                  <div id="consensus" className={consensus === "ATTACK" || consensus === "RETREAT" ? "bg-success": "bg-danger"}>
                    <p>
                      <strong>General Consensus:</strong>
                    </p>
                    <p>
                      <strong>{consensus}</strong>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <p>Waiting generals' action</p>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ResultCard;
