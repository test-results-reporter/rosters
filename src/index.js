const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * get on call person
 * @param {import('./index').Schedule} schedule 
 */
function getOnCallPerson(schedule) {
  const layer = getLayer(schedule.layers);
  return getUser(layer);
}

/**
 * @param {import('./index').Layer[]} layers 
 */
function getLayer(layers) {
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i];
    if (!layer.start && !layer.end) {
      return layer;
    }
    const current_time = new Date().toLocaleTimeString('en-US', { hour12: false });
    if (!layer.start && current_time < layer.end) {
      return layer;
    }
    if (!layer.end && current_time > layer.start) {
      return layer;
    }
    if (current_time < layer.end && current_time > layer.start) {
      return layer;
    }
  }
}

/**
 * @param {import('./index').Layer} layer
 */
function getUser(layer) {
  if (layer.user) {
    return layer.user;
  }
  const rotation = layer.rotation;
  const today = new Date();
  const day_of_year = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / MILLISECONDS_PER_DAY);
  const week_of_year = Math.ceil(day_of_year / 7);
  switch (rotation.every) {
    case 'day':
      return rotation.users[day_of_year % rotation.users.length];
    default:
      return rotation.users[week_of_year % rotation.users.length];
  }
}

module.exports = {
  getOnCallPerson
}