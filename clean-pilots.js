const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUri);

const Pilot = require('./models/pilot');

const KEEP = 'sergio.sfdc+test5@gmail.com';

Pilot.deleteMany({ email: { $ne: KEEP } })
  .then(res => {
    console.log(`\nDeleted ${res.deletedCount} pilot(s). Kept: ${KEEP}\n`);
    return Pilot.find({}, 'email country stripeAccountId');
  })
  .then(remaining => {
    remaining.forEach(p => console.log(`  ${p.email} — ${p.country} — ${p.stripeAccountId}`));
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });