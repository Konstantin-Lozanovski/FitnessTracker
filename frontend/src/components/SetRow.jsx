const SetRow = ({ set, eIdx, sIdx, handleSetChange, handleDeleteSet }) => {
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
      <div className="dropdown align-self-end">
        <span className="dots-menu" data-bs-toggle="dropdown">
          &#8942;
        </span>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li>
            <button className="dropdown-item text-danger" onClick={() => handleDeleteSet(eIdx, sIdx)}>
              Delete Set
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SetRow;
