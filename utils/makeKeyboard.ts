const { Markup } = require('telegraf');

const makeKeyboard = (keys: any[], rowLength: number, prefix: string) => {
  const keyboard = keys.reduce((acc, curr, index) => {
    const row = Math.floor(index / rowLength);
    if (!acc[row]) keys[row] = [];
    keys[row].push(Markup.button.callback(curr, `${prefix}_${curr}`));
    return acc;
  }, []);
  return keyboard;
};

module.exports = { makeKeyboard };
