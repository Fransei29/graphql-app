const { sequelize, Author, Post } = require('../models/models');

const populate = async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza los modelos y recrea las tablas
    console.log('Database synchronized!');

    // Inserta los datos
    const socra = await Author.create({ name: 'Sócrates', age: 36, imageFileName: 'socra' });
    const platon = await Author.create({ name: 'Platón', age: 76, imageFileName: 'pla' });
    const aristo = await Author.create({ name: 'Aristoteles', age: 57, imageFileName: 'aris.jpg' });
    const buda = await Author.create({ name: 'Buddha', age: 65, imageFileName: 'buda' });
    const lao = await Author.create({ name: 'Lao-Tzu', age: 88, imageFileName: 'lao' });
    const fredi = await Author.create({ name: 'Friedrich Nietzsche', age: 44, imageFileName: 'fru' });

    await Post.create({ title: 'The Wisdom of Ignorance', description: "True wisdom lies in recognizing one's own ignorance. There is no greater evil for a man than to consider that he knows what he does not know and to act based on that false belief."
, authorId: socra.id });
    await Post.create({ title: 'The Value of Illumination', description: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light. Education should aim to liberate the mind, not impose restrictions upon it."
, authorId: platon.id });
    await Post.create({ title: 'Happiness in Virtue', description: "Happiness depends upon ourselves. It is a state of activity of the soul in accordance with virtue. It is not measured by the accumulation of material goods, but by the cultivation of virtue and excellence in our actions", authorId: aristo.id });
    await Post.create({ title: 'The Path to Inner Peace', description: "Peace comes from within. Do not seek it without. When the mind is pure, joy follows like a shadow that never leaves. The true path to enlightenment is through the constant practice of kindness and meditation", authorId: buda.id });
    await Post.create({ title: 'The Journey of a Thousand Miles', description: "The journey of a thousand miles begins with a single step. Nature does not hurry, yet everything is accomplished. In life, we must learn to flow like water, adapting to circumstances without losing our essence.", authorId: lao.id });
    await Post.create({ title: 'The Strength in Adversity', description: "That which does not kill us makes us stronger. Man must surpass his own limits and challenges to reach his true potential. Struggle and adversity are the forges where character and greatness are tempered.", authorId: fredi.id });

    console.log('Database populated!');
  } catch (err) {
    console.error('Error populating database:', err);
  }
};

populate();
