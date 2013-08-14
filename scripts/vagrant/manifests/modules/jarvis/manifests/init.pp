class jarvis {

  include jarvis::packaging,
    jarvis::system,
    jarvis::python,
    jarvis::services,
    jarvis::postgres

  Class['jarvis::packaging'] ->
    Class['jarvis::system'] ->
    Class['jarvis::python'] ->
    Class['jarvis::postgres'] ->
    Class['jarvis::services']

}
