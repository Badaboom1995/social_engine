import { supabase } from '../supabase';
import { RequestType } from '../model';
const dayjs = require('dayjs');
const { getRequests } = require('./getRequests');

// IMPORTANT: use on Monday, after 00:00 UTC. Before weekly matchingnode
// Will move from 2 weeks ago to 1 week ago
const moveRequests = async (requests: RequestType[]) => {
  const updatedRequests = requests.map((request) => {
    return {
      telegram: request.telegram,
      location: request.location,
      format: request.format,
      profit_level: request.profit_level,
      created_at: dayjs().subtract('2', 'day').format(),
    };
  });

  const { data, error } = await supabase
    .from('Requests')
    .insert(updatedRequests)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  console.log(updatedRequests.length);
  return data;
};

const moveRequestsToNextWeek = async (): Promise<RequestType[]> => {
  const requests = await getRequests(true);
  const movedRequests = await moveRequests(requests);
  return movedRequests;
};

moveRequestsToNextWeek();

module.exports = { moveRequestsToNextWeek };
