const WorkoutsDetails = ({ workout }) => {
  if (!workout) return null;

  return (
    <div>
      <h4>{workout.title}</h4>
      <p>
        <strong> Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong> Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutsDetails;
