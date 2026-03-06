const SetRow = ({ set, eIdx, sIdx, handleSetChange }) => {
  return (
    <div className="set-row mt-3">
      <div className="input-group-custom">
        <label>Weight (kg)</label>
        <input
          type="number"
          className="form-control"
          value={set.weight || ""}
          onChange={(e) => handleSetChange(eIdx, sIdx, "weight", Number(e.target.value))}
        />
      </div>

      <div className="input-group-custom">
        <label>Reps</label>
        <input
          type="number"
          className="form-control"
          value={set.reps || ""}
          onChange={(e) => handleSetChange(eIdx, sIdx, "reps", Number(e.target.value))}
        />
      </div>

      <div className="input-group-custom">
        <label>Notes</label>
        <input type="text" className="form-control" value={set.notes} onChange={(e) => handleSetChange(eIdx, sIdx, "notes", e.target.value)} />
      </div>
    </div>
  );
};

export default SetRow;
