import * as val from '../app/utils/validate';

//checkbox test

test('required test', () => {
  expect(val.checkField('', {}, '', true)).toBe('This property is required.');
  expect(val.checkField('', {}, 'ciao', true)).toBeNull();
});

test('minLength test', () => {
  const obj = {},
    field = 'test',
    value = 'ciao',
    required = false;
  obj.minLength = 10;

  const out = val.checkField(field, obj, value, required);
  expect(out).toBe('Not a valid input minimum length.');
});

test('maxLength test', () => {
  const obj = {},
    field = 'test',
    value = 'ciao',
    required = false;
  obj.maxLength = 1;

  const out = val.checkField(field, obj, value, required);
  expect(out).toBe('Not a valid input maximum length.');
});

test('minLength && maxLength test', () => {
  const obj = {},
    field = 'test',
    value = 'ciao',
    required = false;
  obj.minLength = 1;
  obj.maxLength = 1;

  const out = val.checkField(field, obj, value, required);
  expect(out).toBe('Not a valid input maximum length.');
});

test('maxLength && minLength test', () => {
  const obj = {},
    field = 'test',
    value = 'ciao',
    required = false;
  obj.minLength = 10;
  obj.maxLength = 1;

  const out = val.checkField(field, obj, value, required);
  expect(out).toBe('Not a valid input minimum length.');
});

test('file ext test', () => {
  const obj = {},
    field = 'test',
    required = false,
    validExts = ['png', 'svg', 'svgz'],
    validExtsTest = ['png', 'svg', 'svgz'],
    notValidExtsTest = ['jpg', 'gif', 'bmp'];

  obj.fileExt = validExts;

  validExtsTest.forEach((ext) => {
    expect(val.checkField(field, obj, ext, required)).toBeNull();
  });

  notValidExtsTest.forEach((ext) => {
    expect(val.checkField(field, obj, ext, required))
      .toBe(`Not a valid extension, allowed only: ${obj.fileExt}`);
  });
});


test('URL test', () => {
  expect(val.checkField('', {
    widget: 'url'
  }, 'hppp://google.it', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'http://google', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'httpz://google.it', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'http:/google.it', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'https:///google.it', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'http//google.it', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'http:/googleit', true))
    .toBe('Not a valid Url');

  expect(val.checkField('', {
    widget: 'url'
  }, 'https://google.it', true))
    .toBeNull();
});
