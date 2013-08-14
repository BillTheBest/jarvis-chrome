class jarvis::python::prereqs {

  package {
    'python2.7': ensure           => present;
    'python2.7-dev': ensure       => present;
    'python-pip': ensure          => present;
    'python-virtualenv': ensure   => present;
    'python-psycopg2': ensure     => present;
    'libboost-python-dev': ensure => present;
  }

  exec {
    'pip-install':
      command => '/usr/bin/easy_install -U pip',
      creates => '/usr/local/bin/pip',
      timeout => 600,
      require => Package['python2.7'];
    'virtualenv-install':
      command   => '/usr/local/bin/pip install -U virtualenv',
      creates   => '/usr/local/bin/virtualenv',
      timeout   => 600,
      logoutput => on_failure,
      require   => Exec['pip-install'];
    'virtualenvwrapper':
      command => '/usr/local/bin/pip install -U virtualenvwrapper',
      require => [
        Package['python-pip'],
        Exec['virtualenv-install'],
      ],
      creates => '/usr/local/bin/virtualenvwrapper.sh';
  }

}
