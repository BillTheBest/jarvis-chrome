class jarvis::services {

  file {
    "/var/log/jarvis":
      ensure => directory,
      mode   => 0755,
      owner  => syslog,
      group  => syslog;
  }

  class { 'rabbitmq::server':
    delete_guest_user => true,
  }

  rabbitmq_user { 'dev_jarvis':
    admin    => true,
    password => 'mhav',
    provider => 'rabbitmqctl',
  }

  rabbitmq_vhost { 'jarvis':
    ensure   => present,
    provider => 'rabbitmqctl',
  }

  rabbitmq_user_permissions { 'dev_jarvis@jarvis':
    configure_permission => '.*',
    read_permission      => '.*',
    write_permission     => '.*',
    provider             => 'rabbitmqctl',
    require              => [
      Rabbitmq_user['dev_jarvis'],
      Rabbitmq_vhost['jarvis'],
    ];

  }

  file {

    '/etc/nginx':
      ensure  => directory,
      mode    => '0644',
      recurse => true,
      source  => "puppet:///jarvis/etc/nginx/";

    '/etc/nginx/sites-enabled/default':
      ensure  => absent,
      require => File['/etc/nginx'];

    '/etc/nginx/sites-enabled/jcore.conf':
      ensure  => link,
      target  => '/etc/nginx/sites-available/jcore.conf',
      require => [
        File['/etc/nginx'],
        Package['nginx'],
      ];

  }

  service { 'nginx':
    ensure     => running,
    enable     => true,
    hasstatus  => true,
    hasrestart => true,
    require    => Package['nginx'],
    subscribe  => [
      File['/etc/nginx'],
      File['/etc/nginx/sites-enabled/jcore.conf'],
    ],
  }


  include supervisor

  supervisor::service {
    'celeryd':
      ensure          => present,
      enable          => true,
      command         => '/home/vagrant/python_venv/jarvis/bin/python /home/vagrant/jarvis/manage.py celeryd -l "INFO" --settings=jarvis.settings.dev_local',
      user            => 'vagrant',
      numprocs        => 1,
      autorestart     => true,
      startsecs       => 10,
      redirect_stderr => true,
      directory       => '/',
      require         => [
        Class['rabbitmq::server'],
      ];
  }

}
