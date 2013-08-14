class jarvis::system {

  file {
    '/etc/rsyslog.conf':
      source => 'puppet:///jarvis/etc/rsyslog.conf',
      notify => Exec['restart-rsyslogd'],
      mode   => 0644,
      owner  => root,
      group  => root;
    '/etc/rsyslog.d':
      ensure => directory,
      mode   => 0644,
      owner  => root,
      group  => root;
    '/etc/rsyslog.d/50-default.conf':
      source => 'puppet:///jarvis/etc/rsyslog.d/50-default.conf',
      notify => Exec['restart-rsyslogd'],
      mode   => 0644,
      owner  => root,
      group  => root;
  }

  package {
    # Base
    "curl":
      ensure => present;
    "g++":
      ensure => present;
    "git-core":
      ensure => present;
    "ipython":
      ensure=> present;
    "libcurl3":
      ensure => present;
    "libcurl4-openssl-dev":
      ensure => present;
    "telnet":
      ensure => present;
    "vim":
      ensure => present;
    "zlib1g-dev":
      ensure => present;
    # for building new vbox guest additions
    "linux-headers-server":
      ensure => present;
    "memcached":
      ensure => present;
    "nginx":
      ensure => present;
    "libevent-dev":
      ensure => present;
    # postgres dependency
    "libpq-dev":
      ensure => present;
    # we'll have to clean these up and make sure they're using specific
    # versions
    "redis-server":
      ensure => 'latest';
    "rsyslog":
      ensure => 'latest',
      require => [
        File['/etc/rsyslog.conf'],
        File['/etc/rsyslog.d/50-default.conf'],
      ];
  }

  exec { 'restart-rsyslogd':
    command     => '/etc/init.d/rsyslog restart',
    refreshonly => true;
  }

}
