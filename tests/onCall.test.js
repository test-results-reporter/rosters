const { test } = require('uvu');
const assert = require('uvu/assert');

const { getOnCallPerson } = require('../src')

test('getOnCallPerson - one user', () => {
  const user = getOnCallPerson({
    layers: [
      {
        user: {
          name: 'mom'
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test('getOnCallPerson - user from last layer', () => {
  const user = getOnCallPerson({
    layers: [
      {
        user: {
          name: 'mom'
        }
      },
      {
        user: {
          name: 'dad'
        }
      }
    ]
  });
  assert.equal(user, { name: 'dad' });
});

test('getOnCallPerson - layer with only start', () => {
  const user = getOnCallPerson({
    layers: [
      {
        start: '00:00:00',
        user: {
          name: 'mom'
        }
      },
      {
        start: '24:00:00',
        user: {
          name: 'dad'
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test('getOnCallPerson - layer with only end', () => {
  const user = getOnCallPerson({
    layers: [
      {
        end: '24:00:00',
        user: {
          name: 'mom'
        }
      },
      {
        start: '24:00:00',
        user: {
          name: 'dad'
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test('getOnCallPerson - layer with both start & end', () => {
  const user = getOnCallPerson({
    layers: [
      {
        start: '00:00:00',
        end: '24:00:00',
        user: {
          name: 'mom'
        }
      },
      {
        start: '24:00:00',
        user: {
          name: 'dad'
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test('getOnCallPerson - layer with default rotation', () => {
  const user = getOnCallPerson({
    layers: [
      {
        rotation: {
          users: [
            {
              name: 'mom'
            }
          ]
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test('getOnCallPerson - layer with day rotation', () => {
  const user = getOnCallPerson({
    layers: [
      {
        rotation: {
          every: 'day',
          users: [
            {
              name: 'mom'
            }
          ]
        }
      }
    ]
  });
  assert.equal(user, { name: 'mom' });
});

test.run();