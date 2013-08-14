class jarvis::python::virtualenv {

  $requirements_file = '/home/vagrant/jarvis/requirements.txt'
  $virtualenv_name = 'jarvis-chrome'

  exec {
    'fix-venv-permissions':
      cwd     => '/home/vagrant',
      user    => 'root',
      command => '/bin/chown -R vagrant:vagrant /home/vagrant/python_venv /home/vagrant/.pip /home/vagrant/.pipcache /root/.pip || /bin/true',
      onlyif  => '/usr/bin/[ -d /home/vagrant/python_venv ]';
    'virtualenv-create':
      cwd     => '/home/vagrant',
      user    => 'vagrant',
      command => "/usr/local/bin/virtualenv /home/vagrant/python_venv/${virtualenv_name}",
      creates => "/home/vagrant/python_venv/${virtualenv_name}";
    'pip-install-reqs':
      cwd       => '/home/vagrant',
      user      => 'vagrant',
      logoutput => on_failure,
      command   => "/home/vagrant/python_venv/${virtualenv_name}/bin/pip install -r ${requirements_file}",
      timeout   => 1200,
      require   => [
        Exec['fix-venv-permissions'],
        Exec['virtualenv-create'],
      ],
      subscribe  => File[$requirements_file];
  }

  file {

    $requirements_file:
      audit  => all,
      notify => Exec['pip-install-reqs'];

    '/home/vagrant/.bash_profile':
      ensure  => file,
      owner   => vagrant,
      group   => vagrant,
      source  => 'puppet:///jarvis/home/vagrant/bash_profile.sh',
      require => Exec['virtualenv-create'];
  }

}
