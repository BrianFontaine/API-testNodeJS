module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'pi',
      host : '192.168.1.24',
      ref  : 'origin/master',
      repo : 'https://github.com/BrianFontaine/API-testNodeJS.git',
      path : '/var/www/html/test',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
