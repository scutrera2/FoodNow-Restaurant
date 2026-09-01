const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUri);

const Pilot = require('./models/pilot');

Pilot.find({}, 'email firstName lastName country stripeAccountId created')
  .then(pilots => {
    console.log(`\n${pilots.length} pilot(s) found:\n`);
    pilots.forEach(p => {
      console.log(`  ${p.firstName} ${p.lastName} <${p.email}>`);
      console.log(`    country:  ${p.country}`);
      console.log(`    stripeId: ${p.stripeAccountId}`);
      console.log('');
    });
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });