const { execSync } = require('child_process');

const email = execSync('git config user.email').toString().trim();

if (!email.endsWith('@uniandes.edu.co')) {
  console.error('Invalid author email. Email should be in the domain @uniandes.edu.co');
  process.exit(1);
}