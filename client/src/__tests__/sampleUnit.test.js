// Sample utility function
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

test('getInitials returns correct initials', () => {
  expect(getInitials('Sarah Johnson')).toBe('SJ');
  expect(getInitials('Michael Rodriguez')).toBe('MR');
  expect(getInitials('Emma Parker')).toBe('EP');
}); 