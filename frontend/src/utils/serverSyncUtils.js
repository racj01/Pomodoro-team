import { v4 as uuidv4 } from 'uuid';
import { gql } from '@apollo/client';

export const POMODORO_QUERY = gql`
  query Pomodoro($shareId: String!) {
    pomodoro(shareId: $shareId) {
      position
      secondsSinceStart
      state
    }
  }
`;

export const UPDATE_POMODORO_MUTATION = gql`
  mutation UpdatePomodoro(
    $position: Int!
    $communicationId: String!
    $shareId: String!
    $state: State!
  ) {
    updatePomodoro(
      position: $position
      communicationId: $communicationId
      shareId: $shareId
      state: $state
    )
  }
`;

export const GET_USER_POMODORO_IDS = gql`
  query UserPomodoroIDs($user_id: Int!) {
    userPomodoroIds(user_id: $user_id) {
      share_id
      communication_id
    }
  }
`;

export const SAVE_POMODORO_DURATION = gql`
  mutation savePomodoroDuration($user_id: Int!, $duration: Int!) {
    savePomodoroDuration(user_id: $user_id, duration: $duration)
  }
`;

export const POMODORO_STATISTICS = gql`
  query pomodoroStatistics($user_id: Int!) {
    pomodoroStatistics(user_id: $user_id) {
      finished_at
      duration
      tasks {
        task_id
        task_description
      }
    }
  }
`;

export const GET_TEAM_MEMBERS_POMODORO = gql`
  query teamMembersPomodoro($team_id: Int!) {
    teamMembersPomodoro(team_id: $team_id) {
      share_id
      email
      display_name
      name
      user_id
    }
  }
`;

export const USER_TEAMS = gql`
  query userTeams($user_id: Int!) {
    userTeams(user_id: $user_id) {
      name
      team_id
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      user {
        user_id
        email
        display_name
      }
      token
    }
  }
`;

export const GET_LEADER = gql`
  query GetLeader($team_id: Int!) {
    team(team_id: $team_id) {
      owner_id
    }
  }
`;

export const SAVE_TASK = gql`
  mutation saveTask($user_id: Int!, $task_description: String!) {
    saveTask(user_id: $user_id, task_description: $task_description)
  }
`;

export const ADD_USER = gql`
  mutation AddUserToTeam($team_id: Int!, $email: String!) {
    AddUserToTeam(team_id: $team_id, email: $email)
  }
`;

export const GET_CURRENT_TASK = gql`
  query getCurrentTask($user_id: Int!) {
    getCurrentTask(user_id: $user_id) {
      task_id
      user_id
      pomodoro_statistic_id
      task_description
    }
  }
`;

export const timerStates = {
  idle: 'IDLE',
  running: 'RUNNING',
  paused: 'PAUSED',
  offline: 'OFFLINE',
};

export const timerComponents = {
  pomodoro: 1,
  shortBreak: 2,
  longBreak: 3,
};

const getUdid = () => {
  return uuidv4();
};

export const saveIdsToLocalStorage = (communicationId, shareId) => {
  localStorage.setItem('communicationId', communicationId);
  localStorage.setItem('shareId', shareId);
};

export const initServerCommunication = (
  serverCommunicationId,
  serverShareId,
) => {
  if (serverCommunicationId && serverShareId) {
    saveIdsToLocalStorage(serverCommunicationId, serverShareId);
    return { communicationId: serverCommunicationId, shareId: serverShareId };
  } else {
    let communicationId;
    let shareId;
    if (
      localStorage.getItem('communicationId') === null ||
      localStorage.getItem('shareId') === null
    ) {
      communicationId = getUdid();
      shareId = getUdid();
      saveIdsToLocalStorage(communicationId, shareId);
      return { communicationId, shareId };
    } else {
      communicationId = localStorage.getItem('communicationId');
      shareId = localStorage.getItem('shareId');
      return { communicationId, shareId };
    }
  }
};

export const calcDuration = ({ remainingSeconds, pomodoroDuration }) => {
  const DURATION_LIMIT = -1200;
  const MAX_DURATION = 2700;
  if (remainingSeconds <= DURATION_LIMIT) {
    return MAX_DURATION;
  }
  return pomodoroDuration - remainingSeconds;
};