/*eslint-disable no-process-exit*/
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const Conf = require('conf');
const pkg = require('../package.json');

const config = new Conf();

updateNotifier({pkg}).notify();

const saveCurrencies = argv => { //will be modified with the --save command
  config.set('defaultFrom', argv[1] || config.get('defaultFrom', 'USD'));
  config.set(
    'defaultTo',
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP']) //default currencies
  );
  console.log(chalk.green('Saved default currencies to ' + config.path));
  process.exit(1);
};

const version = () => { //--version command
  console.log(pkg.version);
  process.exit(1);
};

const help = () => { // --help command
  console.log(`
Usage:

 $ ${chalk.cyan('cash')} ${chalk.green('<amount>')} ${chalk.yellow(
  '<currency>'
)}

 $ ${chalk.cyan('cash')} ${chalk.magenta('<command>')}

Commands:
${chalk.magenta('--save,  -s')}       Save currencies as default currencies
${chalk.magenta('--help,  -h')}       Display help message
${chalk.magenta('--version,  -v')}     Display version number

 List of currencies: http://akep.us/currencies

Examples:

 $ ${chalk.cyan('cash')} ${chalk.green('1')} ${chalk.yellow('usd')}

 $ ${chalk.cyan('cash')} ${chalk.green('1')} ${chalk.yellow('usd eur pln aud')}

 $ ${chalk.cyan('cash')} ${chalk.magenta('--save')} ${chalk.green(
  'usd'
)} ${chalk.yellow('eur pln aud')}

 $ ${chalk.cyan('cash')} ${chalk.magenta('--help')}
  `);
  process.exit(1);
};

const helpers = argv => { //take the argument from what typed the user and call the right function
  // Version
  if (argv.indexOf('--version') !== - 1 || argv.indexOf('-v') !== - 1) { //node index.js --version
    version();
  }

  // Help
  if (
    argv.indexOf('--help') !== - 1
    || argv.indexOf('-h') !== - 1
    || ! argv.length
  ) {//node index.js --help
    help();
  }

  if (
    argv.indexOf('--save') !== - 1
    || argv.indexOf('-s') !== - 1
    || ! argv.length
  ) {//node index.js --save
    saveCurrencies(argv);
  }
};

module.exports = helpers;
