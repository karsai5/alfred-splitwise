import { getGroupsInAlfredFormat } from './alfredHelper';
import { getGroups } from './splitwiseHelper';
jest.mock('./splitwiseHelper.js')

describe('showgroups', () => {
  it('should correctly map groups', async () => {
    getGroups.mockImplementation(() => Promise.resolve([
      {
        id: 0,
        name: 'Non-group expenses',
        created_at: '2017-03-26T07:59:44Z',
        updated_at: '2022-11-13T21:27:58Z',
        simplify_by_default: false,
        members: [],
        custom_avatar: false,
      },
      {
        id: 17568052,
        name: 'Laurieton Groceries',
        created_at: '2020-01-04T06:43:42Z',
        updated_at: '2020-01-14T06:55:42Z',
        members: [{
          id: 30660667,
          first_name: 'James',
          last_name: null,
          custom_picture: true,
          email: 'james@gmail.com',
          registration_status: 'confirmed',
        },
        {
          id: 35414673,
          first_name: 'Till',
          last_name: 'Denis',
          custom_picture: true,
          email: 'TillDenis@gmail.com',
          registration_status: 'confirmed',
        }],
        simplify_by_default: true,
        whiteboard: null,
        group_type: 'trip',
        group_reminders: null,
        custom_avatar: true,
      },

    ]));

    expect(await getGroupsInAlfredFormat()).toStrictEqual([
      { "action": "test", "icon": { "path": "./group-icons/17568052.png" }, "subtitle": "James, Till Denis", "title": "Laurieton Groceries", "uid": 17568052, "valid": true }]);
  });
})
