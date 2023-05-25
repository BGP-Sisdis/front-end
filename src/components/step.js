function StepCard({ start, load, step, logs }) {
  const stepDescription = {
    0: "Not Started",
    1: "Every generals is starting",
    2: "Supreme General send message to other Generals",
    3: "Generals receive message from Supreme General",
    4: "Generals send Supreme General's message to other generals",
    5: "Generals receive message from other generals",
    6: "Every general conclude action",
    7: "Generals take action against the city",
    8: "Conclude result (Done)",
  }

  return (
    <div id="steps-card" className="p-5 shadow content-card mb-4 me-0 me-md-4 me-xl-0 w-100 w-md-50 w-xl-100">
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
            <div className="d-flex flex-row align-items-start">
              <div id="step" className="mx-auto mb-0">
                <p className="text-center">Step</p>
                <p id="step-number" className="text-center">{step}</p>
              </div>
              <div id="step-desc" className="mx-auto">
                <p className="text-left">{stepDescription[step]}</p>
              </div>

            </div>
          </>
        ) : ("")}
      </div>
    </div>
  );
}

export default StepCard;
