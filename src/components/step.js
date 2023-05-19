function StepCard({ start, load, step, logs }) {
  const stepDescription = {
    0: "Not Started",
    1: "Every generals is starting",
    2: "Supreme General send message to other Generals",
    3: "Generals get message from Supreme General",
    4: "Generals send Supreme General's message to other generals",
    5: "Generals get message from other generals",
    6: "Every general conclude action",
    7: "Generals give action to city",
    8: "Conclude result (Done)",
  }

  const renderGeneralAction = () => {
    const actionsList = [];

    return actionsList;
  };

  return (
    <div id="steps-card" className="p-5 shadow content-card mb-4">
      <div className="mx-auto w-100 title">
        <h4 className="mb-4">Steps</h4>
        {!start && !load ? (
          <p>Simulator is not started.</p>
        ) : ("")}
        {load ? (
          <div class="loader"></div>
        ) : ("")}
        {start && !load ? (
          <>
            <p className="step mb-2"><strong>Step {step}</strong></p>
            <p className="step-desc mb-2">{stepDescription[step]}</p>
            <ul>{renderGeneralAction()}</ul>
          </>
        ) : ("")}
      </div>
    </div>
  );
}

export default StepCard;
