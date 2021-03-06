export const CreateTeam = async (
  _,
  { teamName, owner_id },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO teams (name, owner_id)
    VALUES (?, ?);`,
    [teamName, owner_id],
  );
  const dbResponse2 = await dbConnection.query(
    `INSERT INTO in_team (user_id, team_id)
    VALUES (?, ?);`,
    [owner_id, dbResponse.insertId],
  );
  const teamObject = {
    team_id: dbResponse.insertId,
    name: teamName,
    owner_id: owner_id,
  };
  return teamObject;
};

export const LeaveTeam = async (_, { team_id, user_id }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `DELETE FROM in_team WHERE team_id = ? AND user_id = ?`,
    [team_id, user_id],
  );

  return dbResponse.warningStatus === 0;
};

export const AddUserToTeam = async (
  _,
  { team_id, email },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    `SELECT user_id FROM users WHERE email = ?`,
    [email],
  );
  if (dbResponse !== null) {
    const dbResponse2 = await dbConnection.query(
      `INSERT INTO in_team (user_id, team_id)
    VALUES (?, ?);`,
      [dbResponse[0].user_id, team_id],
    );

    return dbResponse ? true : false;
  }

  return false;
};

export const PlantTree = async (
  _,
  { team_id, user_id, display_name, row, col },
  { dbConnection },
) => {
  const hasTree = await dbConnection.query(
    `SELECT * FROM garden WHERE team_id = ? AND row = ? AND col = ?`,
    [team_id, row, col],
  );

  if (hasTree[0]) {
    throw new Error('Position already has tree!');
  } else {
    const PlantTree = await dbConnection.query(
      `INSERT INTO garden (team_id, user_id, display_name, row, col) VALUES (?, ?, ?, ?, ?)`,
      [team_id, user_id, display_name, row, col],
    );
    return PlantTree.warningStatus === 0;
  }
};

export const SetNewTeamOwner = async (
  _,
  { team_id, new_owner_user_id },
  { dbConnection },
) => {
  const SetNewTeamOwner = await dbConnection.query(
    `UPDATE teams SET owner_id = ? WHERE teams.team_id = ?`,
    [new_owner_user_id, team_id],
  );

  return SetNewTeamOwner.warningStatus === 0;
};
