class jarvis::packaging {

  exec {
    'apt-configure':
      command   => '/usr/bin/dpkg --configure -a',
      logoutput => on_failure;
    'apt-update':
      command   => '/usr/bin/apt-get -q -y -o DPkg::Options::=--force-confold update',
      require   => Exec['apt-configure'],
      logoutput => on_failure;
    'add-apt-repository':
      command   => '/usr/bin/apt-get install -y python-software-properties',
      require   => Exec['apt-update'],
      logoutput => on_failure;
    'add-apt-repository-python':
      # ppa that has numerous versions of python including 2.7
      command   => '/usr/bin/add-apt-repository ppa:fkrull/deadsnakes',
      require   => Exec['add-apt-repository'],
      logoutput => on_failure;
    'add-apt-repository-postgres':
      # ppa that has postgreSQL 9.2
      command   => '/usr/bin/add-apt-repository ppa:pitti/postgresql',
      require   => Exec['add-apt-repository'],
      logoutput => on_failure;
    'apt-post-add-repository':
      command   => '/usr/bin/apt-get -q update',
      require   => [
        Exec['add-apt-repository-python'],
        Exec['add-apt-repository-postgres'],
      ],
      logoutput => on_failure;
  }

  # some vagrant bug makes puppet complain about a puppet group
  group {
    'puppet':
      ensure => present;
  }

}
