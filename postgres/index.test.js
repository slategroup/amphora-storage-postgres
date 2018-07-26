'use strict';

const { setup } = require('./index'),
  client = require('./client'),
  { getComponents, getLayouts } = require('amphora-fs');

jest.mock('./client');
jest.mock('amphora-fs');

describe('postgres/index', () => {
  test('calls connect and then sets up the db', () => {
    client.connect.mockResolvedValue('');
    getComponents.mockReturnValue(['foo', 'bar', 'baz']);
    getLayouts.mockReturnValue(['baz', 'bar',  'foo']);

    return setup().then(resp => {
      expect(client.connect.mock.calls.length).toBe(1);
      expect(client.createSchema.mock.calls.length).toBe(3);
      expect(client.createSchema.mock.calls[0][0]).toBe('components');
      expect(client.createSchema.mock.calls[1][0]).toBe('layouts');
      expect(client.createSchema.mock.calls[2][0]).toBe('lists');
      expect(resp).toHaveProperty('server');
    });
  });
});
