class jarvis::postgres {

  class { 'postgresql':
    version             => '9.2',
    manage_package_repo => true,
  }

  class { 'postgresql::server':
    config_hash => {
      'postgres_password' => 'jarvis',
    }
  }

  class { 'postgresql::contrib':
    require => Class['postgresql'],
  }

  # XXX add a check to see if db is populated and whether or not we need to run syncdb & migrate apps
  postgresql::db { 'jarvis':
    user     => 'vagrant',
    password => 'jarvis',
  }

  exec {'create hstore extension':
    command   => "${postgresql::params::psql_path} -d jarvis -U ${postgresql::params::user} -c 'CREATE EXTENSION IF NOT EXISTS hstore'",
    unless    => "${postgresql::params::psql_path} -d jarvis -U ${postgresql::params::user} -c '\\dx' | /bin/grep hstore",
    user      => $postgresql::params::group,
    logoutput => true,
    require   => [
      Postgresql::Db['jarvis'],
      Class['postgresql::contrib'],
    ],
  }

  $pg_conf_include_file = "${postgresql::params::confdir}/postgresql_puppet_extras.conf"

  file { $pg_conf_include_file:
    ensure => present,
    audit  => all,
    source => 'puppet:///jarvis/etc/postgresql/postgresql.conf',
    notify => Exec['reload_postgresql'],
  }


}
