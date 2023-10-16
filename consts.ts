export const mockTelegramData = {
  query_id: '1234567890abcdef',
  user: {
    id: 101010,
    first_name: 'John',
    last_name: 'Doe',
    username: '@badavoo',
    language_code: 'en',
  },
  receiver: {
    id: 202020,
    first_name: 'Jane',
    last_name: 'Smith',
    username: '@badavoo',
    language_code: 'en',
  },
  chat: {
    id: 208165379,
    title: 'Sample Group',
    type: 'supergroup',
    members_count: 100,
  },
  chat_type: 'group',
  chat_instance: 'abcdef1234567890',
  start_param: 'sample_start_param',
  can_send_after: 30,
  auth_date: 1673616000, // This is just a sample UNIX timestamp.
  hash: 'f0e2b49f9f1d104ada8f5f960ecdf29b', // A fictitious hash value.
}
