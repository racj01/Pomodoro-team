export const pomodoro = async (_, { shareId }, { dbConnection }) => {
  const pomodoro = (
    await dbConnection.query(`SELECT * FROM pomodoros WHERE share_id = ?`, [
      shareId,
    ])
  )[0];

  if (!pomodoro) {
    console.log('null');
    return null;
  }

  const currentTime = (
    await dbConnection.query(`SELECT CURRENT_TIMESTAMP()`, [])
  )[0];

  let secondsSinceStart = 0;
  let positionInCycle = pomodoro.position_in_cycle;

  if (pomodoro.running === 0) {
    secondsSinceStart = 0;
  } else {
    secondsSinceStart =
      currentTime['CURRENT_TIMESTAMP()'] / 1000 - pomodoro.last_updated / 1000;
  }

  return { position: positionInCycle, secondsSinceStart: secondsSinceStart };
};
