import test from 'node:test';
import assert from 'node:assert/strict';
import { parseVoiceInput } from './voiceParser';

test('parseVoiceInput parses single item with quantity', () => {
  const result = parseVoiceInput('2 eggs', 8);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].name, 'Large Egg(s)');
  assert.equal(result.items[0].quantity, 2);
  assert.equal(result.items[0].calories, 140);
  assert.equal(result.items[0].protein, 12);
});

test('parseVoiceInput parses multi-item breakfast clause with conjunctions', () => {
  const result = parseVoiceInput('2 eggs and a slice of sourdough toast', 8);
  assert.equal(result.items.length, 2);
  assert.equal(result.suggestedCategory, 'breakfast');
  assert.equal(result.items[0].name, 'Large Egg(s)');
  assert.equal(result.items[1].name, 'Artisan Toast Slice');
  assert.equal(result.totalCalories, 250); // 140 + 110
  assert.equal(result.totalProtein, 16);   // 12 + 4
});

test('parseVoiceInput determines lunch category during midday', () => {
  const result = parseVoiceInput('grilled chicken breast with brown rice', 13);
  assert.equal(result.suggestedCategory, 'lunch');
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].name, 'Grilled Chicken Breast');
  assert.equal(result.items[1].name, 'Cooked Brown Rice');
  assert.equal(result.totalProtein > 50, true);
});

test('parseVoiceInput gracefully handles empty transcript', () => {
  const result = parseVoiceInput('', 8);
  assert.equal(result.items.length, 0);
  assert.equal(result.totalCalories, 0);
});

test('parseVoiceInput handles fallback for unknown foods', () => {
  const result = parseVoiceInput('quiche lorraine', 12);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].name, 'Quiche lorraine');
  assert.equal(result.items[0].calories > 0, true);
});
